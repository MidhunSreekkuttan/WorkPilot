import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
    FaCheckDouble,
    FaCircle,
    FaCode,
    FaEllipsisV,
    FaLock,
    FaPaperclip,
    FaPaperPlane,
    FaPhoneAlt,
    FaRegComments,
    FaSearch,
    FaSmile,
    FaTimes,
    FaVideo,
} from "react-icons/fa";
import { PrimaryBtn, SecondaryBtn } from "../configs/UseBtn";
import useForm from "../coustom-hooks/UseForm";

const initialContacts = [
    {
        id: "sarah-kim",
        name: "Sarah Kim",
        role: "UI/UX Designer",
        avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        workspace: "Dev Squad",
        workspaceVariant: "squad",
        taskRef: "#WP-482",
        online: true,
        unread: 2,
        lastSeen: "Active now",
    },
    {
        id: "david-lee",
        name: "David Lee",
        role: "Backend Dev",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        workspace: "Dev Squad",
        workspaceVariant: "squad",
        taskRef: "#WP-311",
        online: true,
        unread: 0,
        lastSeen: "Active now",
    },
    {
        id: "sarah-jenkins",
        name: "Sarah Jenkins",
        role: "Product Manager",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
        workspace: "Marketing Hub",
        workspaceVariant: "marketing",
        taskRef: "Sprint 34",
        online: true,
        unread: 1,
        lastSeen: "Active now",
    },
    {
        id: "marcus-chen",
        name: "Marcus Chen",
        role: "QA Engineer",
        avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
        workspace: "Dev Squad",
        workspaceVariant: "squad",
        taskRef: "PR-12",
        online: false,
        unread: 0,
        lastSeen: "25m ago",
    },
    {
        id: "michael-brown",
        name: "Michael Brown",
        role: "Full-Stack Dev",
        avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
        workspace: "Dev Squad",
        workspaceVariant: "squad",
        taskRef: "#WP-509",
        online: true,
        unread: 0,
        lastSeen: "Active now",
    },
    {
        id: "jessica-taylor",
        name: "Jessica Taylor",
        role: "Content Lead",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
        workspace: "Marketing Hub",
        workspaceVariant: "marketing",
        taskRef: "Blog Q4",
        online: false,
        unread: 0,
        lastSeen: "2h ago",
    },
];

const initialMessages = {
    "sarah-kim": [
        {
            id: "m1",
            sender: "them",
            text: "Hey Alex! I just pushed the updated Figma tokens for the dark mode kanban cards.",
            time: "10:14 AM",
        },
        {
            id: "m2",
            sender: "me",
            text: "Awesome, checking them out now. Did we finalize the hover elevation border on #WP-482?",
            time: "10:16 AM",
        },
        {
            id: "m3",
            sender: "them",
            text: "Yes! Using 1px solid rgba(255, 106, 0, 0.35) with a -2px translateY transition.",
            time: "10:18 AM",
        },
        {
            id: "m4",
            sender: "them",
            text: "Let me know once the PR is up so I can run a quick visual QA pass.",
            time: "10:19 AM",
        },
    ],
    "david-lee": [
        {
            id: "m1",
            sender: "them",
            text: "Webhook retry queue is stabilized on staging. Latency dropped to 14.2ms.",
            time: "Yesterday",
        },
        {
            id: "m2",
            sender: "me",
            text: "Great work David. Ready to merge into main after standup.",
            time: "Yesterday",
        },
    ],
    "sarah-jenkins": [
        {
            id: "m1",
            sender: "them",
            text: "Can we review the Sprint 34 velocity metrics before the 3 PM stakeholder sync?",
            time: "09:45 AM",
        },
    ],
    "marcus-chen": [
        {
            id: "m1",
            sender: "me",
            text: "Hey Marcus, how are the e2e tests looking on PR-12?",
            time: "Yesterday",
        },
        {
            id: "m2",
            sender: "them",
            text: "All 48 assertions passing! Ready for production release.",
            time: "Yesterday",
        },
    ],
    "michael-brown": [
        {
            id: "m1",
            sender: "them",
            text: "Refactored the virtualized transaction list. Memory footprint is down 30%.",
            time: "Monday",
        },
    ],
    "jessica-taylor": [
        {
            id: "m1",
            sender: "them",
            text: "Release notes draft for v4.2 is ready in Marketing Hub.",
            time: "Monday",
        },
    ],
};

const Chats = () => {
    const [contacts, setContacts] = useState(initialContacts);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [messagesByContact, setMessagesByContact] = useState(initialMessages);
    const [contactFilter, setContactFilter] = useState("all"); // "all" | "online" | "unread"
    const [searchQuery, setSearchQuery] = useState("");

    const { values, handleChange } = useForm({
        messageText: "",
    });

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const selectedContact =
        contacts.find((c) => c.id === selectedContactId) || null;
    const currentMessages = selectedContactId
        ? messagesByContact[selectedContactId] || []
        : [];

    // Auto-scroll to latest message when switching contacts or sending a message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

        function onClose(e) {
            if (e.key === "Escape") {
                setSelectedContactId(null)
            }
        }

        window.addEventListener('keydown', onClose)
        return () => window.removeEventListener('keydown', onClose)

    }, [selectedContactId, currentMessages.length]);

    // Clear unread badge when a contact is selected
    const handleSelectContact = (contactId) => {
        setSelectedContactId(contactId);
        setContacts((prev) =>
            prev.map((c) => (c.id === contactId ? { ...c, unread: 0 } : c))
        );
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const trimmed = values.messageText.trim();
        if (!trimmed || !selectedContactId) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        const newMsg = {
            id: `msg-${Date.now()}`,
            sender: "me",
            text: trimmed,
            time: timeStr,
        };

        setMessagesByContact((prev) => ({
            ...prev,
            [selectedContactId]: [...(prev[selectedContactId] || []), newMsg],
        }));

        // Reset message input using useForm's handleChange signature
        handleChange({
            target: { name: "messageText", value: "", type: "text" },
        });
    };

    // Filtered contacts for right-hand directory
    const filteredContacts = contacts.filter((contact) => {
        const matchesSearch =
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.workspace.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;
        if (contactFilter === "online") return contact.online;
        if (contactFilter === "unread") return contact.unread > 0;
        return true;
    });

    const onlineCount = contacts.filter((c) => c.online).length;
    const unreadTotal = contacts.reduce((sum, c) => sum + c.unread, 0);

    return (
        <>
            <Helmet>
                <title>WorkPilot | Chats</title>
            </Helmet>

            <div className="min-h-[calc(100vh-4.5rem)] surface-level-0 text-text-main flex selection:bg-brand-orange selection:text-white">
                <main className="flex-1 px-4 sm:px-8 py-4 max-w-[1440px] w-full mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6.5rem)] min-h-[580px]">

                        {/* =========================================================
                LEFT COLUMN: CHAT SESSION AREA (8 COLS)
               ========================================================= */}
                        <section className="lg:col-span-8 bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 flex flex-col overflow-hidden relative">
                            {selectedContact ? (
                                <>
                                    {/* 1. Active Chat Header */}
                                    <header className="px-5 py-3.5 bg-panel/90 dark:bg-surface-container-high/60 border-b border-outline-variant/40 flex items-center justify-between gap-4 shrink-0">
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className="relative shrink-0">
                                                <img
                                                    src={selectedContact.avatar}
                                                    alt={selectedContact.name}
                                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-surface-container-highest"
                                                />
                                                <span
                                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-panel dark:border-surface-container ${selectedContact.online
                                                        ? "bg-brand-emerald"
                                                        : "bg-text-placeholder"
                                                        }`}
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h2 className="text-title-md font-bold text-text-main truncate">
                                                        {selectedContact.name}
                                                    </h2>
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[11px] font-medium ${selectedContact.workspaceVariant === "marketing"
                                                            ? "bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30"
                                                            : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                                            }`}
                                                    >
                                                        {selectedContact.workspace}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 text-[11px] font-mono font-semibold">
                                                        {selectedContact.taskRef}
                                                    </span>
                                                </div>
                                                <p className="text-body-sm text-text-muted truncate mt-0.5">
                                                    {selectedContact.role} •{" "}
                                                    <span
                                                        className={
                                                            selectedContact.online
                                                                ? "text-brand-emerald font-medium"
                                                                : "text-text-placeholder"
                                                        }
                                                    >
                                                        {selectedContact.lastSeen}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Header Action Controls */}
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <button
                                                type="button"
                                                aria-label="Start voice call"
                                                className="p-2.5 rounded-lg text-text-muted hover:text-text-main hover:bg-card transition-colors cursor-pointer"
                                            >
                                                <FaPhoneAlt className="text-sm" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Start video call"
                                                className="p-2.5 rounded-lg text-text-muted hover:text-text-main hover:bg-card transition-colors cursor-pointer"
                                            >
                                                <FaVideo className="text-sm" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedContactId(null)}
                                                aria-label="Close chat session"
                                                title="Close session"
                                                className="p-2.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                                            >
                                                <FaTimes className="text-sm" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Conversation options"
                                                className="p-2.5 rounded-lg text-text-muted hover:text-text-main hover:bg-card transition-colors cursor-pointer"
                                            >
                                                <FaEllipsisV className="text-sm" />
                                            </button>
                                        </div>
                                    </header>

                                    {/* 2. Messages Stream */}
                                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-canvas/40 dark:bg-surface-container-lowest/40">
                                        {/* Telemetry Session Banner */}
                                        <div className="flex items-center justify-center my-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 dark:bg-surface-container-low border border-outline-variant/30 text-[11px] font-mono text-text-muted">
                                                <FaLock className="text-[10px] text-brand-emerald" />
                                                <span>
                                                    E2E ENCRYPTED CHANNEL • {selectedContact.workspace.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {currentMessages.map((msg) => {
                                            const isMe = msg.sender === "me";
                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex flex-col ${isMe ? "items-end" : "items-start"
                                                        }`}
                                                >
                                                    <div className="flex items-end gap-2.5 max-w-[82%] sm:max-w-[70%]">
                                                        {!isMe && (
                                                            <img
                                                                src={selectedContact.avatar}
                                                                alt={selectedContact.name}
                                                                className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-outline-variant/40"
                                                            />
                                                        )}

                                                        <div
                                                            className={`px-4 py-3 rounded-2xl text-body-md leading-relaxed shadow-xs ${isMe
                                                                ? "bg-gradient-to-r from-brand-orange-light to-brand-orange-dark text-white rounded-br-xs shadow-orange-glow"
                                                                : "bg-card dark:bg-surface-container-high text-text-main border border-outline-variant/40 rounded-bl-xs"
                                                                }`}
                                                        >
                                                            <p>{msg.text}</p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`flex items-center gap-1.5 mt-1 text-[11px] font-mono text-text-muted ${isMe ? "pr-1" : "pl-9"
                                                            }`}
                                                    >
                                                        <span>{msg.time}</span>
                                                        {isMe && (
                                                            <FaCheckDouble className="text-[10px] text-brand-cyan" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* 3. Message Composer Footer */}
                                    <form
                                        onSubmit={handleSendMessage}
                                        className="p-3.5 sm:p-4 bg-panel dark:bg-surface-container border-t border-outline-variant/40 flex items-center gap-2.5 shrink-0"
                                    >
                                        <button
                                            type="button"
                                            aria-label="Attach file"
                                            className="p-2.5 rounded-lg text-text-muted hover:text-brand-orange hover:bg-card transition-colors cursor-pointer shrink-0"
                                        >
                                            <FaPaperclip className="text-sm" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Insert code snippet"
                                            className="p-2.5 rounded-lg text-text-muted hover:text-brand-cyan hover:bg-card transition-colors cursor-pointer shrink-0 hidden sm:inline-flex"
                                        >
                                            <FaCode className="text-sm" />
                                        </button>

                                        <div className="relative flex-1 flex items-center">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                name="messageText"
                                                value={values.messageText}
                                                onChange={handleChange}
                                                placeholder={`Message ${selectedContact.name} (${selectedContact.taskRef})...`}
                                                className="input-kinetic pr-10 bg-surface-container-lowest"
                                            />
                                            <button
                                                type="button"
                                                aria-label="Add emoji"
                                                className="absolute right-3 text-text-muted hover:text-brand-orange transition-colors cursor-pointer"
                                            >
                                                <FaSmile className="text-base" />
                                            </button>
                                        </div>

                                        <PrimaryBtn
                                            type="submit"
                                            disabled={!values.messageText.trim()}
                                            text="Send"
                                            icon={<FaPaperPlane className="text-xs" />}
                                            position="right"
                                            className="px-4 py-2.5 rounded-lg text-label-md shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </form>
                                </>
                            ) : (
                                /* =========================================================
                                   EMPTY STATE: NO CONTACT SELECTED
                                   ========================================================= */
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative
                                     overflow-hidden select-none">
                                    {/* Ambient Background Glows */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

                                    {/* Orbital Icon Container */}
                                    <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                                        <div className="absolute inset-0 rounded-full border border-dashed border-brand-orange/40 animate-[spin_25s_linear_infinite]" />
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-cyan/10 border border-outline-variant/40 flex items-center justify-center text-brand-orange shadow-level-2">
                                            <FaRegComments className="text-3xl" />
                                        </div>
                                    </div>

                                    {/* Status Pill */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card dark:bg-surface-container-high border border-outline-variant/40 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                                        <span className="text-label-caps text-text-muted font-mono">
                                            COMM-LINK STANDBY • {onlineCount} TEAMMATES ONLINE
                                        </span>
                                    </div>

                                    <h2 className="text-headline-md text-text-main font-bold tracking-tight">
                                        No conversation selected
                                    </h2>
                                    <p className="text-body-md text-text-muted mt-2 leading-relaxed">
                                        Select a teammate from the{" "}
                                        <span className="text-text-main font-semibold">
                                            Contacts Directory
                                        </span>{" "}
                                        on the right to start collaborating, share PR telemetry, or
                                        sync on sprint tasks.
                                    </p>

                                    {/* Quick-Start Contact Pills */}
                                    <div className="mt-7 flex flex-col items-center gap-2.5">
                                        <span className="text-label-caps text-text-placeholder">
                                            Quick Connect
                                        </span>
                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            {contacts.slice(0, 3).map((person) => (
                                                <SecondaryBtn
                                                    key={person.id}
                                                    type="button"
                                                    onClick={() => handleSelectContact(person.id)}
                                                    text={person.name}
                                                    icon={
                                                        <img
                                                            src={person.avatar}
                                                            alt={person.name}
                                                            className="w-5 h-5 rounded-full object-cover"
                                                        />
                                                    }
                                                    position="left"
                                                    className="px-3.5 py-1.5 rounded-full text-label-md"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* =========================================================
                RIGHT COLUMN: CONTACTS DIRECTORY (4 COLS)
               ========================================================= */}
                        <aside className="lg:col-span-4 bg-panel dark:bg-surface-container rounded-2xl border 
                            border-outline-variant/40 shadow-level-2 flex flex-col overflow-hidden">
                            {/* Directory Header */}
                            <div className="p-5 border-b border-outline-variant/40 flex flex-col gap-4 shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-headline-sm text-text-main font-bold tracking-tight">
                                            Contacts
                                        </h2>
                                        <p className="text-body-sm text-text-muted">
                                            Direct squad channels &amp; teammates
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 text-brand-emerald text-label-caps">
                                        <FaCircle className="text-[7px]" />
                                        <span>{onlineCount} Online</span>
                                    </div>
                                </div>

                                {/* Search Input */}
                                <div className="relative flex items-center">
                                    <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search name, role, or squad..."
                                        className="input-kinetic pl-9 bg-surface-container-lowest h-9 text-body-sm"
                                    />
                                </div>

                                {/* Filter Tabs */}
                                <div className="grid grid-cols-3 gap-1.5 bg-card/70 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                                    {[
                                        { id: "all", label: "All", count: contacts.length },
                                        { id: "online", label: "Online", count: onlineCount },
                                        { id: "unread", label: "Unread", count: unreadTotal },
                                    ].map((tab) => {
                                        const active = contactFilter === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setContactFilter(tab.id)}
                                                className={`py-1.5 px-2 rounded-lg text-label-md font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${active
                                                    ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                                                    : "text-text-muted hover:text-text-main"
                                                    }`}
                                            >
                                                <span>{tab.label}</span>
                                                <span
                                                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${active
                                                        ? "bg-brand-orange/20 text-brand-orange"
                                                        : "bg-surface-container-highest/60 text-text-muted"
                                                        }`}
                                                >
                                                    {tab.count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Contacts List */}
                            <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/25 no-scrollbar">
                                {filteredContacts.length > 0 ? (
                                    filteredContacts.map((contact) => {
                                        const isSelected = contact.id === selectedContactId;
                                        const contactMsgs = messagesByContact[contact.id] || [];
                                        const lastMsg = contactMsgs[contactMsgs.length - 1];

                                        return (
                                            <button
                                                key={contact.id}
                                                type="button"
                                                onClick={() => handleSelectContact(contact.id)}
                                                className={`w-full p-4 flex items-start gap-3.5 text-left transition-all cursor-pointer ${isSelected
                                                    ? "bg-brand-orange/10 dark:bg-brand-orange/15 priority-bar-left"
                                                    : "hover:bg-row-hover"
                                                    }`}
                                            >
                                                {/* Avatar + Online Indicator */}
                                                <div className="relative shrink-0 mt-0.5">
                                                    <img
                                                        src={contact.avatar}
                                                        alt={contact.name}
                                                        className="w-11 h-11 rounded-full object-cover ring-2 ring-surface-container-highest"
                                                    />
                                                    <span
                                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-panel dark:border-surface-container ${contact.online
                                                            ? "bg-brand-emerald"
                                                            : "bg-text-placeholder"
                                                            }`}
                                                    />
                                                </div>

                                                {/* Contact Details & Last Message Preview */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h3
                                                            className={`text-title-md truncate ${isSelected
                                                                ? "text-brand-orange font-bold"
                                                                : "text-text-main font-semibold"
                                                                }`}
                                                        >
                                                            {contact.name}
                                                        </h3>
                                                        {lastMsg && (
                                                            <span className="text-[11px] font-mono text-text-muted shrink-0">
                                                                {lastMsg.time}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-body-sm text-text-muted truncate">
                                                            {contact.role}
                                                        </span>
                                                        <span className="text-text-placeholder">•</span>
                                                        <span className="text-[11px] font-mono text-brand-cyan font-medium shrink-0">
                                                            {contact.taskRef}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 mt-1.5">
                                                        <p className="text-body-sm text-text-muted truncate">
                                                            {lastMsg ? (
                                                                <>
                                                                    {lastMsg.sender === "me" && (
                                                                        <span className="text-text-main font-medium">
                                                                            You:{" "}
                                                                        </span>
                                                                    )}
                                                                    {lastMsg.text}
                                                                </>
                                                            ) : (
                                                                <span className="italic text-text-placeholder">
                                                                    No messages yet
                                                                </span>
                                                            )}
                                                        </p>

                                                        {contact.unread > 0 && (
                                                            <span className="px-2 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold shrink-0 shadow-orange-glow">
                                                                {contact.unread}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="p-8 text-center flex flex-col items-center gap-2">
                                        <p className="text-title-md text-text-main font-semibold">
                                            No teammates found
                                        </p>
                                        <p className="text-body-sm text-text-muted">
                                            Try clearing your search or switching filter tabs.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </aside>

                    </div>
                </main>
            </div>
        </>
    );
};

export default Chats;