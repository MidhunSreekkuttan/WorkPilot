import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCompass,
  FaExclamationTriangle,
  FaHome,
  FaLayerGroup,
  FaRegComments,
  FaSatelliteDish,
  FaTerminal,
  FaUserFriends,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";

const quickLinks = [
  {
    label: "Dashboard",
    desc: "Workspaces & overview metrics",
    path: "/dashboard",
    icon: FaHome,
    accent: "text-brand-orange bg-brand-orange/15 border-brand-orange/30",
  },
  {
    label: "Workspace",
    desc: "Active sprints & project boards",
    path: "/work-space/12345",
    icon: FaLayerGroup,
    accent: "text-brand-cyan bg-brand-cyan/15 border-brand-cyan/30",
  },
  {
    label: "Squad Chats",
    desc: "Direct E2E encrypted channels",
    path: "/chats",
    icon: FaRegComments,
    accent: "text-brand-emerald bg-brand-emerald/15 border-brand-emerald/30",
  },
  {
    label: "Teammates",
    desc: "Directory & pending invites",
    path: "/friends",
    icon: FaUserFriends,
    accent: "text-primary bg-primary/15 border-primary/30",
  },
];

const PageNotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>WorkPilot | 404 Signal Lost</title>
      </Helmet>

      <div className="relative min-h-[calc(100vh-4rem)] w-full surface-level-0 text-text-main flex items-center justify-center overflow-hidden px-4 sm:px-8 py-8 selection:bg-brand-orange selection:text-white">
        {/* Background Grid & Atmospheric Glows */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[34rem] h-[22rem] sm:h-[34rem] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-10 right-1/4 w-[18rem] h-[18rem] bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none z-0" />

        {/* Decorative Orbital Rings */}
        <div className="orbital-ring opacity-40" />
        <div className="orbital-ring-outer opacity-30" />

        <main className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Telemetry Status Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-panel/90 dark:bg-surface-container-high border border-outline-variant/40 shadow-level-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error" />
            </span>
            <span className="text-label-caps text-error font-mono tracking-wider">
              ERR_404_ROUTE_VOID
            </span>
            <span className="text-text-placeholder text-xs">|</span>
            <span className="text-label-md text-text-muted font-mono">
              TELEMETRY UNREACHABLE
            </span>
          </div>

          {/* 3D / Kinetic 404 Visual Badge */}
          <div className="relative flex items-center justify-center mb-6 select-none">
            <div className="floating-card-a relative px-8 py-5 glass-kinetic flex items-center gap-5 border border-outline-variant/50">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-error/15 border border-brand-orange/40 flex items-center justify-center text-brand-orange shadow-orange-glow shrink-0">
                <FaSatelliteDish className="text-2xl sm:text-3xl animate-pulse" />
              </div>

              <div className="text-left">
                <div className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight leading-none bg-gradient-to-r from-brand-orange via-amber-400 to-brand-cyan bg-clip-text text-transparent">
                  404
                </div>
                <p className="text-label-caps text-text-muted font-mono mt-1">
                  NODE NOT FOUND IN CLUSTER
                </p>
              </div>
            </div>

            {/* Floating Warning Sub-badge */}
            <div className="floating-card-c absolute -top-3 -right-4 sm:-right-6 px-2.5 py-1 rounded-lg bg-surface-container-highest border border-outline-variant/50 shadow-level-2 flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
              <FaExclamationTriangle className="text-[10px]" />
              <span>NULL_VECTOR</span>
            </div>
          </div>

          {/* Main Headline & Copy */}
          <h1 className="text-headline-lg sm:text-display-hero text-text-main tracking-tight">
            Coordinates off the{" "}
            <span className="text-brand-orange">radar.</span>
          </h1>

          <p className="mt-3 text-body-lg text-text-muted leading-relaxed">
            The workspace route, task node, or endpoint you are looking for
            has been relocated, archived, or never existed on this tenant.
          </p>

          {/* Terminal Diagnostic Readout */}
          <div className="mt-5 w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-inner flex items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-text-muted truncate">
              <FaTerminal className="text-brand-orange shrink-0 text-[11px]" />
              <span className="text-text-placeholder">GET</span>
              <span className="text-text-main font-semibold truncate">
                {pathname}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-error/15 text-error border border-error/30 text-[10px] font-bold shrink-0">
              404
            </span>
          </div>

          {/* Primary Navigation Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
            <SecondaryBtn
              type="button"
              onClick={() => navigate(-1)}
              text="Go Back"
              icon={<FaArrowLeft className="text-xs" />}
              iconHover="group-hover:-translate-x-1"
              position="left"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-label-lg"
            />

            <PrimaryBtn
              type="button"
              onClick={() => navigate("/dashboard")}
              text="Return to Dashboard"
              icon={<FaCompass className="text-sm" />}
              iconHover="group-hover:rotate-45"
              position="left"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-label-lg"
            />

            <GhostBtn
              type="button"
              onClick={() => navigate("/")}
              text="Landing Page"
              className="w-full sm:w-auto px-4 py-3 rounded-xl text-label-lg"
            />
          </div>

          {/* Quick Jump Directory Grid */}
          <div className="mt-10 pt-8 border-t border-outline-variant/40 w-full">
            <span className="text-label-caps text-text-placeholder tracking-widest block mb-4">
              QUICK TELEPORT // VERIFIED ROUTES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="p-3.5 rounded-xl bg-panel dark:bg-surface-container border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex items-start gap-3 cursor-pointer text-left group"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${item.accent}`}
                    >
                      <Icon className="text-sm" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-label-lg text-text-main group-hover:text-brand-orange transition-colors truncate">
                        {item.label}
                      </h2>
                      <p className="text-body-sm text-text-muted truncate">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PageNotFound;