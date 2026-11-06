import { useEffect, useState } from "react";
import {
    FaArrowRight,
    FaBell,
    FaBullhorn,
    FaChartBar,
    FaCheck,
    FaCheckCircle,
    FaClock,
    FaCode,
    FaEllipsisV,
    FaFlag,
    FaFolder,
    FaHistory,
    FaPalette,
    FaPlus,
    FaThLarge,
    FaUsers,
} from "react-icons/fa";
import CreateWorkSpace from "../components/CreateWorkSpace";
import JoinWorkSpace from "../components/JoinWorkSpace";
import { PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";
import { Hero3DIllustration, RocketPromo3DIllustration } from "../components/DashboardElements";
import { Helmet } from "react-helmet-async";

const workspaces = [
    {
        id: "dev-squad",
        name: "Dev Squad",
        subtitle: "Software Development Team",
        icon: FaCode,
        iconBg: "bg-primary/15 text-primary border border-primary/30",
        barColor: "from-brand-orange to-amber-400",
        progress: 72,
        extraMembers: "+3",
        members: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        ],
    },
    {
        id: "marketing-hub",
        name: "Marketing Hub",
        subtitle: "Marketing & Content Team",
        icon: FaBullhorn,
        iconBg: "bg-tertiary/15 text-tertiary border border-tertiary/30",
        barColor: "from-brand-emerald to-teal-400",
        progress: 48,
        extraMembers: "+2",
        members: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        ],
    },
    {
        id: "creative-studio",
        name: "Creative Studio",
        subtitle: "Design & UX Team",
        icon: FaPalette,
        iconBg: "bg-secondary/15 text-secondary border border-secondary/30",
        barColor: "from-brand-cyan to-sky-400",
        progress: 85,
        extraMembers: "+1",
        members: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        ],
    },
];

const overviewStats = [
    {
        id: "total-workspaces",
        value: "4",
        label: "Total Workspaces",
        icon: FaFolder,
        iconStyle: "bg-primary/15 text-primary border border-primary/25",
        cardTint: "bg-surface-container-low",
    },
    {
        id: "active-projects",
        value: "12",
        label: "Active Projects",
        icon: FaCheckCircle,
        iconStyle: "bg-tertiary/15 text-tertiary border border-tertiary/25",
        cardTint: "bg-surface-container-low",
    },
    {
        id: "tasks-in-progress",
        value: "48",
        label: "Tasks In Progress",
        icon: FaClock,
        iconStyle: "bg-brand-orange/15 text-brand-orange border border-brand-orange/25",
        cardTint: "bg-brand-orange/[0.04] dark:bg-surface-container-low",
    },
    {
        id: "completed-tasks",
        value: "32",
        label: "Completed Tasks",
        icon: FaFlag,
        iconStyle: "bg-secondary/15 text-secondary border border-secondary/25",
        cardTint: "bg-surface-container-low",
    },
];

const recentActivities = [
    {
        id: 1,
        dotColor: "bg-primary",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        user: "Sarah Kim",
        action: "commented on",
        target: "“API Integration” project",
        time: "2m ago",
    },
    {
        id: 2,
        dotColor: "bg-secondary",
        badgeBg: "bg-secondary/15 text-secondary border border-secondary/30",
        badgeIcon: FaCheck,
        user: "David Lee",
        action: "completed",
        target: "“Design Login Page” task",
        time: "5m ago",
    },
    {
        id: 3,
        dotColor: "bg-primary",
        badgeBg: "bg-primary/15 text-primary border border-primary/30",
        badgeIcon: FaPlus,
        user: "New member",
        action: "joined",
        target: "“Marketing Hub” workspace",
        time: "10m ago",
    },
    {
        id: 4,
        dotColor: "bg-brand-orange",
        badgeBg: "bg-brand-orange/15 text-brand-orange border border-brand-orange/30",
        badgeIcon: FaBell,
        user: "Task deadline",
        action: "approaching:",
        target: "“Prepare Presentation”",
        time: "15m ago",
    },
];

const Dashboard = () => {
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setActiveModal(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeModal]);

    return (
        <>

            <Helmet>
                <title>WorkPilot | Dashboard</title>
            </Helmet>

            <div className="min-h-screen surface-level-0 text-text-main flex selection:bg-brand-orange selection:text-white">
                <div className="flex-1 flex flex-col min-w-0">
                    <main className="flex-1 px-4 sm:px-8 py-2 max-w-[1440px] w-full mx-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                            {/* LEFT / CENTER COLUMN */}
                            <div className="xl:col-span-8 flex flex-col gap-7">
                                {/* HERO BANNER */}
                                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container/40 via-panel to-secondary-container/30 dark:from-surface-container-high dark:via-surface-container dark:to-surface-container-lowest border border-outline-variant/40 p-6 sm:p-8 shadow-level-2">
                                    <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />
                                    <div className="absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-brand-cyan/15 blur-3xl pointer-events-none" />

                                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                        <div className="lg:col-span-7 flex flex-col items-start">
                                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-panel/80 dark:bg-surface-container-highest/80 border border-outline-variant/40 shadow-xs mb-4">
                                                <span className="text-brand-orange text-xs">✦</span>
                                                <span className="text-label-md font-semibold text-text-main">
                                                    Welcome back, Alex!
                                                </span>
                                            </div>

                                            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-text-main leading-tight">
                                                Manage. Collaborate.{" "}
                                                <span className="relative inline-block text-brand-orange">
                                                    Achieve.
                                                    <svg
                                                        className="absolute -bottom-1.5 left-0 w-full h-2 text-brand-orange/50"
                                                        viewBox="0 0 120 10"
                                                        fill="none"
                                                        preserveAspectRatio="none"
                                                    >
                                                        <path
                                                            d="M2 8C35 2 85 2 118 6"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                </span>
                                            </h1>

                                            <p className="mt-3 text-body-lg text-text-muted">
                                                Your workspaces, projects and teams — all in one place.
                                            </p>

                                            <div className="mt-6 flex flex-wrap items-center gap-3.5">
                                                <PrimaryBtn
                                                    type="button"
                                                    onClick={() => setActiveModal("create")}
                                                    text="Create Workspace"
                                                    icon={<FaPlus className="text-xs" />}
                                                    position="left"
                                                    className="px-5 py-3 rounded-lg text-label-lg"
                                                />
                                                <SecondaryBtn
                                                    type="button"
                                                    onClick={() => setActiveModal("join")}
                                                    text="Join Workspace"
                                                    icon={<FaUsers className="text-sm text-brand-orange" />}
                                                    position="left"
                                                    className="px-5 py-3 rounded-lg text-label-lg bg-panel/90"
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5">
                                            <Hero3DIllustration />
                                        </div>
                                    </div>
                                </section>

                                {/* YOUR WORKSPACES SECTION */}
                                <section className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <FaThLarge className="text-brand-orange text-lg" />
                                            <h2 className="text-headline-sm sm:text-headline-md text-text-main">
                                                Your Workspaces
                                            </h2>
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1.5 text-label-lg text-brand-orange hover:underline cursor-pointer"
                                        >
                                            <span>View all</span>
                                            <FaArrowRight className="text-xs" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {workspaces.map((ws) => {
                                            const Icon = ws.icon;
                                            return (
                                                <div
                                                    key={ws.id}
                                                    className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-5"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-start gap-3.5">
                                                            <div
                                                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ws.iconBg}`}
                                                            >
                                                                <Icon className="text-xl" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-headline-sm text-text-main leading-snug">
                                                                    {ws.name}
                                                                </h3>
                                                                <p className="text-body-sm text-text-muted">
                                                                    {ws.subtitle}
                                                                </p>

                                                                <div className="flex items-center -space-x-2 mt-3">
                                                                    {ws.members.map((avatarUrl, idx) => (
                                                                        <img
                                                                            key={idx}
                                                                            src={avatarUrl}
                                                                            alt="Team member"
                                                                            className="w-7 h-7 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container"
                                                                        />
                                                                    ))}
                                                                    <div className="w-7 h-7 rounded-full ring-2 ring-panel dark:ring-surface-container bg-card dark:bg-surface-container-highest text-text-muted text-[10px] font-bold flex items-center justify-center">
                                                                        {ws.extraMembers}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            aria-label="Workspace options"
                                                            className="text-text-muted hover:text-text-main p-1.5 rounded-lg hover:bg-card transition-colors cursor-pointer"
                                                        >
                                                            <FaEllipsisV className="text-sm" />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center justify-between text-body-sm">
                                                            <span className="text-text-muted font-medium">
                                                                Overall Progress
                                                            </span>
                                                            <span className="font-bold text-text-main font-mono">
                                                                {ws.progress}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 rounded-full bg-card dark:bg-surface-container-highest overflow-hidden">
                                                            <div
                                                                style={{ width: `${ws.progress}%` }}
                                                                className={`h-full rounded-full bg-gradient-to-r ${ws.barColor} transition-all duration-500`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div className="relative overflow-hidden rounded-2xl p-5 border-2 border-dashed border-outline-variant/60 bg-panel/50 dark:bg-surface-container-low/50 hover:border-brand-orange/60 transition-colors flex flex-col items-center justify-center text-center gap-3 min-h-[210px]">
                                            <button
                                                type="button"
                                                onClick={() => setActiveModal("create")}
                                                aria-label="Create Workspace"
                                                className="w-11 h-11 rounded-full bg-gradient-to-b from-brand-orange-light to-brand-orange-dark text-white flex items-center justify-center shadow-orange-glow hover:scale-105 transition-transform cursor-pointer"
                                            >
                                                <FaPlus className="text-base" />
                                            </button>

                                            <div>
                                                <h3 className="text-title-md text-text-main font-bold">
                                                    Create or Join a Workspace
                                                </h3>
                                                <p className="text-body-sm text-text-muted mt-0.5">
                                                    Start a new workspace or join with an invite
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1">
                                                <PrimaryBtn
                                                    type="button"
                                                    onClick={() => setActiveModal("create")}
                                                    text="Create Workspace"
                                                    className="text-xs px-4 py-2 rounded-full"
                                                />
                                                <SecondaryBtn
                                                    type="button"
                                                    onClick={() => setActiveModal("join")}
                                                    text="Join Workspace"
                                                    className="text-xs px-4 py-2 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="xl:col-span-4 flex flex-col gap-6">
                                {/* QUICK OVERVIEW */}
                                <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                                    <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-card dark:bg-surface-container-high border border-outline-variant/30">
                                        <FaChartBar className="text-brand-orange text-xs" />
                                        <span className="text-label-md font-bold text-text-main">
                                            Quick Overview
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3.5">
                                        {overviewStats.map((stat) => {
                                            const Icon = stat.icon;
                                            return (
                                                <div
                                                    key={stat.id}
                                                    className={`${stat.cardTint} rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2.5 transition-transform hover:-translate-y-0.5`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.iconStyle}`}
                                                    >
                                                        <Icon className="text-sm" />
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-extrabold font-display text-text-main leading-none">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-body-sm text-text-muted mt-1">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* RECENT ACTIVITY */}
                                <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaHistory className="text-brand-orange text-sm" />
                                            <h3 className="text-title-md font-bold text-text-main">
                                                Recent Activity
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 text-label-md text-brand-orange hover:underline cursor-pointer"
                                        >
                                            <span>View all</span>
                                            <FaArrowRight className="text-[10px]" />
                                        </button>
                                    </div>

                                    <div className="relative flex flex-col gap-4 pl-3">
                                        <div className="absolute left-[15px] top-3 bottom-3 w-[1.5px] bg-outline-variant/40" />

                                        {recentActivities.map((item) => {
                                            const BadgeIcon = item.badgeIcon;
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="relative flex items-start justify-between gap-2.5"
                                                >
                                                    <div className="flex items-start gap-3 min-w-0">
                                                        <span
                                                            className={`relative z-10 mt-2.5 w-2 h-2 rounded-full shrink-0 ring-4 ring-panel dark:ring-surface-container ${item.dotColor}`}
                                                        />

                                                        {item.avatarUrl ? (
                                                            <img
                                                                src={item.avatarUrl}
                                                                alt={item.user}
                                                                className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-outline-variant/30"
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${item.badgeBg}`}
                                                            >
                                                                {BadgeIcon && <BadgeIcon className="text-[10px]" />}
                                                            </div>
                                                        )}

                                                        <p className="text-body-sm text-text-muted leading-snug">
                                                            <strong className="text-text-main font-semibold">
                                                                {item.user}
                                                            </strong>{" "}
                                                            {item.action}{" "}
                                                            <span className="text-text-main font-medium block sm:inline">
                                                                {item.target}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <span className="text-[11px] text-text-muted whitespace-nowrap shrink-0 pt-0.5">
                                                        {item.time}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* 3. PROMO CTA BANNER (Adaptive Light & Dark Theme) */}
                                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100/90 via-purple-100/60 to-blue-100/90 dark:from-[#0D1025] dark:via-[#17183B] dark:to-[#251E54] text-text-main dark:text-white p-6 min-h-[178px] shadow-level-3 border border-outline-variant/30 dark:border-white/10 flex items-center">
                                    <svg
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        className="w-6 h-6 text-indigo-500/30 dark:text-indigo-400/25 mb-2"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M32 4L4 17L14 21L32 4ZM32 4L14 21V30L20 23L32 4ZM32 4L20 23L28 28L32 4Z"
                                            fill="currentColor"
                                        />
                                    </svg>

                                    <div className="relative z-10 flex flex-col items-start max-w-[68%]">
                                        <div className="w-6 h-6 mb-2 rounded-md flex items-center justify-center text-indigo-600/60 dark:text-indigo-400/40">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-headline-sm text-text-main dark:text-white font-bold tracking-tight">
                                            Work better together!
                                        </h3>
                                        <p className="text-body-sm text-text-muted dark:text-slate-300 mt-1">
                                            Build, plan and grow with WorkPilot.
                                        </p>
                                        <button
                                            type="button"
                                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-[#12132E] text-label-md font-bold shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                                        >
                                            <span>Explore Features</span>
                                            <FaArrowRight className="text-[10px]" />
                                        </button>
                                    </div>

                                    <RocketPromo3DIllustration />
                                </section>
                            </div>
                        </div>
                    </main>
                </div>

                {/* WORKSPACE MODALS */}
                {activeModal === "create" && (
                    <CreateWorkSpace setActiveModal={setActiveModal} />
                )}
                {activeModal === "join" && (
                    <JoinWorkSpace setActiveModal={setActiveModal} />
                )}
            </div>
        </>
    );
};

export default Dashboard;