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
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "david-lee",
    name: "David Lee",
    role: "Staff Backend",
    task: "#WP-311",
    online: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Frontend Engineer",
    task: "#WP-509",
    online: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "QA Architect",
    task: "PR-12",
    online: false,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
];

const availableWorkspaceCandidates = [
  {
    id: "emily-watson",
    name: "Emily Watson",
    role: "Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Full-Stack Dev",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "jessica-taylor",
    name: "Jessica Taylor",
    role: "Content Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
];

const initialProjectTasks = [
  {
    id: "WP-482",
    title: "Refactor Transaction History virtualized list",
    assignee: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
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
          {/* BREADCRUMB & PROJECT TELEMETRY HEADER */}
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
                  <SecondaryBtn
                    type="button"
                    onClick={() =>
                      setTaskFilter((prev) =>
                        prev === "mine" ? "all" : "mine"
                      )
                    }
                    text={
                      taskFilter === "mine"
                        ? "Showing My Tasks"
                        : "Filter My Tasks"
                    }
                    icon={<FaBolt className="text-xs text-brand-orange" />}
                    position="left"
                    className="px-4 py-2.5 rounded-xl text-label-md"
                  />
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">
                  SPRINT DELIVERABLE COMPLETION ({completedCount}/{tasks.length}{" "}
                  TASKS)
                </span>
                <span className="text-brand-orange font-bold">
                  {progressPct}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-card dark:bg-surface-container-highest overflow-hidden">
                <div
                  style={{ width: `${progressPct}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-emerald transition-all duration-500"
                />
              </div>
            </div>
          </section>

          {/* 12-COLUMN PROJECT WORKBENCH */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* LEFT / MAIN BOARD AREA (8 COLS) */}
            <div className="xl:col-span-8 flex flex-col gap-5">
              <div className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 bg-card/70 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                  {[
                    { id: "all", label: "All Tasks" },
                    { id: "mine", label: "Assigned to Me" },
                    { id: "high", label: "High Priority" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTaskFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-label-md transition-colors cursor-pointer ${taskFilter === tab.id
                          ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-main"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 flex-1 sm:flex-initial justify-end">
                  <div className="relative flex items-center min-w-[190px]">
                    <FaSearch className="absolute left-3 text-text-muted text-xs pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter #WP-ID or assignee..."
                      className="input-kinetic pl-8 h-9 text-body-sm bg-surface-container-lowest"
                    />
                  </div>

                  <div className="inline-flex items-center bg-card/80 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                    <button
                      type="button"
                      onClick={() => setBoardMode("kanban")}
                      title="Kanban Board"
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${boardMode === "kanban"
                          ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                          : "text-text-muted hover:text-text-main"
                        }`}
                    >
                      <FaColumns />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoardMode("list")}
                      title="List View"
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${boardMode === "list"
                          ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                          : "text-text-muted hover:text-text-main"
                        }`}
                    >
                      <FaListUl />
                    </button>
                  </div>
                </div>
              </div>

              {boardMode === "kanban" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {statusColumns.map((columnStatus) => {
                    const columnTasks = filteredTasks.filter(
                      (t) => t.status === columnStatus
                    );
                    return (
                      <div
                        key={columnStatus}
                        className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col gap-3 min-h-[380px]"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${getBadgeClass(
                              columnStatus
                            )}`}
                          >
                            {columnStatus}
                          </span>
                          <span className="text-xs font-mono text-text-muted font-bold">
                            {columnTasks.length}
                          </span>
                        </div>

                        <div className="flex flex-col gap-3">
                          {columnTasks.map((task) => {
                            const canModify =
                              isManager || task.isMine;
                            return (
                              <div
                                key={task.id}
                                className={`bg-card/60 dark:bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/40 shadow-xs card-kinetic-interactive flex flex-col gap-3 ${task.priority === "High" &&
                                    task.status !== "Completed"
                                    ? "priority-bar-left"
                                    : ""
                                  }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-mono font-bold text-brand-orange">
                                      #{task.id}
                                    </span>
                                    {task.isMine && (
                                      <span className="px-1.5 py-0.2 rounded bg-brand-cyan/15 text-brand-cyan text-[10px] font-mono font-semibold">
                                        YOU
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] font-mono text-brand-cyan">
                                    {task.prRef}
                                  </span>
                                </div>

                                <p className="text-body-md font-semibold text-text-main leading-snug">
                                  {task.title}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/25">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={task.avatar}
                                      alt={task.assignee}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-xs text-text-muted truncate max-w-[90px]">
                                      {task.assignee}
                                    </span>
                                  </div>

                                  {canModify ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCycleStatus(task)
                                      }
                                      title="Advance task stage"
                                      className="px-2 py-1 rounded bg-panel dark:bg-surface-container-high border border-outline-variant/40 hover:border-brand-orange text-[10px] font-mono text-text-main hover:text-brand-orange transition-colors cursor-pointer inline-flex items-center gap-1"
                                    >
                                      <span>Advance</span>
                                      <FaArrowRight className="text-[8px]" />
                                    </button>
                                  ) : (
                                    <span
                                      title="Assigned to teammate"
                                      className="text-text-placeholder text-xs flex items-center gap-1 font-mono"
                                    >
                                      <FaLock className="text-[10px]" />
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {columnTasks.length === 0 && (
                            <div className="py-10 text-center text-body-sm text-text-placeholder font-mono border border-dashed border-outline-variant/30 rounded-xl">
                              No tasks in stage
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden divide-y divide-outline-variant/30">
                  {filteredTasks.map((task) => {
                    const canModify = isManager || task.isMine;
                    const isDone = task.status === "Completed";
                    return (
                      <div
                        key={task.id}
                        className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 table-row-kinetic ${task.priority === "High" && !isDone
                            ? "priority-bar-left"
                            : ""
                          }`}
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          {canModify ? (
                            <div className="relative flex items-center justify-center shrink-0">
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() =>
                                  handleCycleStatus(task)
                                }
                                className="peer checkbox-kinetic"
                              />
                              <FaCheck className="absolute text-[9px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                            </div>
                          ) : (
                            <span className="w-[18px] h-[18px] rounded bg-card dark:bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-text-placeholder shrink-0">
                              <FaLock className="text-[9px]" />
                            </span>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-bold text-brand-orange">
                                #{task.id}
                              </span>
                              <p
                                className={`text-body-md font-semibold truncate ${isDone
                                    ? "line-through text-text-muted"
                                    : "text-text-main"
                                  }`}
                              >
                                {task.title}
                              </p>
                            </div>
                            <p className="text-body-sm text-text-muted mt-0.5">
                              {task.assignee} • {task.prRef} • Due{" "}
                              {task.due}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          {task.priority === "High" && !isDone && (
                            <span className="px-2 py-0.5 rounded bg-error/15 text-error border border-error/30 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                              <FaExclamationTriangle className="text-[9px]" />
                              High
                            </span>
                          )}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${getBadgeClass(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: MILESTONES, CONTRIBUTORS & TELEMETRY (4 COLS) */}
            <aside className="xl:col-span-4 flex flex-col gap-6">
              {/* Release Milestones */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaFolderOpen className="text-brand-orange text-sm" />
                    <h2 className="text-title-md font-bold text-text-main">
                      Release Milestones
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-brand-emerald font-semibold">
                    2 / 4 Verified
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {milestones.map((ms) => (
                    <div
                      key={ms.id}
                      className="p-3 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FaCheckCircle
                          className={`text-sm shrink-0 ${ms.done
                              ? "text-brand-emerald"
                              : "text-text-placeholder"
                            }`}
                        />
                        <span
                          className={`text-body-sm font-medium truncate ${ms.done
                              ? "text-text-main"
                              : "text-text-muted"
                            }`}
                        >
                          {ms.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-text-muted shrink-0">
                        {ms.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* =========================================================
                                PROJECT CONTRIBUTORS SECTION (WITH ADD/REMOVE FOR MANAGERS)
                               ========================================================= */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-brand-orange text-sm" />
                    <h3 className="text-title-md font-bold text-text-main">
                      Project Contributors
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 text-[11px] font-mono font-bold">
                    {projectSquad.filter((m) => m.online).length} Active Now
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {projectSquad.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/30 hover:border-brand-orange/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container-highest"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-panel dark:border-surface-container ${person.online
                                ? "bg-brand-emerald"
                                : "bg-text-placeholder"
                              }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-label-lg text-text-main font-bold truncate leading-tight">
                            {person.name}
                          </p>
                          <p className="text-body-sm text-text-muted truncate mt-0.5">
                            {person.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 text-[11px] font-mono font-semibold">
                          {person.task}
                        </span>

                        {isManager && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(person.id)}
                            title={`Remove ${person.name} from project`}
                            className="p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                          >
                            <FaUserMinus className="text-xs" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {isManager && (
                  <SecondaryBtn
                    type="button"
                    onClick={() => setIsMemberModalOpen(true)}
                    text="Add Contributor"
                    icon={<FaUserPlus className="text-xs text-brand-cyan" />}
                    position="left"
                    className="w-full py-2.5 rounded-xl text-label-md"
                  />
                )}
              </section>

              {/* Git & CI/CD Telemetry */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaTerminal className="text-brand-cyan text-sm" />
                    <h2 className="text-title-md font-bold text-text-main">
                      Repository Telemetry
                    </h2>
                  </div>
                  <span className="badge-completed text-label-caps px-2 py-0.5 rounded">
                    CI PASSING
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">BRANCH</span>
                    <span className="text-brand-cyan font-semibold">
                      {projectMeta.branch}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">OPEN PRS</span>
                    <span className="text-text-main font-semibold">
                      4 Active Reviews
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">TEST COVERAGE</span>
                    <span className="text-brand-emerald font-semibold">
                      94.2%
                    </span>
                  </div>
                </div>

                <SecondaryBtn
                  type="button"
                  onClick={() =>
                    navigate(`/work-space/${workspaceId}/files`)
                  }
                  text="View Project Specs & Files"
                  icon={<FaRegFileAlt className="text-xs text-brand-orange" />}
                  position="left"
                  className="w-full py-2.5 rounded-xl text-label-md"
                />
              </section>
            </aside>
          </div>
        </main>

        {/* MANAGER ASSIGN TASK MODAL */}
        {isManager && isAssignModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAssignModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="w-full max-w-[40vw] bg-panel dark:bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaUserCheck className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-text-main font-bold">
                      Assign Task to {projectMeta.code}
                    </h3>
                    <p className="text-body-sm text-text-muted">
                      {projectMeta.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-text-muted hover:text-text-main p-1 cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAssignSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Task Deliverable <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="taskTitle"
                    required
                    value={values.taskTitle}
                    onChange={handleChange}
                    placeholder="e.g. Add webhook signature verification middleware"
                    className="input-kinetic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Assign To Contributor
                    </label>
                    <select
                      name="taskAssignee"
                      value={values.taskAssignee}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      {projectSquad.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Priority
                    </label>
                    <select
                      name="taskPriority"
                      value={values.taskPriority}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Initial Stage
                    </label>
                    <select
                      name="taskStatus"
                      value={values.taskStatus}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Due Window
                    </label>
                    <input
                      type="text"
                      name="taskDue"
                      value={values.taskDue}
                      onChange={handleChange}
                      placeholder="e.g. Fri, Dec 12"
                      className="input-kinetic"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Dispatch Task"
                    icon={<FaPlus className="text-xs" />}
                    position="left"
                    className="px-5 py-2.5 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
                    MANAGER ADD CONTRIBUTOR MODAL
                   ========================================================= */}
        {isManager && isMemberModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMemberModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="w-full max-w-[40vw] bg-panel dark:bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                    <FaUserPlus className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-text-main font-bold">
                      Add Contributor to {projectMeta.code}
                    </h3>
                    <p className="text-body-sm text-text-muted">
                      Select from workspace teammates
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="text-text-muted hover:text-text-main p-1 cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAddMemberSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Workspace Teammates
                  </label>
                  <select
                    name="selectedCandidateId"
                    value={values.selectedCandidateId}
                    onChange={handleChange}
                    className="input-kinetic"
                  >
                    {availableWorkspaceCandidates.map((cand) => (
                      <option key={cand.id} value={cand.id}>
                        {cand.name} — {cand.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsMemberModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Add to Project"
                    icon={<FaUserPlus className="text-xs" />}
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