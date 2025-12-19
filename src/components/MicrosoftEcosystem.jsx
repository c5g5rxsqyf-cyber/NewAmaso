import React from 'react';
import { BarChart3, Zap, LayoutGrid, Plus } from 'lucide-react';

const MicrosoftMark = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="0" y="0" width="28" height="28" fill="#F25022" rx="4" />
    <rect x="36" y="0" width="28" height="28" fill="#7FBA00" rx="4" />
    <rect x="0" y="36" width="28" height="28" fill="#00A4EF" rx="4" />
    <rect x="36" y="36" width="28" height="28" fill="#FFB900" rx="4" />
  </svg>
);

const MicrosoftEcosystem = ({ embedded = false }) => {
  return (
    <section className="relative px-5 py-28">
      {!embedded ? (
        /* Background wash (fades out before the next section) */
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-85"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(34,211,238,0.16), transparent 48%), radial-gradient(circle at 82% 22%, rgba(236,72,153,0.16), transparent 52%), radial-gradient(circle at 52% 78%, rgba(250,204,21,0.12), transparent 58%), linear-gradient(90deg, rgba(34,211,238,0.05), rgba(236,72,153,0.05), rgba(250,204,21,0.04))',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,1) 66%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,1) 66%, transparent 100%)',
          }}
        />
      ) : null}

      {/* Microsoft watermark (matches ClickUp-style background logo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-140px] top-1/2 hidden -translate-y-1/2 opacity-[0.09] mix-blend-screen md:block"
        style={{
          width: 'min(560px, 60vw)',
          transform: 'translateY(-56%) rotate(-8deg)',
          filter: 'saturate(1.1) drop-shadow(0 0 46px rgba(0,164,239,0.16))',
        }}
      >
        <MicrosoftMark className="h-auto w-full" />
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="mx-auto mb-14 max-w-[920px]">
          <h2 className="text-center">
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
              Your Microsoft Command Center
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[17px] leading-relaxed text-slate-300/80 md:text-[18px]">
            Transform passive Office licenses into an active data engine.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          {/* Left (Data Core) */}
          <div className="lg:row-span-2">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-300/90 via-yellow-500/40 to-transparent p-[1px]">
              <div className="relative h-full rounded-2xl bg-black/80 backdrop-blur-xl">
                {/* Data grid pattern */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
                    backgroundSize: '34px 34px',
                    maskImage: 'radial-gradient(circle at 30% 30%, black 0%, transparent 65%)',
                    WebkitMaskImage: 'radial-gradient(circle at 30% 30%, black 0%, transparent 65%)',
                  }}
                />

                {/* Massive hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-28 bg-[radial-gradient(circle_at_35%_35%,rgba(250,204,21,0.50),transparent_55%)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Corner tech marks */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute left-6 top-6 h-4 w-4 border-l border-t border-white/30" />
                  <div className="absolute right-6 top-6 h-4 w-4 border-r border-t border-white/30" />
                  <div className="absolute left-6 bottom-6 h-4 w-4 border-l border-b border-white/30" />
                  <div className="absolute right-6 bottom-6 h-4 w-4 border-r border-b border-white/30" />
                  <div className="absolute right-10 top-10 text-white/25">
                    <Plus size={16} />
                  </div>
                  <div className="absolute left-10 bottom-10 text-white/25">
                    <Plus size={16} />
                  </div>
                </div>

                <div className="relative rounded-2xl border border-white/10 p-7 transition-colors duration-200 group-hover:border-white/20 md:p-8">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                      <BarChart3 className="text-yellow-300" size={34} />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        Intelligence
                      </div>
                      <h3 className="mt-1 text-3xl font-black tracking-tight text-yellow-300 md:text-4xl">
                        Visual Intelligence
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-slate-300/85 md:text-[16px]">
                    Stop guessing. We build central Power BI dashboards that visualize your KPI&apos;s in real-time. No
                    more static spreadsheets.
                  </p>

                  {/* HUD ruler line */}
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-yellow-300/40 via-white/10 to-transparent" />
                  <div className="mt-3 flex items-center gap-2 text-xs tracking-[0.18em] text-white/45">
                    <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
                    DATA CORE ONLINE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right (Velocity) */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-300/90 via-sky-500/45 to-transparent p-[1px]">
            <div className="relative h-full rounded-2xl bg-black/80 backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.45),transparent_60%)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-5 top-5 h-4 w-4 border-l border-t border-white/30" />
                <div className="absolute right-5 bottom-5 h-4 w-4 border-r border-b border-white/30" />
                <div className="absolute right-10 top-10 text-white/25">
                  <Plus size={16} />
                </div>
              </div>

              <div className="relative flex gap-5 rounded-2xl border border-white/10 p-6 transition-colors duration-200 group-hover:border-white/20">
                <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Zap className="text-cyan-300" size={28} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Velocity</div>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-cyan-300 md:text-3xl">
                    Process Velocity
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300/85">
                    Kill the busywork. We connect Outlook &amp; Teams to auto-pilot your admin tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right (Agility) */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-500/90 via-pink-500/50 to-transparent p-[1px]">
            <div className="relative h-full rounded-2xl bg-black/80 backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.45),transparent_60%)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute right-5 top-5 h-4 w-4 border-r border-t border-white/30" />
                <div className="absolute left-5 bottom-5 h-4 w-4 border-l border-b border-white/30" />
                <div className="absolute left-10 top-10 text-white/25">
                  <Plus size={16} />
                </div>
              </div>

              <div className="relative flex gap-5 rounded-2xl border border-white/10 p-6 transition-colors duration-200 group-hover:border-white/20">
                <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <LayoutGrid className="text-pink-400" size={28} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Agility</div>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-pink-400 md:text-3xl">
                    Operational Agility
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300/85">
                    Custom internal apps that bridge the gap between your unique problems and rigid software.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicrosoftEcosystem;
