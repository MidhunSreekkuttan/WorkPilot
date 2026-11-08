import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBullhorn,
  FaCheck,
  FaClock,
  FaCode,
  FaCopy,
  FaFolderOpen,
  FaLayerGroup,
  FaListUl,
  FaPalette,
  FaPlus,
  FaRegStar,
  FaSearch,
  FaServer,
  FaShieldAlt,
  FaStar,
  FaStepBackward,
  FaTasks,
  FaThLarge,
  FaUsers,
} from "react-icons/fa";
import CreateWorkSpace from "../../../components/CreateWorkSpace";
import JoinWorkSpace from "../../../components/JoinWorkSpace";
import { PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";

const initialJoinedWorkspaces = [
  {
    id: "dev-squad",
    code: "WP-DEV01",
    name: "Dev Squad",
    subtitle: "Software Development & Core Architecture",
    role: "manager",
    pinned: true,
    icon: FaCode,
    iconBg: "bg-brand-orange/15 text-brand-orange border border-brand-orange/30",
    barColor: "from-brand-orange to-amber-400",
    progress: 72,
    projectsCount: 4,
    activeTasksCount: 18,
    onlineCount: 5,
    lastActive: "2m ago",
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
    code: "WP-MKT04",
    name: "Marketing Hub",
    subtitle: "Product Launches, Growth & Content Strategy",
    role: "member",
    pinned: true,
    icon: FaBullhorn,
    iconBg: "bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30",
    barColor: "from-brand-emerald to-teal-400",
    progress: 48,
    projectsCount: 3,
    activeTasksCount: 11,
    onlineCount: 3,
    lastActive: "18m ago",
    extraMembers: "+2",
    members: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "creative-studio",
    code: "WP-UXD09",
    name: "Creative Studio",
    subtitle: "Kinetic Design System & Brand Tokens",
    role: "manager",
    pinned: false,
    icon: FaPalette,
    iconBg: "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30",
    barColor: "from-brand-cyan to-sky-400",
    progress: 85,
    projectsCount: 5,
    activeTasksCount: 9,
    onlineCount: 4,
    lastActive: "1h ago",
    extraMembers: "+1",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "cloud-infra-ops",
    code: "WP-OPS88",
    name: "Nexus Cloud Ops",
    subtitle: "Kubernetes Clusters, CI/CD & SRE Telemetry",
    role: "member",
    pinned: false,
    icon: FaServer,
    iconBg: "bg-primary/15 text-primary border border-primary/30",
    barColor: "from-indigo-500 to-purple-500",
    progress: 64,
    projectsCount: 6,
    activeTasksCount: 22,
    onlineCount: 6,
    lastActive: "3h ago",
    extraMembers: "+5",
    members: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

const WorkspaceOverview = () => {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState(initialJoinedWorkspaces);
  const [activeModal, setActiveModal] = useState(null); // null | "create" | "join"
  const [roleFilter, setRoleFilter] = useState("all"); // "all" | "manager" | "member" | "pinned"
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);

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

  const handleTogglePin = (e, id) => {
    e.stopPropagation();
    setWorkspaces((prev) =>
      prev.map((ws) => (ws.id === id ? { ...ws, pinned: !ws.pinned } : ws))
    );
  };

  const handleCopyCode = async (e, code) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1600);
    } catch {
      // Fallback if clipboard permission is denied
    }
  };

  const filteredWorkspaces = workspaces
    .filter((ws) => {
      if (roleFilter === "manager" && ws.role !== "manager") return false;
      if (roleFilter === "member" && ws.role !== "member") return false;
      if (roleFilter === "pinned" && !ws.pinned) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ws.name.toLowerCase().includes(q) ||
        ws.subtitle.toLowerCase().includes(q) ||
        ws.code.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const managedCount = workspaces.filter((w) => w.role === "manager").length;
  const memberCount = workspaces.filter((w) => w.role === "member").length;
  const pinnedCount = workspaces.filter((w) => w.pinned).length;
  const totalProjects = workspaces.reduce((sum, w) => sum + w.projectsCount, 0);
  const totalTasks = workspaces.reduce((sum, w) => sum + w.activeTasksCount, 0);

  const filterTabs = [
    { id: "all", label: "All Joined", count: workspaces.length },
    { id: "manager", label: "Managed by Me", count: managedCount },
    { id: "member", label: "Member", count: memberCount },
    { id: "pinned", label: "Pinned", count: pinnedCount },
  ];

  return (
    <>
      <Helmet>
        <title>WorkPilot | Joined Workspaces</title>
      </Helmet>

      <div className="min-h-[calc(100vh-4.5rem)] surface-level-0 text-text-main flex selection:bg-brand-orange selection:text-white">
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-[1440px] w-full mx-auto flex flex-col gap-6">
          {/* =========================================================
              1. HEADER BANNER & GLOBAL TELEMETRY
             ========================================================= */}
          <section className="relative overflow-hidden rounded-2xl bg-panel dark:bg-surface-container border border-outline-variant/40 p-6 md:p-7 md:py-4 shadow-level-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
              <button
                className="flex w-fit items-center gap-1.5 text-text-muted hover:text-text-main transition-colors cursor-pointer mr-2 active:scale-95 pb-2"
                onClick={() => navigate('/dashboard')}
                title="Back to Workspaces"
              >
                <FaStepBackward size={18} />
                <span className="text-[16px] font-medium">Back</span>
              </button>
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-card dark:bg-surface-container-high border border-outline-variant/40">
                <FaLayerGroup className="text-brand-orange text-xs" />
                <span className="text-label-caps text-text-muted font-mono">
                  MULTI-TENANT DIRECTORY • {workspaces.length} ACTIVE HUBS
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-text-main mt-1">
                Joined Workspaces
              </h1>
              <p className="text-body-md text-text-muted">
                Switch between engineering squads, monitor cross-workspace sprint
                progress, or provision a new operational hub.
              </p>

              {/* Telemetry Summary Pills */}
              <div className="flex flex-wrap items-center gap-3 mt-2 pt-2">
                <div className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono flex items-center gap-2">
                  <FaFolderOpen className="text-brand-cyan" />
                  <span className="text-text-muted">Projects:</span>
                  <strong className="text-text-main">{totalProjects}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono flex items-center gap-2">
                  <FaTasks className="text-brand-orange" />
                  <span className="text-text-muted">Active Tasks:</span>
                  <strong className="text-text-main">{totalTasks}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono flex items-center gap-2">
                  <FaShieldAlt className="text-brand-emerald" />
                  <span className="text-text-muted">Roles:</span>
                  <strong className="text-text-main">
                    {managedCount} Manager / {memberCount} Member
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
              <SecondaryBtn
                type="button"
                onClick={() => setActiveModal("join")}
                text="Join with Code"
                icon={<FaUsers className="text-sm text-brand-orange" />}
                position="left"
                className="px-4 py-2.5 rounded-xl text-label-lg"
              />
              <PrimaryBtn
                type="button"
                onClick={() => setActiveModal("create")}
                text="Create Workspace"
                icon={<FaPlus className="text-xs" />}
                position="left"
                className="px-5 py-2.5 rounded-xl text-label-lg"
              />
            </div>
          </section>

          {/* =========================================================
              2. FILTER TABS, SEARCH & VIEW SWITCHER BAR
             ========================================================= */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = roleFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRoleFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-label-md font-medium inline-flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${isActive
                      ? "bg-brand-orange/15 text-brand-orange font-semibold border border-brand-orange/30"
                      : "text-text-muted hover:text-text-main hover:bg-card"
                      }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${isActive
                        ? "bg-brand-orange text-white"
                        : "bg-card dark:bg-surface-container-highest text-text-muted"
                        }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Search Input & Grid/List Toggle */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64 flex items-center">
                <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name or WP key..."
                  className="input-kinetic pl-9 h-9 text-body-sm bg-surface-container-lowest"
                />
              </div>

              <div className="flex items-center p-1 rounded-xl bg-surface-container-lowest border border-outline-variant/40 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid"
                    ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                    : "text-text-muted hover:text-text-main"
                    }`}
                >
                  <FaThLarge className="text-xs" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list"
                    ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                    : "text-text-muted hover:text-text-main"
                    }`}
                >
                  <FaListUl className="text-xs" />
                </button>
              </div>
            </div>
          </section>

          {/* =========================================================
              3. WORKSPACES DIRECTORY (GRID OR LIST VIEW)
             ========================================================= */}
          {filteredWorkspaces.length === 0 ? (
            <div className="bg-panel dark:bg-surface-container rounded-2xl p-12 border border-outline-variant/40 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                <FaLayerGroup className="text-xl" />
              </div>
              <h2 className="text-headline-sm text-text-main font-bold">
                No matching workspaces found
              </h2>
              <p className="text-body-sm text-text-muted">
                Try clearing your search filter, or join a new workspace using an
                invitation token.
              </p>
              <div className="flex items-center gap-2.5 mt-2">
                <SecondaryBtn
                  type="button"
                  onClick={() => {
                    setRoleFilter("all");
                    setSearchQuery("");
                  }}
                  text="Reset Filters"
                  className="px-4 py-2 rounded-lg text-label-md"
                />
                <PrimaryBtn
                  type="button"
                  onClick={() => setActiveModal("join")}
                  text="Join Workspace"
                  className="px-4 py-2 rounded-lg text-label-md"
                />
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredWorkspaces.map((ws) => {
                const Icon = ws.icon;
                const isManager = ws.role === "manager";

                return (
                  <div
                    key={ws.id}
                    onClick={() => navigate(`/work-space/${ws.id}`)}
                    className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-5 cursor-pointer group"
                  >
                    {/* Card Top: Icon, Title, Role Badge & Pin */}
                    <div className="flex flex-col gap-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ws.iconBg}`}
                          >
                            <Icon className="text-xl" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h2 className="text-headline-sm text-text-main group-hover:text-brand-orange transition-colors truncate">
                                {ws.name}
                              </h2>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${isManager
                                  ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/30"
                                  : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                  }`}
                              >
                                <FaShieldAlt className="text-[8px]" />
                                {ws.role}
                              </span>
                            </div>
                            <p className="text-body-sm text-text-muted truncate mt-0.5">
                              {ws.subtitle}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleTogglePin(e, ws.id)}
                          aria-label="Pin workspace"
                          className="p-2 rounded-lg text-text-muted hover:text-amber-400 hover:bg-card transition-colors cursor-pointer shrink-0"
                        >
                          {ws.pinned ? (
                            <FaStar className="text-amber-400 text-sm" />
                          ) : (
                            <FaRegStar className="text-sm" />
                          )}
                        </button>
                      </div>

                      {/* Workspace Invite Key & Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col">
                          <span className="text-[10px] font-mono text-text-muted uppercase">
                            Projects
                          </span>
                          <span className="text-title-md font-bold text-text-main font-mono mt-0.5">
                            {ws.projectsCount}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col">
                          <span className="text-[10px] font-mono text-text-muted uppercase">
                            Open Tasks
                          </span>
                          <span className="text-title-md font-bold text-brand-orange font-mono mt-0.5">
                            {ws.activeTasksCount}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleCopyCode(e, ws.code)}
                          title="Copy invite key"
                          className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-brand-orange/50 flex flex-col text-left transition-colors cursor-pointer"
                        >
                          <span className="text-[10px] font-mono text-text-muted uppercase flex items-center justify-between">
                            <span>Invite Key</span>
                            {copiedCode === ws.code ? (
                              <FaCheck className="text-brand-emerald text-[9px]" />
                            ) : (
                              <FaCopy className="text-[9px]" />
                            )}
                          </span>
                          <span className="text-xs font-bold text-brand-cyan font-mono mt-1 truncate">
                            {ws.code}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-muted font-medium">
                          Sprint Completion
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

                    {/* Card Footer: Members + Quick Route Links */}
                    <div className="pt-3.5 border-t border-outline-variant/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center -space-x-2">
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
                        <span className="text-[11px] font-mono text-text-muted hidden sm:inline-flex items-center gap-1">
                          <FaClock className="text-[10px]" />
                          {ws.lastActive}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/work-space/${ws.id}/${isManager ? "tasks" : "my-tasks"
                              }`
                            );
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-card hover:bg-card-hover text-xs font-mono text-text-main transition-colors cursor-pointer"
                        >
                          {isManager ? "Tasks" : "My Tasks"}
                        </button>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-orange/15 text-brand-orange text-xs font-semibold group-hover:bg-brand-orange group-hover:text-white transition-colors">
                          <span>Open</span>
                          <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dashed Create / Join Card */}
              <div className="rounded-2xl p-6 border-2 border-dashed border-outline-variant/60 bg-panel/40 dark:bg-surface-container-low/40 hover:border-brand-orange/60 transition-colors flex flex-col items-center justify-center text-center gap-3 min-h-[260px]">
                <button
                  type="button"
                  onClick={() => setActiveModal("create")}
                  aria-label="Create Workspace"
                  className="w-12 h-12 rounded-full bg-gradient-to-b from-brand-orange-light to-brand-orange-dark text-white flex items-center justify-center shadow-orange-glow hover:scale-105 transition-transform cursor-pointer"
                >
                  <FaPlus className="text-base" />
                </button>
                <div>
                  <h3 className="text-title-md text-text-main font-bold">
                    Expand Your Organization
                  </h3>
                  <p className="text-body-sm text-text-muted mt-0.5">
                    Deploy a new squad workspace or connect with an invite code.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1">
                  <PrimaryBtn
                    type="button"
                    onClick={() => setActiveModal("create")}
                    text="Create New"
                    className="text-xs px-4 py-2 rounded-full"
                  />
                  <SecondaryBtn
                    type="button"
                    onClick={() => setActiveModal("join")}
                    text="Join Existing"
                    className="text-xs px-4 py-2 rounded-full"
                  />
                </div>
              </div>
            </section>
          ) : (
            /* LIST / TABLE VIEW */
            <section className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden">
              <div className="divide-y divide-outline-variant/30">
                {filteredWorkspaces.map((ws) => {
                  const Icon = ws.icon;
                  const isManager = ws.role === "manager";
                  return (
                    <div
                      key={ws.id}
                      onClick={() => navigate(`/work-space/${ws.id}`)}
                      className="p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 table-row-kinetic cursor-pointer"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${ws.iconBg}`}
                        >
                          <Icon className="text-lg" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-title-md font-bold text-text-main truncate">
                              {ws.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-mono text-brand-cyan">
                              {ws.code}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${isManager
                                ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/30"
                                : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                }`}
                            >
                              <FaShieldAlt className="text-[8px]" />
                              {ws.role}
                            </span>
                          </div>
                          <p className="text-body-sm text-text-muted truncate">
                            {ws.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-5 shrink-0">
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <span className="text-text-muted">
                            Projects:{" "}
                            <strong className="text-text-main">
                              {ws.projectsCount}
                            </strong>
                          </span>
                          <span className="text-text-muted">
                            Tasks:{" "}
                            <strong className="text-brand-orange">
                              {ws.activeTasksCount}
                            </strong>
                          </span>
                          <span className="text-text-muted">
                            Progress:{" "}
                            <strong className="text-brand-emerald">
                              {ws.progress}%
                            </strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <SecondaryBtn
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/work-space/${ws.id}/projects`);
                            }}
                            text="Projects"
                            className="px-3 py-1.5 rounded-lg text-xs"
                          />
                          <PrimaryBtn
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/work-space/${ws.id}`);
                            }}
                            text="Enter"
                            icon={<FaArrowRight className="text-[10px]" />}
                            position="right"
                            className="px-3.5 py-1.5 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {/* CREATE & JOIN MODALS */}
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

export default WorkspaceOverview;