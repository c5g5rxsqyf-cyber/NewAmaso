import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        contactName: '',
        email: '',
        phone: '',
        appointmentDate: '',
        appointmentTime: '',
        message: '',
        website: '' // honeypot
    });

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const appointmentLocal = form.appointmentDate && form.appointmentTime ? `${form.appointmentDate}T${form.appointmentTime}` : '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!isValidAppointment(appointmentLocal)) {
            setError('Please choose a time on Mon–Sat between 09:00 and 18:00.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contactName: form.contactName,
                    email: form.email,
                    phone: form.phone,
                    appointment: appointmentLocal,
                    message: form.message,
                    website: form.website,
                    timeZone,
                })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || data.ok === false) {
                throw new Error(data.error || 'Failed to send message.');
            }
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send message.');
        } finally {
            setSubmitting(false);
        }
    };

    const roundUpTo15Minutes = (date) => {
        const ms = 15 * 60 * 1000;
        return new Date(Math.ceil(date.getTime() / ms) * ms);
    };

    const openHour = 9;
    const closeHour = 18; // 18:00 is not selectable; last start 17:45

    // Parse `datetime-local` values consistently across browsers (Safari can be picky about Date parsing).
    const parseLocalDateTime = (value) => {
        if (typeof value !== 'string') return null;
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
        if (!match) return null;
        const [, year, month, day, hour, minute, second] = match;
        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second ?? 0),
            0
        );
        if (Number.isNaN(date.getTime())) return null;
        return date;
    };

    const toLocalDateTimeValue = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        return (
            `${date.getFullYear()}-` +
            `${pad(date.getMonth() + 1)}-` +
            `${pad(date.getDate())}T` +
            `${pad(date.getHours())}:` +
            `${pad(date.getMinutes())}`
        );
    };

    const toLocalDateValue = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const normalizeAppointment = (value) => {
        const date = parseLocalDateTime(value);
        if (!date) return '';

        let normalized = new Date(date);

        // Disallow Sundays (0)
        if (normalized.getDay() === 0) {
            normalized.setDate(normalized.getDate() + 1);
            normalized.setHours(openHour, 0, 0, 0);
        }

        // Disallow night hours
        const hour = normalized.getHours();
        const minutes = normalized.getMinutes();
        if (hour < openHour) normalized.setHours(openHour, 0, 0, 0);
        if (hour >= closeHour) {
            normalized.setDate(normalized.getDate() + 1);
            normalized.setHours(openHour, 0, 0, 0);
        }

        // If rolled into Sunday, skip to Monday
        if (normalized.getDay() === 0) {
            normalized.setDate(normalized.getDate() + 1);
            normalized.setHours(openHour, 0, 0, 0);
        }

        // Round to 15-min increments and re-check business hours
        normalized = roundUpTo15Minutes(normalized);
        if (normalized.getHours() < openHour) normalized.setHours(openHour, 0, 0, 0);
        if (normalized.getHours() >= closeHour) {
            normalized.setDate(normalized.getDate() + 1);
            normalized.setHours(openHour, 0, 0, 0);
        }
        if (normalized.getDay() === 0) {
            normalized.setDate(normalized.getDate() + 1);
            normalized.setHours(openHour, 0, 0, 0);
        }

        // Convert to datetime-local string (YYYY-MM-DDTHH:mm)
        return toLocalDateTimeValue(normalized);
    };

    const isValidAppointment = (appointmentLocal) => {
        const date = parseLocalDateTime(appointmentLocal);
        if (!date) return false;
        if (date.getDay() === 0) return false; // Sunday
        const hour = date.getHours();
        if (hour < openHour) return false;
        if (hour >= closeHour) return false;
        if (date.getMinutes() % 15 !== 0) return false;
        return true;
    };

    const formatAppointmentPretty = (appointmentLocal) => {
        const date = parseLocalDateTime(appointmentLocal);
        if (!date) return '';
        return date.toLocaleString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const buildTimeOptions = () => {
        const options = [];
        for (let hour = openHour; hour < closeHour; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                if (hour === closeHour - 1 && minute > 45) continue;
                const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                options.push({ value, label: value });
            }
        }
        return options;
    };

    const timeOptions = buildTimeOptions();

    const normalizeAppointmentParts = ({ appointmentDate, appointmentTime }) => {
        const combined = appointmentDate && appointmentTime ? `${appointmentDate}T${appointmentTime}` : '';
        const normalized = normalizeAppointment(combined);
        if (!normalized) return { appointmentDate: '', appointmentTime: '' };
        const [datePart, timePart] = normalized.split('T');
        return { appointmentDate: datePart ?? '', appointmentTime: timePart ?? '' };
    };

    const computeDefaultAppointmentParts = () => {
        // Pick the next valid 15-min slot within working hours Mon–Sat.
        let d = roundUpTo15Minutes(new Date());
        d.setSeconds(0, 0);

        const bumpToNextDayAtOpen = () => {
            d.setDate(d.getDate() + 1);
            d.setHours(openHour, 0, 0, 0);
        };

        if (d.getDay() === 0) bumpToNextDayAtOpen();
        if (d.getHours() < openHour) d.setHours(openHour, 0, 0, 0);
        if (d.getHours() >= closeHour) bumpToNextDayAtOpen();
        if (d.getDay() === 0) bumpToNextDayAtOpen();

        const normalized = normalizeAppointment(toLocalDateTimeValue(d));
        const [appointmentDate, appointmentTime] = (normalized || '').split('T');

        const safeDate = appointmentDate || toLocalDateValue(new Date());
        const safeTime = timeOptions.some((o) => o.value === appointmentTime) ? appointmentTime : (timeOptions[0]?.value ?? '09:00');

        return { appointmentDate: safeDate, appointmentTime: safeTime };
    };

    useEffect(() => {
        setForm((prev) => {
            if (prev.appointmentDate && prev.appointmentTime) return prev;
            const initial = computeDefaultAppointmentParts();
            return { ...prev, ...initial };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatIcsDateUtc = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        return (
            `${date.getUTCFullYear()}` +
            `${pad(date.getUTCMonth() + 1)}` +
            `${pad(date.getUTCDate())}` +
            'T' +
            `${pad(date.getUTCHours())}` +
            `${pad(date.getUTCMinutes())}` +
            `${pad(date.getUTCSeconds())}` +
            'Z'
        );
    };

    const downloadIcs = (appointmentLocal) => {
        const start = parseLocalDateTime(appointmentLocal);
        if (!start) return;
        const end = new Date(start.getTime() + 30 * 60 * 1000);

        const uid = `${start.getTime()}-amaso@amaso.nl`;
        const now = new Date();
        const summary = 'AMASO appointment';
        const description = 'AMASO meeting request (created from the website contact form).';

        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//AMASO//Website//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${formatIcsDateUtc(now)}`,
            `DTSTART:${formatIcsDateUtc(start)}`,
            `DTEND:${formatIcsDateUtc(end)}`,
            `SUMMARY:${summary}`,
            `DESCRIPTION:${description}`,
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'amaso-appointment.ics';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const googleCalendarUrl = (appointmentLocal) => {
        const start = parseLocalDateTime(appointmentLocal);
        if (!start) return '#';
        const end = new Date(start.getTime() + 30 * 60 * 1000);

        const fmt = (d) => formatIcsDateUtc(d).replace('Z', 'Z');
        const dates = `${fmt(start)}/${fmt(end)}`;
        const text = encodeURIComponent('AMASO appointment');
        const details = encodeURIComponent('AMASO meeting request (created from the website contact form).');
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
    };

    return (
        <section style={{ padding: '100px 20px', color: '#fff' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Get in touch</h2>
                    <p style={{ color: '#94a3b8' }}>
                        Ready to automate the impossible? Let's talk.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: '#111',
                            padding: '60px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            border: '1px solid #333'
                        }}
                    >
                        <CheckCircle size={60} color="#6366f1" style={{ marginBottom: '20px', display: 'inline-block' }} />
                        <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Thank You!</h3>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
                            Your request has been received. We'll be in touch shortly.
                        </p>
                        {appointmentLocal ? (
                            <div style={{ marginTop: '26px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a
                                    href={googleCalendarUrl(appointmentLocal)}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.18)',
                                        background: 'rgba(255,255,255,0.06)',
                                        color: '#fff',
                                        fontWeight: 600
                                    }}
                                >
                                    Add to Google Calendar
                                </a>
                                <button
                                    type="button"
                                    onClick={() => downloadIcs(appointmentLocal)}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.18)',
                                        background: 'rgba(255,255,255,0.06)',
                                        color: '#fff',
                                        fontWeight: 600
                                    }}
                                >
                                    Download .ics
                                </button>
                            </div>
                        ) : null}
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setError('');
                                setForm({
                                    contactName: '',
                                    email: '',
                                    phone: '',
                                    appointmentDate: '',
                                    appointmentTime: '',
                                    message: '',
                                    website: ''
                                });
                            }}
                            style={{
                                marginTop: '30px',
                                background: 'none',
                                border: 'none',
                                color: '#6366f1',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'grid', gap: '20px', position: 'relative' }}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            placeholder="Full name or company *"
                            required
                            value={form.contactName}
                            onChange={(value) => setForm((prev) => ({ ...prev, contactName: value }))}
                        />
                        <Input
                            placeholder="Business email *"
                            type="email"
                            required
                            value={form.email}
                            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                        />
	                        <div style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '-4px' }}>
	                            Appointment (date + time) *
	                        </div>
	                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
	                            <Input
	                                aria-label="Appointment date"
	                                type="date"
	                                required
	                                value={form.appointmentDate}
	                                onChange={(value) => {
	                                    setForm((prev) => ({
	                                        ...prev,
	                                        appointmentDate: value,
	                                        appointmentTime: prev.appointmentTime || timeOptions[0]?.value || '09:00',
	                                    }));
	                                }}
	                                onBlur={() => {
	                                    setForm((prev) => {
	                                        const next = normalizeAppointmentParts({
	                                            appointmentDate: prev.appointmentDate,
	                                            appointmentTime: prev.appointmentTime || timeOptions[0]?.value || '09:00',
	                                        });
	                                        return { ...prev, ...next };
	                                    });
	                                }}
	                                min={toLocalDateValue(new Date())}
	                                style={{ flex: '1 1 220px' }}
	                            />
	                            <Select
	                                aria-label="Appointment time"
	                                required
	                                value={form.appointmentTime}
	                                onChange={(value) => {
	                                    setForm((prev) => ({
	                                        ...prev,
	                                        appointmentDate: prev.appointmentDate || dateOptions[0]?.value || '',
	                                        appointmentTime: value,
	                                    }));
	                                }}
	                                onBlur={() => {
	                                    setForm((prev) => {
	                                        const next = normalizeAppointmentParts({
	                                            appointmentDate: prev.appointmentDate || toLocalDateValue(new Date()),
	                                            appointmentTime: prev.appointmentTime,
	                                        });
	                                        return { ...prev, ...next };
	                                    });
	                                }}
	                                style={{ flex: '1 1 180px' }}
	                            >
	                                <option value="" disabled>
	                                    Select time…
	                                </option>
	                                {timeOptions.map((o) => (
	                                    <option key={o.value} value={o.value}>
	                                        {o.label}
	                                    </option>
	                                ))}
	                            </Select>
	                        </div>
                        {appointmentLocal ? (
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '-6px' }}>
                                Selected: {formatAppointmentPretty(appointmentLocal)} ({timeZone})
                            </div>
                        ) : null}

                        <details style={{ marginTop: '4px' }}>
                            <summary style={{ cursor: 'pointer', color: '#c4b5fd', fontWeight: 600 }}>
                                Add optional details
                            </summary>
                            <div style={{ display: 'grid', gap: '16px', marginTop: '14px' }}>
                                <Input
                                    placeholder="Phone (optional)"
                                    value={form.phone}
                                    onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                                />
                                <textarea
                                    placeholder="Message (optional)"
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        background: '#111',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        minHeight: '120px',
                                        resize: 'vertical',
                                        outline: 'none',
                                        fontFamily: 'inherit'
                                    }}
                                    value={form.message}
                                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                                />
                            </div>
                        </details>

                        {/* Honeypot (hidden) */}
                        <input
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.website}
                            onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                            style={{
                                position: 'absolute',
                                left: '-10000px',
                                top: 'auto',
                                width: '1px',
                                height: '1px',
                                overflow: 'hidden'
                            }}
                            aria-hidden="true"
                        />

                        {error ? (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                color: '#fecaca',
                                padding: '12px 14px',
                                borderRadius: '10px',
                                fontSize: '0.95rem'
                            }}>
                                {error}
                            </div>
                        ) : null}

                        {appointmentLocal && !isValidAppointment(appointmentLocal) ? (
                            <div style={{ color: '#fecaca', fontSize: '0.95rem' }}>
                                Please choose a time on Mon–Sat between 09:00 and 18:00.
                            </div>
                        ) : null}

                        <button
                            disabled={submitting}
                            style={{
                            padding: '18px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#fff',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            transition: 'opacity 0.2s',
                            opacity: submitting ? 0.7 : 1
                        }}
                            onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.opacity = '0.9'; }}
                            onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.opacity = '1'; }}
                        >
                            {submitting ? 'Sending…' : 'Book appointment'}
                        </button>

                        <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                            By filling out this form you agree to our privacy policy.
                        </p>
                    </motion.form>
                )}

            </div>
        </section>
    );
};

const Input = ({ placeholder, type = "text", required = false, value, onChange, ...rest }) => (
    <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
        style={{
            width: '100%',
            padding: '15px',
            background: '#111',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            ...(rest.style ?? {}),
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
    />
);

const Select = ({ required = false, value, onChange, children, ...rest }) => (
    <select
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
        style={{
            width: '100%',
            padding: '15px',
            background: '#111',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            ...(rest.style ?? {}),
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
    >
        {children}
    </select>
);

export default Contact;
