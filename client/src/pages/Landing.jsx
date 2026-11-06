import { PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";
import { FaArrowRight, FaMoon, FaPlay, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from 'react-router-dom'

const avatars = [
  { initials: "SJ", gradient: "from-indigo-500 to-purple-600" },
  { initials: "MC", gradient: "from-emerald-500 to-teal-700" },
  { initials: "EV", gradient: "from-sky-500 to-blue-700" },
  { initials: "DM", gradient: "from-amber-500 to-orange-700" },
];

const Landing = () => {
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden surface-level-0 text-text-main">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />

      <div
        className="absolute top-1/3 md:top-20 right-1/9 w-[25rem] md:w-[35rem] h-[25rem] md:h-[35rem] 
        bg-brand-orange/35 dark:bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div
        className="absolute top-0 md:top-30 -left-20 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] 
        bg-brand-orange/25 dark:bg-brand-orange-light/15 rounded-full blur-[100px] pointer-events-none z-0"
      />

      {/* Full-width Navbar Bottom Divider */}
      <div className="absolute pointer-events-none inset-x-0 top-20 border-b border-outline-variant/60 z-10" />

      <main className="relative z-10 flex flex-col max-w-5xl md:max-w-7xl mx-auto px-6 lg:px-8">

        {/* Navbar */}
        <nav className="w-full h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3">
            <img
              className="h-8 md:h-10 w-auto"
              src="/workPilot_logo.svg"
              alt="WorkPilot Logo"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-extrabold text-text-main leading-tight font-display">
                WorkPilot
              </span>
              <p className="text-[10px] md:text-xs text-text-muted leading-none">
                Task Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="btn-secondary p-2.5"
            >
              {theme === "light" ? (
                <FaMoon className="size-4 md:size-5" />
              ) : (
                <FaSun className="size-4 md:size-5" />
              )}
            </button>

            <PrimaryBtn
              onClick={() => navigate('/login')}
              text="Get Started"
              className="text-sm md:text-base"
              icon={<FaArrowRight />}
              iconHover="group-hover:translate-x-1.5"
              position="right"
            />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative">
          <div className="grid lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-12 items-center">

            {/* Left Side */}
            <div className="relative w-full lg:mt-[4vh]">
              <div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                  Work Together.
                  <span className="block text-brand-orange mt-1">
                    Build More.
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-[20px] text-text-muted leading-relaxed py-6 md:py-7">
                  The all-in-one workspace for modern teams. Manage projects,
                  track tasks, collaborate, and get more done.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2">
                <PrimaryBtn
                  onClick={() => navigate('/login')}
                  text="Get Started"
                  className="text-base md:text-lg w-full h-13"
                  icon={<FaArrowRight />}
                  iconHover="group-hover:translate-x-5"
                  position="right"
                />
                <SecondaryBtn
                  text="Watch Demo"
                  className="text-base md:text-lg w-full h-13"
                  icon={<FaPlay />}
                  position="left"
                />
              </div>

              {/* Social Proof / Avatars */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 md:mt-12 pt-8 border-t
                 border-outline-variant/50 w-full">
                <div className="flex -space-x-2.5 overflow-hidden p-1">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.initials}
                      className={`inline-flex h-9 w-9 rounded-full ring-2 ring-canvas bg-gradient-to-br ${avatar.gradient} 
                        text-white font-bold text-xs items-center justify-center border border-white/20`}
                    >
                      {avatar.initials}
                    </div>
                  ))}
                  <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-canvas bg-brand-orange/15 text-brand-orange 
                    font-bold text-xs items-center justify-center border border-brand-orange/40">
                    10k+
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span className="text-text-muted text-[11px] font-mono ml-1.5 font-semibold">
                      4.9/5 Rating
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-text-main">
                    Trusted by 10,000+ teams worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Floating Cards */}
            <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] flex items-center justify-center select-none">

              {/* Orbital Rings & Center Glow */}
              <div className="orbital-ring" />
              <div className="orbital-ring-outer" />
              <div className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] 
                bg-gradient-to-tr from-brand-orange/20 to-brand-orange-light/5 rounded-full blur-[90px] pointer-events-none" />

              {/* 1. MAIN CARD: Project Overview Panel */}
              <div className="floating-card-a absolute top-6 sm:top-10 left-0 sm:left-6 w-[310px] sm:w-[410px] glass-kinetic 
                p-4 sm:p-5 z-20">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-brand-orange/15 border border-brand-orange/40 flex items-center
                       justify-center text-brand-orange font-bold text-sm">
                      WP
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-main tracking-tight">
                        Fintech Mobile Banking
                      </h4>
                      <p className="text-[11px] text-text-muted font-mono">
                        Sprint 34 • Active Core
                      </p>
                    </div>
                  </div>
                  <span className="badge-status badge-completed text-[10px]">
                    <span className="badge-dot animate-ping" />
                    On Track
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-5 bg-card p-3 rounded-lg border border-outline-variant/40">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-text-main font-medium">
                      Sprint Velocity
                    </span>
                    <span className="text-brand-orange font-bold font-mono">
                      82% Completed
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full w-[82%]" />
                  </div>
                  <div className="flex justify-between items-center mt-2.5 text-[11px] text-text-muted font-mono">
                    <span>45 / 55 Tasks Done</span>
                    <span>Launch: Dec 12</span>
                  </div>
                </div>

                {/* Mini Tasks Inside Card */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-card hover:bg-card-hover border 
                    border-outline-variant/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-sm bg-brand-emerald/20 border border-brand-emerald/40 flex items-center
                         justify-center text-brand-emerald text-[10px]">
                        ✓
                      </span>
                      <span className="text-xs font-medium text-text-main">
                        Biometric FaceID Login
                      </span>
                    </div>
                    <span className="badge-status badge-review text-[10px] font-mono py-0.5 px-2">
                      Mobile
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-DEFAULT bg-card hover:bg-card-hover border 
                    border-outline-variant/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-sm bg-brand-orange/20 border border-brand-orange/40 flex items-center
                         justify-center text-brand-orange text-[10px]">
                        ●
                      </span>
                      <span className="text-xs font-medium text-text-main">
                        Plaid Webhook Handlers
                      </span>
                    </div>
                    <span className="badge-status badge-in-progress text-[10px] font-mono py-0.5 px-2">
                      In Review
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. SECONDARY OVERLAY CARD: Task List Detail Card */}
              <div className="floating-card-b absolute bottom-8 sm:bottom-12 right-0 sm:right-4 w-[290px] sm:w-[350px] 
                surface-level-3 p-4 sm:p-5 z-30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-sm text-label-caps bg-error/15 text-error border border-error/25">
                      High Priority
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      #WP-482
                    </span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-outline-variant flex
                       items-center justify-center text-[9px] font-bold text-text-main">
                      MC
                    </div>
                    <div className="w-6 h-6 rounded-full bg-brand-orange border border-panel flex items-center justify-center 
                      text-[9px] font-bold text-white">
                      SJ
                    </div>
                  </div>
                </div>

                <h5 className="text-sm font-bold text-text-main mb-2.5 leading-snug">
                  Refactor Transaction History virtualized list
                </h5>

                <div className="flex items-center justify-between text-xs text-text-muted bg-panel/80 px-3 py-2 rounded-DEFAULT 
                  border border-outline-variant/40 mb-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-brand-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <span>Virtual DOM Checklist</span>
                  </div>
                  <span className="font-bold text-brand-emerald font-mono">
                    3/4 (75%)
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-text-muted flex items-center gap-1.5 font-mono">
                    <svg
                      className="w-3.5 h-3.5 text-brand-orange"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Due Today, 6:00 PM
                  </span>
                  <span className="badge-status badge-in-progress text-[10px]">
                    In Progress
                  </span>
                </div>
              </div>

              {/* 3. FLOATING BADGE 1: Green Completion Indicator */}
              <div className="floating-card-c absolute top-14 sm:top-20 right-2 md:right-16 glass-kinetic rounded-lg px-3.5 
                  py-2.5 border-brand-emerald/40 flex items-center gap-3 z-40">
                <div className="w-7 h-7 rounded-DEFAULT bg-brand-emerald/15 border border-brand-emerald/40 flex items-center
                   justify-center text-brand-emerald">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-caps text-[10px] text-text-muted">
                    Sprint Health
                  </span>
                  <span className="text-xs font-bold text-brand-emerald">
                    +28.4% Velocity
                  </span>
                </div>
              </div>

              {/* 4. FLOATING BADGE 2: Purple Team Collaboration Icon */}
              <div className="floating-card-b absolute bottom-28 sm:bottom-32 left-0 sm:-left-3 glass-kinetic rounded-lg px-3.5
                   py-2.5 border-purple-500/40 flex items-center gap-3 z-40">
                <div className="w-8 h-8 rounded-DEFAULT bg-purple-500/15 border border-purple-500/40 flex items-center 
                    justify-center text-purple-600 dark:text-purple-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-caps text-[10px] text-text-muted">
                    Collaborators
                  </span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-300">
                    14 Members Online
                  </span>
                </div>
              </div>

              {/* 5. FLOATING BADGE 3: Orange Telemetry Pill */}
              <div className="floating-card-a absolute bottom-0 sm:bottom-4 left-1/3 -translate-x-1/2 glass-kinetic rounded-full
                 px-4 py-1.5 shadow-orange-glow border-brand-orange/40 flex items-center gap-2 z-40 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span className="text-[11px] font-bold text-text-main">
                  Live Cluster Latency:{" "}
                  <span className="text-brand-orange font-mono">
                    14.2ms
                  </span>
                </span>
              </div>

            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;