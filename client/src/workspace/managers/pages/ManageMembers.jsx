import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCheck,
  FaEnvelope,
  FaPlus,
  FaSearch,
  FaShieldAlt,
  FaTimes,
  FaTrashAlt,
  FaUserCog,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const initialMembers = [
  {
    id: "sarah-kim",
    name: "Sarah Kim",
    email: "sarah.k@corp.com",
    role: "manager",
    title: "Lead UI/UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "Now",
    assignedProjects: 3,
  },
  {
    id: "david-lee",
    name: "David Lee",
    email: "david.l@corp.com",
    role: "manager",
    title: "Staff Backend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "5m ago",
    assignedProjects: 4,
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    email: "alex.c@corp.com",
    role: "member",
    title: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "Now",
    assignedProjects: 2,
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    email: "marcus.c@corp.com",
    role: "member",
    title: "QA Architect",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    status: "Away",
    lastActive: "25m ago",
    assignedProjects: 2,
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    email: "michael.b@corp.com",
    role: "member",
    title: "Full-Stack Developer",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "12m ago",
    assignedProjects: 1,
  },
  {
    id: "jessica-taylor",
    name: "Jessica Taylor",
    email: "jessica.t@corp.com",
    role: "member",
    title: "Content Lead",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    status: "Offline",
    lastActive: "3h ago",
    assignedProjects: 1,
  },
];

const ManageMembers = () => {
  const { workspaceId = "12345" } = useParams();
  const navigate = useNavigate();

  const [members, setMembers] = useState(initialMembers);
  const [roleFilter, setRoleFilter] = useState("all"); // "all" | "manager" | "member"
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const inviteInputRef = useRef(null);

  const { values, handleChange } = useForm({
    inviteEmail: "",
    inviteRole: "member",
  });

  useEffect(() => {
    if (isInviteModalOpen) {
      document.body.style.overflow = "hidden";
      inviteInputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsInviteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isInviteModalOpen]);

  const handleToggleRole = (memberId) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, role: m.role === "manager" ? "member" : "manager" }
          : m
      )
    );
  };

  const handleRemoveMember = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!values.inviteEmail.trim()) return;

    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setIsInviteModalOpen(false);
      handleChange({
        target: { name: "inviteEmail", value: "", type: "text" },
      });
    }, 1200);
  };

  const filteredMembers = members.filter((m) => {
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q)
    );
  });

  const managerCount = members.filter((m) => m.role === "manager").length;
  const memberCount = members.filter((m) => m.role === "member").length;

  return (
    <>
      <Helmet>
        <title>WorkPilot | Manage Members (Workspace #{workspaceId})</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* Header & KPI Summary */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <h1 className="text-headline-md font-extrabold text-text-main">
                  Workspace Members &amp; Governance
                </h1>
                <p className="text-body-sm text-text-muted">
                  Manage team access tiers, adjust manager permissions, and
                  dispatch invites.
                </p>
              </div>
            </div>

            <PrimaryBtn
              type="button"
              onClick={() => setIsInviteModalOpen(true)}
              text="Invite Teammate"
              icon={<FaUserPlus className="text-xs" />}
              position="left"
              className="px-5 py-3 rounded-xl text-label-lg shadow-orange-glow"
            />
          </section>

          {/* Search & Filter Bar */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
            <div className="relative flex-1 flex items-center">
              <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, corporate email, or role title..."
                className="input-kinetic pl-9 bg-surface-container-lowest h-10"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40">
              {[
                { id: "all", label: "All Members", count: members.length },
                { id: "manager", label: "Managers", count: managerCount },
                { id: "member", label: "Members", count: memberCount },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRoleFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-label-md transition-all cursor-pointer ${roleFilter === tab.id
                    ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                    : "text-text-muted hover:text-text-main"
                    }`}
                >
                  <span>{tab.label}</span>
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-card dark:bg-surface-container-highest text-text-muted">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Members Table */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/40 bg-surface-container-low text-label-caps text-text-muted">
                    <th className="py-3.5 px-5">Teammate</th>
                    <th className="py-3.5 px-5">Governance Role</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Assigned Projects</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/25 text-body-md">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => {
                      const isManager = member.role === "manager";

                      return (
                        <tr
                          key={member.id}
                          className="table-row-kinetic transition-colors"
                        >
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3.5">
                              <div className="relative shrink-0">
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-10 h-10 rounded-full object-cover ring-2 ring-outline-variant/30"
                                />
                                <span
                                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-panel dark:border-surface-container ${member.status === "Active"
                                    ? "bg-brand-emerald"
                                    : member.status === "Away"
                                      ? "bg-amber-400"
                                      : "bg-text-placeholder"
                                    }`}
                                />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-text-main truncate">
                                  {member.name}
                                </h3>
                                <p className="text-body-sm text-text-muted truncate">
                                  {member.title} •{" "}
                                  <span className="font-mono text-xs">
                                    {member.email}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-caps ${isManager
                                ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/30"
                                : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                }`}
                            >
                              <FaShieldAlt className="text-[10px]" />
                              {member.role}
                            </span>
                          </td>

                          <td className="py-4 px-5 font-mono text-xs text-text-muted">
                            {member.status} ({member.lastActive})
                          </td>

                          <td className="py-4 px-5 font-mono font-bold text-text-main">
                            {member.assignedProjects} Active
                          </td>

                          <td className="py-4 px-5 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleRole(member.id)}
                                title="Toggle Manager / Member permission"
                                className="px-3 py-1.5 rounded-lg bg-card hover:bg-brand-orange hover:text-white text-text-main text-xs font-mono font-semibold transition-colors cursor-pointer"
                              >
                                Make {isManager ? "Member" : "Manager"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleRemoveMember(member.id)}
                                aria-label="Remove teammate from workspace"
                                title="Remove from workspace"
                                className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                              >
                                <FaTrashAlt className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-text-muted">
                        No workspace members found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* =========================================================
            INVITE TEAMMATE MODAL
           ========================================================= */}
        {isInviteModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsInviteModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      Invite Teammate
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Send an encrypted token invitation to join Workspace #{workspaceId}.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleInviteSubmit}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Corporate Email Address{" "}
                    <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    ref={inviteInputRef}
                    type="email"
                    name="inviteEmail"
                    required
                    value={values.inviteEmail}
                    onChange={handleChange}
                    placeholder="teammate@company.com"
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Initial Access Tier
                  </label>
                  <select
                    name="inviteRole"
                    value={values.inviteRole}
                    onChange={handleChange}
                    className="input-kinetic bg-surface-container-lowest"
                  >
                    <option value="member">Member (Standard Access)</option>
                    <option value="manager">Manager (Admin Access)</option>
                  </select>
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    disabled={inviteSent}
                    text={inviteSent ? "Invite Dispatched!" : "Send Invitation"}
                    icon={inviteSent && <FaCheck className="text-xs" />}
                    position="left"
                    className="px-5 py-2.5 rounded-lg shadow-orange-glow"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageMembers;