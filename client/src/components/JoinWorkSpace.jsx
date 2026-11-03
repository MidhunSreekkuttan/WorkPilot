import React from "react";
import { useState } from "react";
import { FaKey, FaLink, FaSpinner, FaTimes } from "react-icons/fa";
import { GhostBtn, SecondaryBtn } from "../configs/UseBtn";

const JoinWorkSpace = ({ setActiveModal, }) => {

    // Join Workspace Form State
    const [inviteCode, setInviteCode] = useState("");
    const [joinStatus, setJoinStatus] = useState("idle"); // "idle" | "loading" | "connecting"

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        if (joinStatus !== "idle") return;

        setJoinStatus("loading");
        setTimeout(() => {
            setJoinStatus("connecting");
            setTimeout(() => {
                setActiveModal(null);
                setJoinStatus("idle");
            }, 600);
        }, 1000);
    };

    const handlePasteCode = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) setInviteCode(text);
        } catch {
            // Fallback if clipboard permissions are denied
        }
    };

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) setActiveModal(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/80 backdrop-blur-md transition-opacity duration-200"
        >
            <div className="relative w-full max-w-[32rem] bg-surface-container border border-outline-variant/40 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                {/* Glow Corner */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />

                {/* Modal Header */}
                <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-md">
                            <FaKey className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-headline-md text-on-surface">
                                Join Workspace
                            </h3>
                            <p className="text-body-sm text-on-surface-variant">
                                Paste your token key or direct invitation URL.
                            </p>
                        </div>
                    </div>
                    <button
                        aria-label="Close dialog"
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors cursor-pointer"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* Modal Body */}
                <form
                    onSubmit={handleJoinSubmit}
                    className="px-6 py-4 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="input-invite-code"
                            className="text-label-md text-on-surface flex items-center justify-between"
                        >
                            <span>Invite Token or URL</span>
                            <span className="text-label-caps text-on-surface-variant">
                                e.g. WP-998241
                            </span>
                        </label>
                        <div className="relative flex items-center">
                            <FaLink className="absolute left-3.5 text-on-surface-variant text-sm pointer-events-none" />
                            <input
                                id="input-invite-code"
                                type="text"
                                required
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                placeholder="https://workpilot.com/join/WP-..."
                                className="w-full pl-9 pr-20 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-body-md border border-outline-variant/40 placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary shadow-inner"
                            />
                            <button
                                type="button"
                                onClick={handlePasteCode}
                                className="absolute right-1.5 px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface text-label-caps uppercase transition-colors cursor-pointer"
                            >
                                Paste
                            </button>
                        </div>
                    </div>

                    {/* Detected Preview Card Dynamic */}
                    <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                                NX
                            </div>
                            <div className="flex flex-col">
                                <span className="text-title-md text-on-surface">
                                    Nexus Ops Enterprise
                                </span>
                                <span className="text-body-sm text-on-surface-variant">
                                    34 active engineers • Managed by alex.p@corp
                                </span>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-label-caps">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />{" "}
                            Valid
                        </span>
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="pt-4 mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/20">

                        <GhostBtn
                            type="button"
                            onClick={() => setActiveModal(null)}
                            className="px-4 py-2.5 rounded-lg"
                            text="Cancel"
                        />
                        <SecondaryBtn
                            type="submit"
                            disabled={joinStatus !== "idle"}
                            className="px-6 py-3 rounded-lg gap-2 shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                            icon={joinStatus === "loading" && <FaSpinner className="text-base animate-spin" />}
                            text={
                                joinStatus === "loading" ? "Authenticating Token..." : joinStatus === "connecting"
                                    ? "Connecting..."
                                    : "Connect & Enter"
                            }
                        />

                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(JoinWorkSpace);