import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaCheck, FaPlus } from "react-icons/fa";
import { PrimaryBtn } from "../configs/UseBtn";
import useForm from "../coustom-hooks/UseForm";

const initialTeammates = [
    {
        id: "sarah-kim",
        name: "Sarah Kim",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Dev Squad",
        workspaceVariant: "squad",
        taskLabel: "Task:",
        taskValue: "Active: #WP-482",
        online: true,
    },
    {
        id: "david-lee",
        name: "David Lee",
        role: "Backend Dev",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Dev Squad",
        workspaceVariant: "squad",
        taskLabel: "Active:",
        taskValue: "#WP-311",
        online: true,
    },
    {
        id: "sarah-jenkins",
        name: "Sarah Jenkins",
        role: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Marketing Hub",
        workspaceVariant: "marketing",
        taskLabel: "Task:",
        taskValue: "Meeting",
        online: true,
    },
    {
        id: "marcus-chen",
        name: "Marcus Chen",
        role: "QA Engineer",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Dev Squad",
        workspaceVariant: "squad",
        taskLabel: "Task:",
        taskValue: "Testing PR-12",
        online: true,
    },
    {
        id: "michael-brown",
        name: "Michael Brown",
        role: "Full-Stack Dev",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Dev Squad",
        workspaceVariant: "squad",
        taskLabel: "Task:",
        taskValue: "Debugging",
        online: true,
    },
    {
        id: "jessica-taylor",
        name: "Jessica Taylor",
        role: "Content Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        sharedWorkspace: "Marketing Hub",
        workspaceVariant: "marketing",
        taskLabel: "Task:",
        taskValue: "Editing Blog",
        online: true,
    },
];

const initialPendingRequests = [
    {
        id: "emily-watson",
        name: "Emily Watson",
        workspace: "Dev Squad",
        role: "Frontend Engineer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    },
];

const Friends = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [teammates, setTeammates] = useState(initialTeammates);
    const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
    const [inviteSent, setInviteSent] = useState(false);
    const [openReq, setOpenReq] = useState(false)

    const inviteInputRef = useRef(null);

    const { values, handleChange } = useForm({
        inviteTarget: "",
    });

    const handleAcceptRequest = (req) => {
        setPendingRequests((prev) => prev.filter((item) => item.id !== req.id));
        setTeammates((prev) => [
            {
                id: req.id,
                name: req.name,
                role: req.role,
                avatar: req.avatar,
                sharedWorkspace: req.workspace,
                workspaceVariant: "squad",
                taskLabel: "Task:",
                taskValue: "Onboarding",
                online: true,
            },
            ...prev,
        ]);
    };

    const handleDeclineRequest = (id) => {
        setPendingRequests((prev) => prev.filter((item) => item.id !== id));
    };

    const handleInviteSubmit = (e) => {
        e.preventDefault();
        if (!values.inviteTarget.trim()) return;

        setInviteSent(true);
        handleChange({
            target: { name: "inviteTarget", value: "", type: "text" },
        });

        setTimeout(() => {
            setInviteSent(false);
        }, 2000);
    };

    const tabs = [
        { id: "online", label: "Online", count: 14 },
        { id: "all", label: "All Friends", count: 24 },
        { id: "pending", label: "Pending Requests", count: 3 },
    ];

    useEffect(() => {

        if (openReq) {
            document.body.style.overflow = "hidden"
            inviteInputRef.current?.focus()
        } else {
            document.body.style.overflow = ""
        }

        const closeReq = (e) => {
            if (e.key === "Escape" && openReq) {
                setOpenReq(false)
            }
        }
        window.addEventListener('keydown', closeReq)

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener('keydown', closeReq)
        }
    }, [openReq])

    return (
        <>
            <Helmet>
                <title>WorkPilot | Friends</title>
            </Helmet>

            <div className="relative min-h-screen surface-level-0 text-text-main flex selection:bg-brand-orange selection:text-white">
                <div className="flex-1 flex flex-col min-w-0">
                    <main className="flex-1 px-4 sm:px-8 py-4 max-w-[1440px] w-full mx-auto">
                        <div className="grid gap-6 items-start">

                            {/* LEFT / MAIN DIRECTORY PANEL */}
                            <section className="xl:col-span-9 bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">

                                {/* Header & Filter Tabs */}
                                <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-7 border-b border-outline-variant/40 pb-3">
                                    <h1 className="text-headline-sm sm:text-headline-md font-bold text-text-main tracking-tight">
                                        Friends &amp; Teammates
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                        {tabs.map((tab) => {
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`relative pb-3 -mb-3.5 inline-flex items-center gap-2 text-body-md font-medium transition-colors cursor-pointer ${isActive
                                                        ? "text-brand-orange font-semibold border-b-2 border-brand-orange"
                                                        : "text-text-muted hover:text-text-main"
                                                        }`}
                                                >
                                                    <span>{tab.label}</span>
                                                    <span
                                                        className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${isActive
                                                            ? "bg-brand-orange/20 text-brand-orange"
                                                            : "bg-card dark:bg-surface-container-highest text-text-muted"
                                                            }`}
                                                    >
                                                        {tab.count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <PrimaryBtn
                                        type="button"
                                        onClick={() => setOpenReq(true)}
                                        text="Add Friend"
                                        icon={<FaPlus className="text-xs" />}
                                        position="left"
                                        className="flex-1 py-3 rounded-xl text-label-lg shadow-orange-glow"
                                    />
                                </div>

                                {/* Pending Request Banner[cite: 4] */}
                                {pendingRequests.map((req) => (
                                    <div
                                        key={req.id}
                                        className="bg-card/60 dark:bg-surface-container-low rounded-xl px-4 sm:px-5 py-3.5 border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                    >
                                        <p className="text-body-md text-text-main font-semibold">
                                            Pending Request: {req.name}{" "}
                                            <span className="text-text-muted font-normal">
                                                ({req.workspace})
                                            </span>
                                        </p>

                                        <div className="flex items-center gap-2.5 self-end sm:self-auto">
                                            <button
                                                type="button"
                                                onClick={() => handleAcceptRequest(req)}
                                                className="px-3.5 py-1.5 rounded-lg text-label-md font-mono font-semibold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/40 hover:bg-brand-emerald/25 active:scale-95 transition-all cursor-pointer"
                                            >
                                                [ Accept ]
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeclineRequest(req.id)}
                                                className="px-3.5 py-1.5 rounded-lg text-label-md font-mono font-semibold bg-error/15 text-error border border-error/40 hover:bg-error/25 active:scale-95 transition-all cursor-pointer"
                                            >
                                                [ Decline ]
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Teammates 3-Column Card Grid[cite: 4] */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {teammates.map((member) => (
                                        <div
                                            key={member.id}
                                            className="bg-card/50 dark:bg-surface-container-low rounded-xl p-4 sm:p-5 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-4"
                                        >
                                            {/* Card Top: Avatar + Name + Online Dot */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    <div className="relative shrink-0">
                                                        <img
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-container-highest"
                                                        />
                                                        {member.online && (
                                                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-brand-emerald border-2 border-panel dark:border-surface-container-low" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h2 className="text-title-md font-bold text-text-main truncate leading-snug">
                                                            {member.name}
                                                        </h2>
                                                        <p className="text-body-sm text-text-muted truncate">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                {member.online && (
                                                    <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald shrink-0 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                                )}
                                            </div>

                                            {/* Card Middle: Shared Workspace & Active Task Telemetry */}
                                            <div className="flex flex-col gap-2.5 text-body-sm pt-1">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-text-muted w-12 shrink-0">
                                                        Shared
                                                    </span>
                                                    <span
                                                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${member.workspaceVariant === "marketing"
                                                            ? "bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30"
                                                            : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                                                            }`}
                                                    >
                                                        {member.sharedWorkspace}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-text-muted w-12 shrink-0">
                                                        {member.taskLabel}
                                                    </span>
                                                    <span className="text-amber-500 dark:text-amber-400 font-medium truncate">
                                                        {member.taskValue}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Bottom: Message Action Button */}
                                            <button
                                                type="button"
                                                className="w-full py-2 px-4 rounded-lg bg-panel/70 dark:bg-surface-container border border-outline-variant/40 text-label-md font-mono text-text-main hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 active:scale-98 transition-all cursor-pointer"
                                            >
                                                [ Message ]
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>
                    </main>
                </div>

                {openReq && (
                    <div onClick={() => setOpenReq(false)}
                        className="absolute inset-0 z-50 bg-canvas/50 backdrop-blur-sm flex items-center justify-center p-4">

                        {/* Add by Email or Token Widget */}
                        <div onClick={e => e.stopPropagation()}
                            className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-3.5 w-full max-w-2xl">
                            <h2 className="text-title-md font-bold text-text-main">
                                Add by Email or Token
                            </h2>

                            <form
                                onSubmit={handleInviteSubmit}
                                className="flex flex-col gap-3"
                            >
                                <input
                                    ref={inviteInputRef}
                                    type="text"
                                    name="inviteTarget"
                                    value={values.inviteTarget}
                                    onChange={handleChange}
                                    placeholder="Enter email or token..."
                                    className="input-kinetic bg-surface-container-lowest"
                                />

                                <PrimaryBtn
                                    type="submit"
                                    text={inviteSent ? "Invite Sent!" : "[ Send Invite ]"}
                                    icon={inviteSent && <FaCheck className="text-xs" />}
                                    position="left"
                                    className="w-full py-2.5 rounded-lg text-label-md font-mono"
                                />
                            </form>
                        </div>

                    </div>
                )}

            </div>

        </>
    );
}

export default Friends