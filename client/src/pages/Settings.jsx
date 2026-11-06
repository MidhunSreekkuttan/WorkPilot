import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    FaBell,
    FaCheck,
    FaCheckCircle,
    FaDesktop,
    FaExclamationTriangle,
    FaLock,
    FaMoon,
    FaPalette,
    FaShieldAlt,
    FaSlidersH,
    FaSun,
    FaTrash,
    FaUser,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";
import { useTheme } from "../context/ThemeContext";
import useForm from "../coustom-hooks/UseForm";

const settingsTabs = [
    {
        id: "profile",
        label: "Profile & Identity",
        subtitle: "Personal info, role & workspace handle",
        icon: FaUser,
    },
    {
        id: "appearance",
        label: "Appearance & UI",
        subtitle: "Theme mode, layout density & motion",
        icon: FaPalette,
    },
    {
        id: "notifications",
        label: "Notifications",
        subtitle: "Sprint alerts, PR mentions & digests",
        icon: FaBell,
    },
    {
        id: "security",
        label: "Security & Tokens",
        subtitle: "Password, 2FA & active sessions",
        icon: FaShieldAlt,
    },
];

const activeSessions = [
    {
        id: "sess-1",
        device: "Windows 11 • Chrome 130",
        location: "Thiruvananthapuram, IN",
        ip: "103.48.198.14",
        status: "Current Session",
        current: true,
    },
    {
        id: "sess-2",
        device: "Linux (Ubuntu) • WorkPilot CLI v4.2",
        location: "Mumbai, IN",
        ip: "157.32.104.88",
        status: "Last active 2h ago",
        current: false,
    },
];

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState("profile");
    const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saved"
    const [density, setDensity] = useState("comfortable");
    const [sessions, setSessions] = useState(activeSessions);

    const { values, handleChange } = useForm({
        // Profile
        fullName: "Alex Chen",
        displayHandle: "alex.chen",
        email: "alex.chen@workpilot.io",
        roleTitle: "Engineering Manager",
        department: "Core Infrastructure",
        timezone: "Asia/Kolkata (GMT+5:30)",
        bio: "Orchestrating sprint velocity, distributed systems, and developer experience across Dev Squad.",

        // Appearance & Preferences
        defaultView: "/dashboard",
        reducedMotion: false,
        codeFontLigatures: true,

        // Notifications
        notifyDirectMessages: true,
        notifyPrReviews: true,
        notifySprintVelocity: true,
        notifyDeadlineWarnings: true,
        notifyMarketingDigest: false,

        // Security
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: true,
    });

    const handleSaveSubmit = (e) => {
        e.preventDefault();
        setSaveStatus("saved");
        setTimeout(() => {
            setSaveStatus("idle");
        }, 2200);
    };

    const handleRevokeSession = (id) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <>
            <Helmet>
                <title>WorkPilot | Settings</title>
            </Helmet>

            <div className="min-h-screen surface-level-0 text-text-main flex selection:bg-brand-orange selection:text-white">
                <main className="flex-1 px-4 sm:px-8 py-4 max-w-[1440px] w-full mx-auto">
                    {/* Page Header Banner + Top Navigation Tabs */}
                    <header className="mb-6 flex flex-col gap-5 pb-5 border-b border-outline-variant/40">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-panel dark:bg-surface-container-high border border-outline-variant/40 mb-2">
                                    <FaSlidersH className="text-brand-orange text-xs" />
                                    <span className="text-label-caps text-text-muted font-mono">
                                        CONTROL PLANE • ACCOUNT PREFERENCES
                                    </span>
                                </div>
                                <h1 className="text-headline-md sm:text-headline-lg text-text-main font-extrabold tracking-tight">
                                    Workspace &amp; Account Settings
                                </h1>
                                <p className="text-body-md text-text-muted mt-0.5">
                                    Configure your operator profile, theme appearance, telemetry
                                    alerts, and security credentials.
                                </p>
                            </div>

                            {/* Global Save Status Indicator */}
                            {saveStatus === "saved" && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl badge-completed text-label-md font-mono self-start sm:self-auto">
                                    <FaCheckCircle className="text-sm" />
                                    <span>Preferences synchronized</span>
                                </div>
                            )}
                        </div>

                        {/* Horizontal Settings Navigation Tabs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {settingsTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full p-3.5 rounded-xl flex items-start gap-3.5 text-left border transition-all cursor-pointer ${isActive
                                            ? "bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white border-brand-orange shadow-orange-glow"
                                            : "bg-panel dark:bg-surface-container border-outline-variant/40 text-text-muted hover:text-text-main hover:bg-card"
                                            }`}
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-card dark:bg-surface-container-high text-text-muted"
                                                }`}
                                        >
                                            <Icon className="text-base" />
                                        </div>
                                        <div className="min-w-0">
                                            <p
                                                className={`text-title-md leading-snug truncate ${isActive
                                                    ? "font-bold text-white"
                                                    : "font-semibold text-text-main"
                                                    }`}
                                            >
                                                {tab.label}
                                            </p>
                                            <p
                                                className={`text-body-sm truncate mt-0.5 ${isActive ? "text-white/80" : "text-text-muted"
                                                    }`}
                                            >
                                                {tab.subtitle}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </header>

                    {/* Main Settings Content Panel */}
                    <div className="grid grid-cols-1">
                        <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-7 border border-outline-variant/40 shadow-level-2">
                            <form onSubmit={handleSaveSubmit} className="flex flex-col gap-6">
                                {/* -------------------------------------------------------
                                    TAB 1: PROFILE & IDENTITY
                                   ------------------------------------------------------- */}
                                {activeTab === "profile" && (
                                    <>
                                        <div className="border-b border-outline-variant/30 pb-4">
                                            <h2 className="text-headline-sm text-text-main font-bold">
                                                Profile &amp; Identity
                                            </h2>
                                            <p className="text-body-sm text-text-muted mt-0.5">
                                                Manage how your profile appears across workspaces, PR
                                                reviews, and team chats.
                                            </p>
                                        </div>

                                        {/* Avatar Banner Card */}
                                        <div className="p-4 sm:p-5 rounded-xl bg-card/60 dark:bg-surface-container-low border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative shrink-0">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80"
                                                        alt="Alex Chen"
                                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-orange"
                                                    />
                                                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-brand-emerald border-2 border-panel" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-title-md font-bold text-text-main">
                                                            {values.fullName}
                                                        </h3>
                                                        <span className="badge-in-progress px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                                                            MANAGER
                                                        </span>
                                                    </div>
                                                    <p className="text-body-sm text-text-muted">
                                                        @{values.displayHandle} • {values.department}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2.5">
                                                <SecondaryBtn
                                                    type="button"
                                                    text="Upload Avatar"
                                                    className="text-xs px-3.5 py-2"
                                                />
                                                <GhostBtn
                                                    type="button"
                                                    text="Remove"
                                                    className="text-xs px-3 py-2 text-error hover:text-error"
                                                />
                                            </div>
                                        </div>

                                        {/* Profile Form Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="fullName"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    id="fullName"
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    className="input-kinetic"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="displayHandle"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Workspace Handle
                                                </label>
                                                <input
                                                    id="displayHandle"
                                                    type="text"
                                                    name="displayHandle"
                                                    value={values.displayHandle}
                                                    onChange={handleChange}
                                                    className="input-kinetic font-mono"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="email"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Work Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    className="input-kinetic"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="roleTitle"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Role / Title
                                                </label>
                                                <input
                                                    id="roleTitle"
                                                    type="text"
                                                    name="roleTitle"
                                                    value={values.roleTitle}
                                                    onChange={handleChange}
                                                    className="input-kinetic"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="department"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Primary Squad / Department
                                                </label>
                                                <input
                                                    id="department"
                                                    type="text"
                                                    name="department"
                                                    value={values.department}
                                                    onChange={handleChange}
                                                    className="input-kinetic"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="timezone"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Operational Timezone
                                                </label>
                                                <select
                                                    id="timezone"
                                                    name="timezone"
                                                    value={values.timezone}
                                                    onChange={handleChange}
                                                    className="input-kinetic cursor-pointer"
                                                >
                                                    <option value="Asia/Kolkata (GMT+5:30)">
                                                        Asia/Kolkata (GMT+5:30)
                                                    </option>
                                                    <option value="UTC (GMT+0:00)">
                                                        UTC (GMT+0:00)
                                                    </option>
                                                    <option value="America/New_York (GMT-5:00)">
                                                        America/New_York (GMT-5:00)
                                                    </option>
                                                    <option value="Europe/London (GMT+1:00)">
                                                        Europe/London (GMT+1:00)
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Bio Textarea */}
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="bio"
                                                className="text-label-md text-text-main font-semibold"
                                            >
                                                Operator Bio &amp; Focus Areas
                                            </label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={3}
                                                value={values.bio}
                                                onChange={handleChange}
                                                className="w-full p-3 rounded-lg bg-canvas border border-outline-variant text-text-main text-body-md focus:border-brand-orange focus:outline-none resize-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* -------------------------------------------------------
                                    TAB 2: APPEARANCE & UI
                                   ------------------------------------------------------- */}
                                {activeTab === "appearance" && (
                                    <>
                                        <div className="border-b border-outline-variant/30 pb-4">
                                            <h2 className="text-headline-sm text-text-main font-bold">
                                                Appearance &amp; Workspace UI
                                            </h2>
                                            <p className="text-body-sm text-text-muted mt-0.5">
                                                Customize your Kinetic Horizon color mode, interface
                                                density, and default landing screen.
                                            </p>
                                        </div>

                                        {/* Theme Selector Cards */}
                                        <div className="flex flex-col gap-2.5">
                                            <span className="text-label-md text-text-main font-semibold">
                                                Color Theme Mode
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Light Mode Card */}
                                                <button
                                                    type="button"
                                                    onClick={() => theme !== "light" && toggleTheme()}
                                                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between ${theme === "light"
                                                        ? "border-brand-orange bg-brand-orange/10 shadow-orange-glow"
                                                        : "border-outline-variant/40 bg-card/50 hover:border-outline-variant"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center">
                                                            <FaSun className="text-lg" />
                                                        </div>
                                                        <div>
                                                            <p className="text-title-md font-bold text-text-main">
                                                                Kinetic Daylight
                                                            </p>
                                                            <p className="text-body-sm text-text-muted">
                                                                High-contrast slate canvas for bright rooms
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {theme === "light" && (
                                                        <span className="px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold">
                                                            ACTIVE
                                                        </span>
                                                    )}
                                                </button>

                                                {/* Dark Mode Card */}
                                                <button
                                                    type="button"
                                                    onClick={() => theme !== "dark" && toggleTheme()}
                                                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between ${theme === "dark"
                                                        ? "border-brand-orange bg-brand-orange/10 shadow-orange-glow"
                                                        : "border-outline-variant/40 bg-card/50 hover:border-outline-variant"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                                                            <FaMoon className="text-lg" />
                                                        </div>
                                                        <div>
                                                            <p className="text-title-md font-bold text-text-main">
                                                                Horizon Obsidian
                                                            </p>
                                                            <p className="text-body-sm text-text-muted">
                                                                Deep tactical dark surfaces with orange glow
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {theme === "dark" && (
                                                        <span className="px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold">
                                                            ACTIVE
                                                        </span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Interface Density */}
                                        <div className="flex flex-col gap-2.5">
                                            <span className="text-label-md text-text-main font-semibold">
                                                Layout Density
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {[
                                                    {
                                                        id: "comfortable",
                                                        title: "Comfortable (Default)",
                                                        desc: "Generous padding across Kanban cards and tables",
                                                    },
                                                    {
                                                        id: "compact",
                                                        title: "Compact Tactical",
                                                        desc: "Higher information density for large backlogs",
                                                    },
                                                ].map((option) => (
                                                    <button
                                                        key={option.id}
                                                        type="button"
                                                        onClick={() => setDensity(option.id)}
                                                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${density === option.id
                                                            ? "border-brand-orange bg-brand-orange/10"
                                                            : "border-outline-variant/40 bg-card/40 hover:bg-card"
                                                            }`}
                                                    >
                                                        <p className="text-label-lg font-bold text-text-main">
                                                            {option.title}
                                                        </p>
                                                        <p className="text-body-sm text-text-muted mt-0.5">
                                                            {option.desc}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Default Startup Route & Motion Checkboxes */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="defaultView"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Default Startup Screen
                                                </label>
                                                <select
                                                    id="defaultView"
                                                    name="defaultView"
                                                    value={values.defaultView}
                                                    onChange={handleChange}
                                                    className="input-kinetic cursor-pointer"
                                                >
                                                    <option value="/dashboard">Dashboard Overview</option>
                                                    <option value="/chats">Team Chats</option>
                                                    <option value="/friends">Friends &amp; Teammates</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 pt-2">
                                            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                                                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        name="reducedMotion"
                                                        checked={values.reducedMotion}
                                                        onChange={handleChange}
                                                        className="peer checkbox-kinetic"
                                                    />
                                                    <FaCheck className="absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                </div>
                                                <div>
                                                    <p className="text-label-lg font-semibold text-text-main">
                                                        Reduce Orbital &amp; Floating Animations
                                                    </p>
                                                    <p className="text-body-sm text-text-muted">
                                                        Minimize background keyframe motion across dashboard
                                                        illustrations.
                                                    </p>
                                                </div>
                                            </label>

                                            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                                                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        name="codeFontLigatures"
                                                        checked={values.codeFontLigatures}
                                                        onChange={handleChange}
                                                        className="peer checkbox-kinetic"
                                                    />
                                                    <FaCheck className="absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                </div>
                                                <div>
                                                    <p className="text-label-lg font-semibold text-text-main">
                                                        Enable Monospace Telemetry Ligatures
                                                    </p>
                                                    <p className="text-body-sm text-text-muted">
                                                        Use enhanced font rendering for commit hashes, task
                                                        IDs, and code blocks.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </>
                                )}

                                {/* -------------------------------------------------------
                                    TAB 3: NOTIFICATIONS & TELEMETRY
                                   ------------------------------------------------------- */}
                                {activeTab === "notifications" && (
                                    <>
                                        <div className="border-b border-outline-variant/30 pb-4">
                                            <h2 className="text-headline-sm text-text-main font-bold">
                                                Notifications &amp; Telemetry Alerts
                                            </h2>
                                            <p className="text-body-sm text-text-muted mt-0.5">
                                                Choose which real-time events trigger desktop banners,
                                                audio cues, or email digests.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {[
                                                {
                                                    name: "notifyDirectMessages",
                                                    title: "Direct Messages & Mentions",
                                                    desc: "Instant alerts when a teammate messages you or tags @alex.chen in chat.",
                                                    badge: "REAL-TIME",
                                                },
                                                {
                                                    name: "notifyPrReviews",
                                                    title: "Pull Request & Code Review Telemetry",
                                                    desc: "Notify when automated checks complete or a PR linked to your task needs review.",
                                                    badge: "GIT SYNC",
                                                },
                                                {
                                                    name: "notifySprintVelocity",
                                                    title: "Sprint Velocity & Burndown Anomalies",
                                                    desc: "Alert when squad cycle time drifts above threshold during an active sprint.",
                                                    badge: "METRICS",
                                                },
                                                {
                                                    name: "notifyDeadlineWarnings",
                                                    title: "Approaching Task Deadlines",
                                                    desc: "Receive a reminder 24 hours before high-priority tasks are due.",
                                                    badge: "SCHEDULE",
                                                },
                                                {
                                                    name: "notifyMarketingDigest",
                                                    title: "Weekly Executive Summary Digest",
                                                    desc: "Receive a Monday morning email report of completed tasks across all workspaces.",
                                                    badge: "EMAIL",
                                                },
                                            ].map((item) => (
                                                <label
                                                    key={item.name}
                                                    className="flex items-start justify-between gap-4 p-4 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/40 hover:border-brand-orange/40 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-start gap-3.5">
                                                        <div className="relative flex items-center justify-center shrink-0 mt-1">
                                                            <input
                                                                type="checkbox"
                                                                name={item.name}
                                                                checked={values[item.name]}
                                                                onChange={handleChange}
                                                                className="peer checkbox-kinetic"
                                                            />
                                                            <FaCheck className="absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="text-title-md font-bold text-text-main">
                                                                    {item.title}
                                                                </span>
                                                                <span className="px-2 py-0.5 rounded bg-surface-container-highest text-text-muted text-[10px] font-mono">
                                                                    {item.badge}
                                                                </span>
                                                            </div>
                                                            <p className="text-body-sm text-text-muted mt-0.5">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* -------------------------------------------------------
                                    TAB 4: SECURITY & SESSIONS
                                   ------------------------------------------------------- */}
                                {activeTab === "security" && (
                                    <>
                                        <div className="border-b border-outline-variant/30 pb-4">
                                            <h2 className="text-headline-sm text-text-main font-bold">
                                                Security &amp; Sessions
                                            </h2>
                                            <p className="text-body-sm text-text-muted mt-0.5">
                                                Manage your password and active device sessions.
                                            </p>
                                        </div>

                                        {/* Password Update Section */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="currentPassword"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Current Password
                                                </label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
                                                    <input
                                                        id="currentPassword"
                                                        type="password"
                                                        name="currentPassword"
                                                        value={values.currentPassword}
                                                        onChange={handleChange}
                                                        placeholder="••••••••••••"
                                                        className="input-kinetic pl-9"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="newPassword"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
                                                    <input
                                                        id="newPassword"
                                                        type="password"
                                                        name="newPassword"
                                                        value={values.newPassword}
                                                        onChange={handleChange}
                                                        placeholder="Min 8 characters"
                                                        className="input-kinetic pl-9"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="text-label-md text-text-main font-semibold"
                                                >
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
                                                    <input
                                                        id="confirmPassword"
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={values.confirmPassword}
                                                        onChange={handleChange}
                                                        placeholder="Repeat password"
                                                        className="input-kinetic pl-9"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Active Device Sessions */}
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-title-md font-bold text-text-main">
                                                Active Device Sessions
                                            </h3>
                                            <div className="divide-y divide-outline-variant/30 rounded-xl border border-outline-variant/40 overflow-hidden">
                                                {sessions.map((sess) => (
                                                    <div
                                                        key={sess.id}
                                                        className="p-4 bg-card/30 dark:bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                                    >
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-brand-cyan shrink-0">
                                                                <FaDesktop className="text-base" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-label-lg font-bold text-text-main">
                                                                        {sess.device}
                                                                    </p>
                                                                    {sess.current && (
                                                                        <span className="badge-completed px-2 py-0.5 rounded text-[10px] font-mono">
                                                                            CURRENT
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-body-sm text-text-muted font-mono">
                                                                    {sess.location} • IP {sess.ip} • {sess.status}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {!sess.current && (
                                                            <GhostBtn
                                                                type="button"
                                                                onClick={() => handleRevokeSession(sess.id)}
                                                                text="Revoke"
                                                                icon={<FaTrash className="text-xs" />}
                                                                position="left"
                                                                className="text-error hover:text-error text-xs self-end sm:self-auto"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="p-4 sm:p-5 rounded-xl bg-error/10 border border-error/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                                            <div className="flex items-start gap-3">
                                                <FaExclamationTriangle className="text-error text-lg shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="text-title-md font-bold text-text-main">
                                                        Deactivate Operator Account
                                                    </h4>
                                                    <p className="text-body-sm text-text-muted">
                                                        Permanently remove your personal sandboxes and
                                                        revoke all workspace memberships.
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="px-4 py-2.5 rounded-lg bg-error text-white text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0"
                                            >
                                                Deactivate Account
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* =========================================================
                                    ACTION BTN's
                                   ========================================================= */}
                                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-3">
                                    <GhostBtn
                                        type="button"
                                        text="Discard Changes"
                                        className="px-4 py-2.5"
                                    />
                                    <PrimaryBtn
                                        type="submit"
                                        text={
                                            saveStatus === "saved"
                                                ? "Changes Saved!"
                                                : "Save Preferences"
                                        }
                                        icon={saveStatus === "saved" && <FaCheck className="text-xs" />}
                                        position="left"
                                        className="px-6 py-2.5 rounded-lg text-label-lg"
                                    />
                                </div>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Settings;