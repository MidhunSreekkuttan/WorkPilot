import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaCodeBranch,
  FaColumns,
  FaExclamationTriangle,
  FaFolderOpen,
  FaListUl,
  FaLock,
  FaPlus,
  FaRegFileAlt,
  FaSearch,
  FaTerminal,
  FaTimes,
  FaUserCheck,
  FaUserMinus,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const projectCatalog = {
  "fintech-mobile": {
    code: "PRJ-01",
    name: "Fintech Mobile Banking",
    category: "Mobile Core",
    description:
      "Biometric FaceID authentication, virtualized transaction history lists, and Plaid webhook handlers.",
    branch: "feat/biometric-auth",
    status: "On Track",
    dueDate: "Dec 12",
    lead: "Sarah Kim",
  },
  "api-gateway-v4": {
    code: "PRJ-02",
    name: "Core API v4 Gateway",
    category: "Infrastructure",
    description:
      "High-concurrency edge routing, Redis rate limiters, and dead-letter webhook retry queues.",
    branch: "fix/webhook-retry-queue",
    status: "In Progress",
    dueDate: "Dec 19",
    lead: "David Lee",
  },
  "kinetic-design-system": {
    code: "PRJ-03",
    name: "Kinetic Horizon UI Kit",
    category: "Design System",
    description:
      "Unified light and dark theme tokens, accessible modal primitives, and kanban elevation specs.",
    branch: "release/tokens-v4.2",
    status: "In Review",
    dueDate: "Dec 08",
    lead: "Alex Chen",
  },
  "saml-sso-engine": {
    code: "PRJ-04",
    name: "Multi-Tenant SAML SSO",
    category: "Security",
    description:
      "Enterprise Okta/Azure AD SAML handshakes, SCIM provisioning, and role-based route guards.",
    branch: "feat/scim-provisioning",
    status: "In Progress",
    dueDate: "Jan 05",
    lead: "Marcus Chen",
  },
};

const initialProjectSquad = [
  {
    id: "sarah-kim",
    name: "Sarah Kim",
    role: "Lead UI/UX",
    task: "#WP-482",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "david-lee",
    name: "David Lee",
    role: "Staff Backend",
    task: "#WP-311",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Frontend Engineer",
    task: "#WP-509",
    online: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "QA Architect",
    task: "PR-12",
    online: false,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
];

const availableWorkspaceCandidates = [
  {
    id: "emily-watson",
    name: "Emily Watson",
    role: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Full-Stack Dev",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "jessica-taylor",
    name: "Jessica Taylor",
    role: "Content Lead",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
];

const initialProjectTasks = [
  {
    id: "WP-482",
    title: "Refactor Transaction History virtualized list",
    assignee: "Sarah Kim",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Progress",
    due: "Today, 6:00 PM",
    prRef: "PR #148",
    isMine: false,
  },
  {
    id: "WP-509",
    title: "Audit dark-mode contrast tokens on Kanban cards",
    assignee: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Progress",
    due: "Tomorrow",
    prRef: "PR #151",
    isMine: true,
  },
  {
    id: "WP-311",
    title: "Stabilize Plaid webhook retry queue on staging",
    assignee: "David Lee",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Review",
    due: "Thu, Dec 10",
    prRef: "PR #144",
    isMine: false,
  },
  {
    id: "WP-518",
    title: "Wire role-based route guards for workspace views",
    assignee: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "Medium",
    status: "In Review",
    due: "Fri, Dec 11",
    prRef: "PR #153",
    isMine: true,
  },
];

const milestones = [
  { id: "m1", title: "Architecture & Token Freeze", date: "Nov 28", done: true },
  { id: "m2", title: "Staging Webhook Integration", date: "Dec 05", done: true },
  { id: "m3", title: "E2E Regression & QA Sign-off", date: "Dec 10", done: false },
  { id: "m4", title: "Production Cluster Rollout", date: "Dec 12", done: false },
];

const statusColumns = ["In Progress", "In Review", "Completed"];

const ProjectDetails = () => {
  const { workspaceId = "12345", projectId = "fintech-mobile" } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const rawRole = outletContext.role || "member";
  const normalizedRole = Array.isArray(rawRole) ? rawRole[0] : rawRole;
  const isManager = normalizedRole === "manager";

  const projectMeta = projectCatalog[projectId] || {
    code: "PRJ-0X",
    name: projectId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    category: "Engineering",
    description:
      "Active sprint project board, linked Git telemetry, and deliverable milestones.",
    branch: `feat/${projectId}`,
    status: "In Progress",
    dueDate: "Dec 20",
    lead: "Sarah Kim",
  };

  const [tasks, setTasks] = useState(initialProjectTasks);
  const [projectSquad, setProjectSquad] = useState(initialProjectSquad);
  const [boardMode, setBoardMode] = useState("kanban"); // "kanban" | "list"
  const [taskFilter, setTaskFilter] = useState("all"); // "all" | "mine" | "high"
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const { values, handleChange } = useForm({
    taskTitle: "",
    taskAssignee: "Alex Chen",
    taskPriority: "High",
    taskStatus: "In Progress",
    taskDue: "Fri, Dec 12",
    selectedCandidateId: availableWorkspaceCandidates[0]?.id || "",
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsAssignModalOpen(false);
        setIsMemberModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleCycleStatus = (task) => {
    if (!isManager && !task.isMine) return;

    const nextStatusMap = {
      "In Progress": "In Review",
      "In Review": "Completed",
      Completed: "In Progress",
    };

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, status: nextStatusMap[t.status] || "In Progress" }
          : t
      )
    );
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!isManager) return;

    const trimmed = values.taskTitle.trim();
    if (!trimmed) return;

    const member =
      projectSquad.find((m) => m.name === values.taskAssignee) ||
      projectSquad[0];

    const newTask = {
      id: `WP-${Math.floor(530 + Math.random() * 400)}`,
      title: trimmed,
      assignee: member.name,
      avatar: member.avatar,
      priority: values.taskPriority,
      status: values.taskStatus,
      due: values.taskDue || "This Sprint",
      prRef: `PR #${Math.floor(155 + Math.random() * 30)}`,
      isMine: member.name === "Alex Chen",
    };

    setTasks((prev) => [newTask, ...prev]);
    handleChange({ target: { name: "taskTitle", value: "", type: "text" } });
    setIsAssignModalOpen(false);
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!isManager) return;

    const candidate = availableWorkspaceCandidates.find(
      (c) => c.id === values.selectedCandidateId
    );
    if (!candidate) return;

    // Prevent duplicates
    if (projectSquad.some((m) => m.id === candidate.id)) {
      setIsMemberModalOpen(false);
      return;
    }

    const newContributor = {
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      task: "Unassigned",
      online: true,
      avatar: candidate.avatar,
    };

    setProjectSquad((prev) => [...prev, newContributor]);
    setIsMemberModalOpen(false);
  };

  const handleRemoveMember = (memberId) => {
    if (!isManager) return;
    setProjectSquad((prev) => prev.filter((m) => m.id !== memberId));
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "mine" && !t.isMine) return false;
    if (taskFilter === "high" && t.priority !== "High") return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q)
    );
  });

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const progressPct = Math.round((completedCount / (tasks.length || 1)) * 100);

  const getBadgeClass = (status) => {
    if (status === "Completed" || status === "On Track") return "badge-completed";
    if (status === "In Review") return "badge-review";
    return "badge-in-progress";
  };

  return (
    <>
      <Helmet>
        <title>
          WorkPilot | {projectMeta.name} ({projectMeta.code})
        </title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* =========================================================
              1. BREADCRUMB & PROJECT TELEMETRY HEADER
             ========================================================= */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate(`/work-space/${workspaceId}/projects`)
                }
                className="inline-flex items-center gap-2 text-label-md text-text-muted hover:text-brand-orange transition-colors cursor-pointer"
              >
                <FaArrowLeft className="text-xs" />
                <span>Back to Workspace Projects</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/40 text-xs font-mono text-brand-cyan">
                  <FaCodeBranch className="text-[10px]" />
                  {projectMeta.branch}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${getBadgeClass(
                    projectMeta.status
                  )}`}
                >
                  {projectMeta.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold">
                    {projectMeta.code}
                  </span>
                  <span className="text-label-md text-text-muted">
                    {projectMeta.category}
                  </span>
                  <span className="text-text-placeholder">•</span>
                  <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                    <FaClock className="text-[10px] text-brand-orange" />
                    Target: {projectMeta.dueDate}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-text-main tracking-tight">
                  {projectMeta.name}
                </h1>
                <p className="text-body-md text-text-muted">
                  {projectMeta.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="flex items-center -space-x-2 pr-2">
                  {projectSquad.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      title={`${m.name} (${m.role})`}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container"
                    />
                  ))}
                </div>

                {isManager ? (
                  <div className="flex items-center gap-2">
                    <PrimaryBtn
                      type="button"
                      onClick={() => setIsAssignModalOpen(true)}
                      text="Assign Task"
                      icon={<FaPlus className="text-xs" />}
                      position="left"
                      className="px-4 py-2.5 rounded-xl text-label-md"
                    />
                    <SecondaryBtn
                      type="button"
                      onClick={() => setIsMemberModalOpen(true)}
                      text="Add Contributor"
                      icon={<FaUserPlus className="text-xs text-brand-orange" />}
                      position="left"
                      className="px-4 py-2.5 rounded-xl text-label-md"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs font-mono text-text-muted">
                    <FaUserCheck className="text-brand-cyan text-sm" />
                    <span>Contributor Mode • Update Assigned Tasks</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sprint Progress & Lead Telemetry Strip */}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-body-sm">
                <span className="text-text-muted">
                  Project Lead:{" "}
                  <strong className="text-text-main font-semibold">
                    {projectMeta.lead}
                  </strong>
                </span>
                <span className="text-text-placeholder hidden sm:inline">•</span>
                <span className="text-text-muted font-mono text-xs">
                  {completedCount} of {tasks.length} Tasks Completed
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-72">
                <div className="flex-1 h-2 rounded-full bg-card dark:bg-surface-container-highest overflow-hidden">
                  <div
                    style={{ width: `${progressPct}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-emerald transition-all duration-500"
                  />
                </div>
                <span className="text-xs font-mono font-bold text-text-main w-10 text-right">
                  {progressPct}%
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. MAIN 12-COLUMN WORKSPACE GRID
             ========================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* LEFT 8 COLUMNS: TASK BOARD / LIST */}
            <div className="xl:col-span-8 flex flex-col gap-5">
              {/* Filter & View Switcher Bar */}
              <div className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 flex items-center">
                  <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter project tasks by ID, title, or engineer..."
                    className="input-kinetic pl-9 bg-surface-container-lowest h-9 text-body-sm"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
                  {/* Quick Filter Pills */}
                  <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                    {[
                      { id: "all", label: "All" },
                      { id: "mine", label: "My Tasks" },
                      { id: "high", label: "High Priority" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setTaskFilter(tab.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${taskFilter === tab.id
                          ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-main"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Kanban / List Switcher */}
                  <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => setBoardMode("kanban")}
                      title="Kanban View"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${boardMode === "kanban"
                        ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                        : "text-text-muted hover:text-text-main"
                        }`}
                    >
                      <FaColumns className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoardMode("list")}
                      title="List View"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${boardMode === "list"
                        ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                        : "text-text-muted hover:text-text-main"
                        }`}
                    >
                      <FaListUl className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* KANBAN VIEW */}
              {boardMode === "kanban" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {statusColumns.map((colStatus) => {
                    const colTasks = filteredTasks.filter(
                      (t) => t.status === colStatus
                    );

                    return (
                      <div
                        key={colStatus}
                        className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col gap-3.5 min-h-[380px]"
                      >
                        <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant/30">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${colStatus === "Completed"
                                ? "bg-brand-emerald"
                                : colStatus === "In Review"
                                  ? "bg-brand-cyan"
                                  : "bg-brand-orange"
                                }`}
                            />
                            <h2 className="text-label-lg font-bold text-text-main">
                              {colStatus}
                            </h2>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-card dark:bg-surface-container-highest text-[11px] font-mono font-bold text-text-muted">
                            {colTasks.length}
                          </span>
                        </div>

                        <div className="flex flex-col gap-3">
                          {colTasks.length > 0 ? (
                            colTasks.map((task) => {
                              const canModify = isManager || task.isMine;

                              return (
                                <div
                                  key={task.id}
                                  className="card-kinetic card-kinetic-interactive bg-card/60 dark:bg-surface-container-low p-4 flex flex-col gap-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${task.priority === "High"
                                          ? "bg-error/15 text-error border border-error/30"
                                          : "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30"
                                          }`}
                                      >
                                        {task.priority === "High" && (
                                          <FaExclamationTriangle className="text-[9px]" />
                                        )}
                                        {task.priority}
                                      </span>
                                      <span className="text-xs font-mono text-text-muted font-semibold">
                                        #{task.id}
                                      </span>
                                    </div>

                                    <span className="text-[11px] font-mono text-brand-cyan bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/30">
                                      {task.prRef}
                                    </span>
                                  </div>

                                  <h3 className="text-body-md font-bold text-text-main leading-snug">
                                    {task.title}
                                  </h3>

                                  <div className="pt-2 border-t border-outline-variant/25 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <img
                                        src={task.avatar}
                                        alt={task.assignee}
                                        className="w-6 h-6 rounded-full object-cover shrink-0"
                                      />
                                      <span className="text-xs text-text-muted truncate">
                                        {task.assignee}
                                      </span>
                                    </div>

                                    {canModify ? (
                                      <button
                                        type="button"
                                        onClick={() => handleCycleStatus(task)}
                                        className="px-2.5 py-1 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-[10px] font-mono font-bold transition-colors cursor-pointer shrink-0"
                                      >
                                        Advance →
                                      </button>
                                    ) : (
                                      <span
                                        title="Only the assigned engineer or a manager can advance this task"
                                        className="inline-flex items-center gap-1 text-[10px] font-mono text-text-placeholder"
                                      >
                                        <FaLock className="text-[9px]" />
                                        Locked
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="py-8 px-3 text-center rounded-xl border border-dashed border-outline-variant/40 text-xs text-text-muted">
                              No tasks in {colStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* LIST VIEW */
                <div className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden divide-y divide-outline-variant/25">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => {
                      const canModify = isManager || task.isMine;

                      return (
                        <div
                          key={task.id}
                          className="p-4 table-row-kinetic flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start sm:items-center gap-3 min-w-0">
                            <span className="px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange font-mono text-xs font-bold shrink-0">
                              #{task.id}
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-body-md font-bold text-text-main truncate">
                                {task.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                                <span>{task.assignee}</span>
                                <span>•</span>
                                <span className="font-mono text-brand-cyan">
                                  {task.prRef}
                                </span>
                                <span>•</span>
                                <span className="font-mono">{task.due}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${getBadgeClass(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>

                            {canModify ? (
                              <button
                                type="button"
                                onClick={() => handleCycleStatus(task)}
                                className="px-3 py-1 rounded-lg bg-card hover:bg-brand-orange text-text-main hover:text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
                              >
                                Cycle Status
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest text-text-placeholder text-xs font-mono">
                                <FaLock className="text-[10px]" /> Read-only
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-text-muted text-body-md">
                      No matching tasks found for this filter.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT 4 COLUMNS: SQUAD ROSTER, MILESTONES & TELEMETRY */}
            <aside className="xl:col-span-4 flex flex-col gap-6">
              {/* 1. Project Squad Roster */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-brand-orange text-base" />
                    <h2 className="text-title-md font-bold text-text-main">
                      Project Squad ({projectSquad.length})
                    </h2>
                  </div>

                  {isManager && (
                    <button
                      type="button"
                      onClick={() => setIsMemberModalOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-brand-orange hover:underline cursor-pointer"
                    >
                      <FaPlus className="text-[10px]" />
                      <span>Add</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  {projectSquad.map((member) => (
                    <div
                      key={member.id}
                      className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-panel dark:border-surface-container ${member.online
                              ? "bg-brand-emerald"
                              : "bg-text-placeholder"
                              }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-body-sm font-bold text-text-main truncate">
                            {member.name}
                          </p>
                          <p className="text-xs text-text-muted truncate">
                            {member.role} •{" "}
                            <span className="font-mono text-brand-cyan">
                              {member.task}
                            </span>
                          </p>
                        </div>
                      </div>

                      {isManager && projectSquad.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member.id)}
                          title={`Remove ${member.name} from project`}
                          className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer shrink-0"
                        >
                          <FaUserMinus className="text-xs" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 2. Deliverable Milestones */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaBolt className="text-brand-orange text-sm" />
                    <h2 className="text-title-md font-bold text-text-main">
                      Release Milestones
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-brand-emerald font-semibold">
                    {milestones.filter((m) => m.done).length}/{milestones.length}{" "}
                    Verified
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {milestones.map((ms) => (
                    <div
                      key={ms.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FaCheckCircle
                          className={`text-sm shrink-0 ${ms.done
                            ? "text-brand-emerald"
                            : "text-text-placeholder"
                            }`}
                        />
                        <span
                          className={`text-body-sm truncate ${ms.done
                            ? "line-through text-text-muted"
                            : "text-text-main font-medium"
                            }`}
                        >
                          {ms.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-text-muted shrink-0">
                        {ms.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Quick Telemetry & Project Assets */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <FaTerminal className="text-brand-cyan text-sm" />
                  <h2 className="text-title-md font-bold text-text-main">
                    Project Artifacts
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/work-space/${workspaceId}/files`)}
                  className="w-full p-3 rounded-xl bg-surface-container-low hover:bg-card border border-outline-variant/30 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
                      <FaRegFileAlt className="text-sm" />
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-text-main group-hover:text-brand-orange transition-colors">
                        Architecture &amp; Spec Docs
                      </p>
                      <p className="text-xs text-text-muted">
                        Browse shared repository files
                      </p>
                    </div>
                  </div>
                  <FaArrowRight className="text-xs text-text-muted group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/work-space/${workspaceId}/projects`)
                  }
                  className="w-full p-3 rounded-xl bg-surface-container-low hover:bg-card border border-outline-variant/30 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center">
                      <FaFolderOpen className="text-sm" />
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-text-main group-hover:text-brand-orange transition-colors">
                        All Workspace Projects
                      </p>
                      <p className="text-xs text-text-muted">
                        Switch active project board
                      </p>
                    </div>
                  </div>
                  <FaArrowRight className="text-xs text-text-muted group-hover:translate-x-1 transition-transform" />
                </button>
              </section>
            </aside>
          </div>
        </main>

        {/* =========================================================
            3. MANAGER MODAL: ASSIGN NEW TASK
           ========================================================= */}
        {isAssignModalOpen && isManager && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAssignModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaPlus className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      Assign Task to {projectMeta.code}
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Dispatch a new sprint deliverable to this project board.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleAssignSubmit}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Task Deliverable Title{" "}
                    <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="taskTitle"
                    required
                    value={values.taskTitle}
                    onChange={handleChange}
                    placeholder="e.g. Add biometric fallback validation"
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Assignee
                    </label>
                    <select
                      name="taskAssignee"
                      value={values.taskAssignee}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      {projectSquad.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Priority Level
                    </label>
                    <select
                      name="taskPriority"
                      value={values.taskPriority}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Initial Column
                    </label>
                    <select
                      name="taskStatus"
                      value={values.taskStatus}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      {statusColumns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Due Target
                    </label>
                    <input
                      type="text"
                      name="taskDue"
                      value={values.taskDue}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Assign Deliverable"
                    icon={<FaCheck className="text-xs" />}
                    position="left"
                    className="px-5 py-2.5 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
            4. MANAGER MODAL: ADD CONTRIBUTOR TO PROJECT
           ========================================================= */}
        {isMemberModalOpen && isManager && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMemberModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                    <FaUserPlus className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      Add Project Contributor
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Select a workspace member to join {projectMeta.code}.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleAddMemberSubmit}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Available Workspace Engineers
                  </label>
                  <select
                    name="selectedCandidateId"
                    value={values.selectedCandidateId}
                    onChange={handleChange}
                    className="input-kinetic bg-surface-container-lowest"
                  >
                    {availableWorkspaceCandidates.map((cand) => (
                      <option key={cand.id} value={cand.id}>
                        {cand.name} — {cand.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsMemberModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Add to Squad"
                    icon={<FaCheck className="text-xs" />}
                    position="left"
                    className="px-5 py-2.5 rounded-lg"
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

export default ProjectDetails;