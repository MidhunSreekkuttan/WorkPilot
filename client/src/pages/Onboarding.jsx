import { useEffect, useState } from "react";
import {
    FaArrowRight,
    FaBolt,
    FaChartLine,
    FaCheck,
    FaCheckCircle,
    FaExternalLinkAlt,
    FaIdBadge,
    FaKey,
    FaLightbulb,
    FaNetworkWired,
    FaPlusSquare,
    FaShareAlt,
    FaStar,
    FaTachometerAlt,
    FaTerminal,
    FaUserPlus,
    FaUsers,
} from "react-icons/fa";
import JoinWorkSpace from "../components/JoinWorkSpace";
import CreateWorkSpace from "../components/CreateWorkSpace";
import { PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";

const createFeatures = [
    "Dedicated project kanban, release roadmap & sprint telemetry",
    "Custom role matrices, audit logs, granular policies & SAML SSO",
    "Unlimited team sandboxes, high-concurrency queues & cloud storage",
];

const joinFeatures = [
    "Instant access to team task backlogs, roadmaps & issue boards",
    "Retain linked commit hashes, automated PR reviews & comments",
    "Seamless handshakes with enterprise Okta, Google & Azure AD",
];

const plugins = ["GitHub", "Linear", "Slack", "Jira"];

const Onboarding = () => {
    // Modal State: null | "create" | "join"
    const [activeModal, setActiveModal] = useState(null);

    // Handle Escape key & body scroll lock
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
        <div className="bg-background text-body-md text-on-surface antialiased min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="w-full bg-background flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] 
                px-4 sm:px-8">
                <div className="flex flex-col w-full py-10 max-w-7xl mx-auto">
                    {/* Top Ambient Glow Field */}
                    <div className="relative w-full overflow-hidden flex flex-col items-center">
                        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[320px] 
                            bg-gradient-to-b from-primary-container/15 via-primary/5 to-transparent blur-3xl
                                 pointer-events-none -z-10" />

                        {/* Status Badge Pill */}
                        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full 
                            bg-surface-container-high shadow-md border border-outline-variant/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary 
                                    opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
                            </span>
                            <span className="text-label-caps text-on-surface uppercase tracking-wider">
                                Authenticated • Onboarding Flow
                            </span>
                            <span className="text-on-surface-variant text-label-caps opacity-40">
                                |
                            </span>
                            <span className="text-label-md text-primary font-semibold">
                                Zero-State Initialization
                            </span>
                        </div>

                        {/* Main Headings */}
                        <div className="mt-6 text-center max-w-3xl">
                            <h1 className="text-display-hero text-on-surface tracking-tight">
                                Your team journey{" "}
                                <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text 
                                    text-transparent">
                                    starts here
                                </span>
                            </h1>
                            <p className="mt-4 text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                                You are authenticated! Select your operational path to establish
                                telemetry hubs, synchronize sprints, or connect seamlessly to an
                                established enterprise workspace.
                            </p>
                        </div>

                        {/* Hero Telemetry Visual Canvas Mosaic */}
                        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Left Metric Tile */}
                            <div className="md:col-span-3 bg-surface-container-low rounded-xl p-4 shadow-lg border 
                                border-outline-variant/30 flex flex-col gap-1 relative overflow-hidden group hover:scale-[1.02]
                                     transition-transform duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-full blur-xl
                                     pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <span className="text-label-caps text-on-surface-variant">
                                        VELOCITY TELEMETRY
                                    </span>
                                    <FaTachometerAlt className="text-primary text-base" />
                                </div>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-headline-lg text-on-surface font-bold">
                                        98.4%
                                    </span>
                                    <span className="text-label-md text-tertiary flex items-center gap-1">
                                        <FaChartLine className="text-xs" /> +14.2%
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[82%] 
                                        rounded-full" />
                                </div>
                                <span className="text-body-sm text-on-surface-variant mt-1">
                                    Autonomous sprint readiness rating
                                </span>
                            </div>

                            {/* Center Operational Node Hub */}
                            <div className="md:col-span-6 bg-surface-container rounded-xl p-6 shadow-xl border 
                                border-outline-variant/30 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
                                        <span className="text-label-caps text-on-surface tracking-wider">
                                            TOPOLOGY MAP // ORG ROUTE
                                        </span>
                                    </div>
                                    <span className="text-label-caps text-on-surface-variant bg-surface-container-high px-2.5 
                                        py-0.5 rounded-full">
                                        4 NODES STANDBY
                                    </span>
                                </div>

                                {/* Node Graph Visualization */}
                                <div className="relative py-2 flex items-center justify-between">
                                    {/* Central Connecting SVG */}
                                    <svg
                                        className="absolute inset-0 w-full h-full pointer-events-none 
                                            stroke-outline-variant/40"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 400 60"
                                    >
                                        <path
                                            className="opacity-60"
                                            d="M 40 30 C 120 10, 160 50, 200 30 C 240 10, 280 50, 360 30"
                                            fill="none"
                                            strokeDasharray="4 4"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx="200"
                                            cy="30"
                                            fill="var(--color-surface-container)"
                                            r="18"
                                            stroke="#ff6a00"
                                            strokeWidth="2"
                                        />
                                    </svg>

                                    {/* Node 1: Identity */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center 
                                            justify-center text-on-surface shadow-md">
                                            <FaIdBadge className="text-lg" />
                                        </div>
                                        <span className="text-label-caps text-on-surface-variant mt-1.5">
                                            AUTH_OK
                                        </span>
                                    </div>

                                    {/* Node 2: Core Workspace Hub */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-primary to-primary-container 
                                            flex items-center justify-center shadow-lg shadow-primary-container/30">
                                            <FaNetworkWired className="text-on-primary-container text-xl" />
                                        </div>
                                        <span className="text-label-caps text-primary font-bold mt-1.5">
                                            DISCOVERY
                                        </span>
                                    </div>

                                    {/* Node 3: Telemetry Stream */}
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center 
                                            justify-center text-on-surface shadow-md">
                                            <FaShareAlt className="text-lg" />
                                        </div>
                                        <span className="text-label-caps text-on-surface-variant mt-1.5">
                                            SYNC_IDLE
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-2
                                     bg-surface-container-lowest/60 px-4 py-1.5 rounded-lg">
                                    <div className="flex items-center gap-1.5">
                                        <FaCheckCircle className="text-tertiary text-sm shrink-0" />
                                        <span className="text-body-sm text-on-surface">
                                            SSO Session Verified: Sarah Jenkins
                                        </span>
                                    </div>
                                    <span className="text-label-caps text-secondary font-mono">
                                        TENANT_VOID_00
                                    </span>
                                </div>
                            </div>

                            {/* Right Metric Tile */}
                            <div className="md:col-span-3 bg-surface-container-low rounded-xl p-4 shadow-lg border 
                                border-outline-variant/30 flex flex-col gap-1 relative overflow-hidden group hover:scale-[1.02] 
                                    transition-transform duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl 
                                    pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <span className="text-label-caps text-on-surface-variant">
                                        PIPELINE ADAPTERS
                                    </span>
                                    <FaTerminal className="text-secondary text-base" />
                                </div>
                                <div className="flex items-baseline gap-1.5 mt-1">
                                    <span className="text-headline-lg text-on-surface font-bold">
                                        140+
                                    </span>
                                    <span className="text-label-md text-on-surface-variant font-medium">
                                        PLUGINS
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                    {plugins.map((plugin) => (
                                        <span
                                            key={plugin}
                                            className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface
                                                 text-[11px] font-mono"
                                        >
                                            {plugin}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-body-sm text-on-surface-variant mt-1">
                                    Zero-friction external tool handshakes
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Primary Choice Action Cards Grid */}
                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
                        {/* OPTION A: Create Workspace */}
                        <div className="relative rounded-xl p-6 bg-surface-container border border-outline-variant/30 flex
                             flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1
                                 overflow-hidden group">
                            {/* Glow Underlay */}
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl 
                                pointer-events-none group-hover:bg-primary-container/30 transition-all duration-500" />
                            {/* Top Accent Ribbon Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary 
                                via-primary-container to-primary" />

                            <div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10
                                         text-primary text-label-caps uppercase tracking-wide">
                                        <FaStar className="text-xs" /> Recommended for Team Leads &amp;
                                        Owners
                                    </span>
                                    <span className="text-label-caps text-on-surface-variant uppercase tracking-widest font-mono">
                                        OPT_01
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 mt-6">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-b from-primary to-primary-container 
                                        flex items-center justify-center shadow-lg shadow-primary-container/30 shrink-0">
                                        <FaPlusSquare className="text-on-primary-container text-2xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-headline-md text-on-surface tracking-tight">
                                            Create a workspace
                                        </h2>
                                        <p className="mt-1 text-body-md text-on-surface-variant leading-relaxed">
                                            Set up a designated operational workspace for your
                                            cross-functional squads or personal sprints. Invite
                                            members, assign access policies, and configure automated
                                            velocity charts.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Points */}
                                <div className="mt-6 space-y-2.5 bg-surface-container-lowest/60 p-4 rounded-lg">
                                    {createFeatures.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2.5">
                                            <div className="w-5 h-5 rounded-full bg-primary-container/20 flex items-center
                                                 justify-center shrink-0">
                                                <FaCheck className="text-primary text-[10px]" />
                                            </div>
                                            <span className="text-body-md text-on-surface">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button Area */}
                            <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t 
                                border-outline-variant/20">
                                <div className="flex items-center gap-1.5 text-on-surface-variant text-label-md">
                                    <FaBolt className="text-tertiary text-sm" />
                                    <span>Zero credit card required for setup</span>
                                </div>
                                <PrimaryBtn
                                    type="button"
                                    onClick={() => setActiveModal("create")}
                                    text="Create Workspace"
                                    position="right"
                                    icon={<FaArrowRight className="text-base" />}
                                    iconHover="group-hover:translate-x-1"
                                    className="w-full sm:w-auto text-headline-sm"
                                />
                            </div>
                        </div>

                        {/* OPTION B: Join Workspace */}
                        <div className="relative rounded-xl p-6 bg-surface-container border border-outline-variant/30 flex 
                            flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-1
                                 overflow-hidden group">
                            {/* Glow Underlay */}
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl
                                 pointer-events-none group-hover:bg-secondary/20 transition-all duration-500" />
                            {/* Top Neutral Accent Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-surface-container-highest" />

                            <div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 
                                        text-secondary text-label-caps uppercase tracking-wide">
                                        <FaUserPlus className="text-xs" /> For Invited Teammates
                                    </span>
                                    <span className="text-label-caps text-on-surface-variant uppercase tracking-widest font-mono">
                                        OPT_02
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 mt-6">
                                    <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center
                                         justify-center shadow-lg shrink-0">
                                        <FaUsers className="text-secondary text-2xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-headline-md text-on-surface tracking-tight">
                                            Join a workspace
                                        </h2>
                                        <p className="mt-1 text-body-md text-on-surface-variant leading-relaxed">
                                            Step into an active workspace already deployed by your
                                            engineering lead or manager. Simply enter your workspace
                                            invite key or paste your unique invitation link.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Points */}
                                <div className="mt-6 space-y-2.5 bg-surface-container-lowest/60 p-4 rounded-lg">
                                    {joinFeatures.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2.5">
                                            <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center
                                                 justify-center shrink-0">
                                                <FaCheck className="text-secondary text-[10px]" />
                                            </div>
                                            <span className="text-body-md text-on-surface">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button Area */}
                            <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t 
                                border-outline-variant/20">
                                <div className="flex items-center gap-1.5 text-on-surface-variant text-label-md">
                                    <FaKey className="text-secondary text-sm" />
                                    <span>Requires 6-digit code or invite URL</span>
                                </div>
                                <SecondaryBtn
                                    type="button"
                                    onClick={() => setActiveModal("join")}
                                    text="Join Workspace"
                                    position="right"
                                    icon={<FaArrowRight className="text-base" />}
                                    iconHover="group-hover:translate-x-1"
                                    className="w-full sm:w-auto text-headline-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Supporting Context Banner & Guidance */}
                    <div className="mt-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4
                         bg-surface-container-low rounded-xl shadow-inner border border-outline-variant/20">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center
                                 text-primary shrink-0">
                                <FaLightbulb className="text-base" />
                            </div>
                            <p className="text-body-sm text-on-surface-variant">
                                <strong className="text-on-surface font-semibold">
                                    Workspace Portability:
                                </strong>{" "}
                                You can create personal sandboxes or switch seamlessly across
                                multiple corporate tenant organizations at any time from your
                                account settings.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-right shrink-0">
                            <a
                                href="#guide"
                                className="text-label-md text-primary hover:text-on-surface transition-colors flex items-center
                                     gap-1.5"
                            >
                                <span>Organization Guide</span>
                                <FaExternalLinkAlt className="text-[11px]" />
                            </a>
                            <a
                                href="#support"
                                className="text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                            >
                                Contact Operations Desk
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL A: CREATE WORKSPACE */}
            {activeModal === "create" && <CreateWorkSpace setActiveModal={setActiveModal} />}

            {/* MODAL B: JOIN WORKSPACE */}
            {activeModal === "join" && <JoinWorkSpace setActiveModal={setActiveModal} />}
        </div>
    );
};

export default Onboarding;