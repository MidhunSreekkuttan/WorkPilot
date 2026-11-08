import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
    FaStepBackward,
    FaCheck,
    FaClipboardList,
    FaCode,
    FaCog,
    FaCopy,
    FaFolderOpen,
    FaRegFileAlt,
    FaShieldAlt,
    FaTasks,
    FaThLarge,
    FaUsers,
} from "react-icons/fa";

const workspaceNavigations = (workspaceId) => ({
    manager: [
        { label: "Overview", path: `/work-space/${workspaceId}`, icon: FaThLarge },
        { label: "Projects", path: `/work-space/${workspaceId}/projects`, icon: FaFolderOpen, badge: "4" },
        { label: "Tasks", path: `/work-space/${workspaceId}/tasks`, icon: FaTasks, badge: "18" },
        { label: "Members", path: `/work-space/${workspaceId}/members`, icon: FaUsers, badge: "7" },
        { label: "Files", path: `/work-space/${workspaceId}/files`, icon: FaRegFileAlt },
        { label: "Settings", path: `/work-space/${workspaceId}/settings`, icon: FaCog },
    ],
    member: [
        { label: "Overview", path: `/work-space/${workspaceId}`, icon: FaThLarge },
        { label: "Projects", path: `/work-space/${workspaceId}/projects`, icon: FaFolderOpen, badge: "4" },
        { label: "My Tasks", path: `/work-space/${workspaceId}/my-tasks`, icon: FaClipboardList, badge: "5" },
        { label: "Files", path: `/work-space/${workspaceId}/files`, icon: FaRegFileAlt },
    ],
});

const activeMembers = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
];

const WorkspaceNavigation = ({ role = "member", workspaceName = "Dev Squad", workspaceSubtitle = "Software Development Team" }) => {

    const { workspaceId } = useParams();
    const [copied, setCopied] = useState(false);

    const navigate = useNavigate()

    // Safely support both role="manager" and role={["manager"]}
    const normalizedRole = (Array.isArray(role) ? role[0] : role) || "member";
    const navigations = workspaceNavigations(workspaceId)[normalizedRole] || [];
    const isManager = normalizedRole === "manager";

    const inviteToken = `WP-${workspaceId?.toUpperCase()}`;

    const handleCopyInvite = async () => {
        try {
            await navigator.clipboard.writeText(inviteToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Fallback if clipboard permission is denied
        }
    };

    return (
        <header className="w-full bg-panel/90 dark:bg-surface-container/90 backdrop-blur-md border-b border-outline-variant/40 sticky z-30">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                {/* Top Strip: Workspace Identity & Quick Telemetry */}
                <div className="py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/25">
                    {/* Left: Workspace Avatar, Title & Role Pill */}
                    <div className="flex items-center gap-3.5 min-w-0">
                        <button
                            className="flex items-center gap-1.5 text-text-muted hover:text-text-main transition-colors cursor-pointer mr-2 active:scale-95"
                            onClick={() => navigate('/work-space')}
                            title="Back to Workspaces"
                        >
                            <FaStepBackward size={18} />
                            <span className="text-[16px] font-medium">Back</span>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0 shadow-xs">
                            <FaCode className="text-lg" />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-headline-sm text-text-main font-bold tracking-tight truncate">
                                    {workspaceName}
                                </h1>

                                {/* Workspace ID Pill */}
                                <span className="px-2 py-0.5 rounded bg-card dark:bg-surface-container-highest border border-outline-variant/40 text-[11px] font-mono text-text-muted">
                                    #{workspaceId}
                                </span>

                                {/* Role Governance Badge */}
                                <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-caps ${isManager
                                        ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/30"
                                        : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                        }`}
                                >
                                    <FaShieldAlt className="text-[9px]" />
                                    {normalizedRole}
                                </span>
                            </div>

                            <p className="text-body-sm text-text-muted truncate">
                                {workspaceSubtitle}
                            </p>
                        </div>
                    </div>

                    {/* Right: Active Squad Avatars & Invite Token Button */}
                    <div className="flex items-center gap-3 ml-auto">
                        {/* Online Squad Stack */}
                        <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-outline-variant/40">
                            <div className="flex -space-x-2">
                                {activeMembers.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt="Workspace member"
                                        className="w-7 h-7 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container"
                                    />
                                ))}
                                <div className="w-7 h-7 rounded-full ring-2 ring-panel dark:ring-surface-container bg-card dark:bg-surface-container-highest text-text-muted text-[10px] font-bold flex items-center justify-center">
                                    +4
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-label-md text-brand-emerald font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                                7 Active
                            </span>
                        </div>

                        {/* Copy Invite Code Trigger */}
                        <button
                            type="button"
                            onClick={handleCopyInvite}
                            title="Copy Workspace Invite Token"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 hover:border-brand-orange/60 text-xs font-mono text-text-main transition-all cursor-pointer active:scale-95"
                        >
                            <span className="text-text-muted">KEY:</span>
                            <span className="font-semibold text-brand-orange">
                                {inviteToken}
                            </span>
                            {copied ? (
                                <FaCheck className="text-brand-emerald text-xs" />
                            ) : (
                                <FaCopy className="text-text-muted hover:text-text-main text-xs transition-colors" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom Strip: Scannable Workspace Route Tabs */}
                <nav
                    aria-label="Workspace navigation"
                    className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1"
                >
                    {navigations.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.path || "."}
                                end={item.label === 'Overview'}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-2 px-4 py-2.5 text-label-lg whitespace-nowrap rounded-t-lg transition-all duration-150 select-none ${isActive
                                        ? "text-brand-orange font-semibold bg-brand-orange/[0.06]"
                                        : "text-text-muted hover:text-text-main hover:bg-card/60"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`text-sm shrink-0 transition-transform duration-150 ${isActive
                                                ? "text-brand-orange scale-105"
                                                : "text-text-muted group-hover:text-text-main"
                                                }`}
                                        />
                                        <span>{item.label}</span>

                                        {item.badge && (
                                            <span
                                                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold transition-colors ${isActive
                                                    ? "bg-brand-orange/20 text-brand-orange"
                                                    : "bg-card dark:bg-surface-container-highest text-text-muted"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                        {/* Active Bottom Glow Indicator */}
                                        <span
                                            className={`absolute inset-x-0 bottom-0 h-[2.5px] rounded-t-full transition-all duration-200 ${isActive
                                                ? "bg-gradient-to-r from-brand-orange-light to-brand-orange-dark shadow-orange-glow opacity-100"
                                                : "bg-transparent opacity-0"
                                                }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default React.memo(WorkspaceNavigation);