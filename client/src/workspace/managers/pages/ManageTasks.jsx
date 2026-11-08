import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  FaBolt,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaCodeBranch,
  FaColumns,
  FaExclamationTriangle,
  FaFilter,
  FaFolderOpen,
  FaListUl,
  FaPlus,
  FaSearch,
  FaTasks,
  FaTimes,
  FaTrashAlt,
  FaUserCheck,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const workspaceMembers = [
  {
    id: "sarah-kim",
    name: "Sarah Kim",
    role: "Lead UI/UX",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "david-lee",
    name: "David Lee",
    role: "Staff Backend",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "QA Architect",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Full-Stack Dev",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  },
];

const workspaceProjects = [
  { id: "fintech-mobile", name: "Fintech Mobile Banking", code: "PRJ-01" },
  { id: "api-gateway-v4", name: "Core API v4 Gateway", code: "PRJ-02" },
  { id: "kinetic-design-system", name: "Kinetic Horizon UI Kit", code: "PRJ-03" },
  { id: "saml-sso-engine", name: "Multi-Tenant SAML SSO", code: "PRJ-04" },
];

const initialTasks = [
  {
    id: "WP-482",
    title: "Refactor Transaction History virtualized list",
    description:
      "Optimize DOM node recycling for 10k+ ledger rows and eliminate scroll frame drops.",
    projectId: "fintech-mobile",
    projectName: "Fintech Mobile Banking",
    assignee: "Sarah Kim",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Progress",
    dueDate: "Today, 6:00 PM",
    prRef: "PR #148",
    branch: "feat/virtual-ledger",
    subtasksDone: 3,
    subtasksTotal: 4,
  },
  {
    id: "WP-311",
    title: "Stabilize Plaid webhook retry queue on staging",
    description:
      "Configure exponential backoff and dead-letter queue alerts for failed webhook handshakes.",
    projectId: "api-gateway-v4",
    projectName: "Core API v4 Gateway",
    assignee: "David Lee",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Review",
    dueDate: "Tomorrow",
    prRef: "PR #144",
    branch: "fix/webhook-retry",
    subtasksDone: 5,
    subtasksTotal: 5,
  },
  {
    id: "WP-509",
    title: "Audit dark-mode contrast tokens on Kanban cards",
    description:
      "Verify WCAG AA compliance across surface-container elevation levels.",
    projectId: "kinetic-design-system",
    projectName: "Kinetic Horizon UI Kit",
    assignee: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Thu, Dec 10",
    prRef: "PR #151",
    branch: "chore/a11y-tokens",
    subtasksDone: 2,
    subtasksTotal: 4,
  },
  {
    id: "WP-518",
    title: "Wire role-based route guards for workspace views",
    description:
      "Enforce manager and member route boundaries across workspace navigation outlets.",
    projectId: "saml-sso-engine",
    projectName: "Multi-Tenant SAML SSO",
    assignee: "Alex Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Review",
    dueDate: "Fri, Dec 11",
    prRef: "PR #153",
    branch: "feat/rbac-guards",
    subtasksDone: 4,
    subtasksTotal: 4,
  },
  {
    id: "WP-460",
    title: "Implement biometric FaceID fallback session pin",
    description:
      "Add hardware key enclave fallback when biometric sensor returns lockout code.",
    projectId: "fintech-mobile",
    projectName: "Fintech Mobile Banking",
    assignee: "Marcus Chen",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    priority: "Low",
    status: "Completed",
    dueDate: "Completed",
    prRef: "PR #139",
    branch: "feat/faceid-fallback",
    subtasksDone: 3,
    subtasksTotal: 3,
  },
  {
    id: "WP-495",
    title: "Migrate Redis rate-limiter cluster to TLS 1.3",
    description:
      "Update connection pool certificates and benchmark p99 latency under load.",
    projectId: "api-gateway-v4",
    projectName: "Core API v4 Gateway",
    assignee: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    priority: "Medium",
    status: "Completed",
    dueDate: "Completed",
    prRef: "PR #141",
    branch: "sec/redis-tls13",
    subtasksDone: 6,
    subtasksTotal: 6,
  },
];

const statusColumns = ["In Progress", "In Review", "Completed"];

const ManageTasks = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const rawRole = outletContext.role || "manager";
  const normalizedRole = Array.isArray(rawRole) ? rawRole[0] : rawRole;

  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" | "table"
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { values, handleChange } = useForm({
    title: "",
    description: "",
    projectId: workspaceProjects[0].id,
    assigneeName: workspaceMembers[0].name,
    priority: "High",
    status: "In Progress",
    dueDate: "Fri, Dec 12",
    branch: "feat/new-task-node",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCreateModalOpen(false);
        setSelectedTask(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cycle task status forward
  const handleCycleStatus = (taskId) => {
    const nextOrder = {
      "In Progress": "In Review",
      "In Review": "Completed",
      Completed: "In Progress",
    };

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus = nextOrder[t.status] || "In Progress";
        return {
          ...t,
          status: nextStatus,
          subtasksDone:
            nextStatus === "Completed" ? t.subtasksTotal : t.subtasksDone,
        };
      })
    );
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  // Create & Assign new task
  const handleCreateTask = (e) => {
    e.preventDefault();
    const trimmedTitle = values.title.trim();
    if (!trimmedTitle) return;

    const member =
      workspaceMembers.find((m) => m.name === values.assigneeName) ||
      workspaceMembers[0];
    const project =
      workspaceProjects.find((p) => p.id === values.projectId) ||
      workspaceProjects[0];

    const newTask = {
      id: `WP-${Math.floor(520 + Math.random() * 400)}`,
      title: trimmedTitle,
      description:
        values.description.trim() ||
        "Sprint deliverable provisioned via Workspace Task Command.",
      projectId: project.id,
      projectName: project.name,
      assignee: member.name,
      avatar: member.avatar,
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate.trim() || "This Sprint",
      prRef: `PR #${Math.floor(155 + Math.random() * 40)}`,
      branch: values.branch.trim() || "feat/sprint-task",
      subtasksDone: values.status === "Completed" ? 4 : 1,
      subtasksTotal: 4,
    };

    setTasks((prev) => [newTask, ...prev]);
    handleChange({ target: { name: "title", value: "", type: "text" } });
    handleChange({ target: { name: "description", value: "", type: "text" } });
    setIsCreateModalOpen(false);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
    if (projectFilter !== "all" && task.projectId !== projectFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      task.id.toLowerCase().includes(q) ||
      task.assignee.toLowerCase().includes(q) ||
      task.projectName.toLowerCase().includes(q)
    );
  });

  // Telemetry metrics
  const totalCount = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const inReviewCount = tasks.filter((t) => t.status === "In Review").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const completionRate = Math.round(
    (completedCount / (totalCount || 1)) * 100
  );

  const getStatusBadge = (status) => {
    if (status === "Completed") return "badge-completed";
    if (status === "In Review") return "badge-review";
    return "badge-in-progress";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High")
      return "bg-error/15 text-error border border-error/30";
    if (priority === "Medium")
      return "bg-brand-orange/15 text-brand-orange border border-brand-orange/30";
    return "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30";
  };

  return (
    <>
      <Helmet>
        <title>WorkPilot | Manage Tasks (Workspace #{workspaceId})</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* ==========================================
              1. HEADER & SPRINT TELEMETRY BAR
             ========================================== */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-label-caps font-mono">
                    <FaBolt className="text-[10px]" />
                    SPRINT ORCHESTRATION
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    ROLE: {normalizedRole.toUpperCase()}
                  </span>
                </div>

                <h1 className="text-headline-md sm:text-headline-lg text-text-main font-extrabold tracking-tight">
                  Workspace Task Command
                </h1>
                <p className="text-body-md text-text-muted">
                  Assign deliverables, monitor PR review queues, and balance
                  engineering workload across active projects.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {/* View Switcher (Kanban / Table) */}
                <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40">
                  <button
                    type="button"
                    onClick={() => setViewMode("kanban")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-md transition-all cursor-pointer ${viewMode === "kanban"
                      ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                      : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaColumns className="text-xs" />
                    <span>Kanban</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-md transition-all cursor-pointer ${viewMode === "table"
                      ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                      : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaListUl className="text-xs" />
                    <span>Table</span>
                  </button>
                </div>

                <PrimaryBtn
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  text="Create & Assign Task"
                  icon={<FaPlus className="text-xs" />}
                  position="left"
                  className="px-5 py-2.5 rounded-xl text-label-lg"
                />
              </div>
            </div>

            {/* KPI Telemetry Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 border-t border-outline-variant/30">
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    TOTAL TASKS
                  </span>
                  <div className="text-2xl font-extrabold font-display text-text-main mt-1">
                    {totalCount}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center">
                  <FaTasks className="text-base" />
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    IN PROGRESS
                  </span>
                  <div className="text-2xl font-extrabold font-display text-brand-orange mt-1">
                    {inProgressCount}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                  <FaClock className="text-base" />
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    IN PR REVIEW
                  </span>
                  <div className="text-2xl font-extrabold font-display text-brand-cyan mt-1">
                    {inReviewCount}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center">
                  <FaCodeBranch className="text-base" />
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    VELOCITY ({completionRate}%)
                  </span>
                  <div className="text-2xl font-extrabold font-display text-brand-emerald mt-1">
                    {completedCount} Done
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-emerald/15 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center">
                  <FaCheckCircle className="text-base" />
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              2. FILTER & SEARCH CONTROL BAR
             ========================================== */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by task ID (#WP-482), title, assignee, or project..."
                className="input-kinetic pl-9 bg-surface-container-lowest h-10"
              />
            </div>

            {/* Filter Pills & Selects */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 text-label-md text-text-muted mr-1">
                <FaFilter className="text-xs text-brand-orange" />
                <span>Filters:</span>
              </div>

              {/* Project Filter */}
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-body-sm text-text-main focus:outline-none focus:border-brand-orange cursor-pointer"
              >
                <option value="all">All Projects</option>
                {workspaceProjects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.code} • {proj.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-body-sm text-text-main focus:outline-none focus:border-brand-orange cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {statusColumns.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-body-sm text-text-main focus:outline-none focus:border-brand-orange cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              {(statusFilter !== "all" ||
                priorityFilter !== "all" ||
                projectFilter !== "all" ||
                searchQuery.trim() !== "") && (
                  <GhostBtn
                    type="button"
                    onClick={() => {
                      setStatusFilter("all");
                      setPriorityFilter("all");
                      setProjectFilter("all");
                      setSearchQuery("");
                    }}
                    text="Reset"
                    className="text-xs px-3 py-2 rounded-lg"
                  />
                )}
            </div>
          </section>

          {/* ==========================================
              3. MAIN TASKS VIEW (KANBAN OR TABLE)
             ========================================== */}
          {viewMode === "kanban" ? (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {statusColumns.map((columnStatus) => {
                const columnTasks = filteredTasks.filter(
                  (t) => t.status === columnStatus
                );

                return (
                  <div
                    key={columnStatus}
                    className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4 min-h-[420px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${columnStatus === "Completed"
                            ? "bg-brand-emerald"
                            : columnStatus === "In Review"
                              ? "bg-brand-cyan"
                              : "bg-brand-orange"
                            }`}
                        />
                        <h2 className="text-title-md font-bold text-text-main">
                          {columnStatus}
                        </h2>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-card dark:bg-surface-container-highest text-xs font-mono font-bold text-text-muted">
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Cards Stack */}
                    <div className="flex flex-col gap-3.5">
                      {columnTasks.length > 0 ? (
                        columnTasks.map((task) => {
                          const pct = Math.round(
                            (task.subtasksDone / (task.subtasksTotal || 1)) *
                            100
                          );

                          return (
                            <div
                              key={task.id}
                              onClick={() => setSelectedTask(task)}
                              className="card-kinetic card-kinetic-interactive bg-card/60 dark:bg-surface-container-low flex flex-col gap-3.5 cursor-pointer"
                            >
                              {/* Top Row: Priority, ID & PR Pill */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getPriorityStyle(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                  <span className="text-xs font-mono font-semibold text-text-muted">
                                    #{task.id}
                                  </span>
                                </div>

                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/40 text-[11px] font-mono text-brand-cyan">
                                  <FaCodeBranch className="text-[9px]" />
                                  {task.prRef}
                                </span>
                              </div>

                              {/* Task Title & Description */}
                              <div>
                                <h3 className="text-title-md font-bold text-text-main leading-snug">
                                  {task.title}
                                </h3>
                                <p className="text-body-sm text-text-muted line-clamp-2 mt-1">
                                  {task.description}
                                </p>
                              </div>

                              {/* Project Tag & Subtask Progress */}
                              <div className="bg-panel/80 dark:bg-surface-container p-2.5 rounded-lg border border-outline-variant/30 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="inline-flex items-center gap-1.5 text-text-muted font-medium truncate">
                                    <FaFolderOpen className="text-brand-orange text-[11px] shrink-0" />
                                    <span className="truncate">
                                      {task.projectName}
                                    </span>
                                  </span>
                                  <span className="font-mono font-bold text-text-main">
                                    {task.subtasksDone}/{task.subtasksTotal}
                                  </span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                                  <div
                                    style={{ width: `${pct}%` }}
                                    className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-emerald transition-all duration-300"
                                  />
                                </div>
                              </div>

                              {/* Card Footer: Assignee, Due Date & Quick Status Cycle */}
                              <div className="pt-2 border-t border-outline-variant/25 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <img
                                    src={task.avatar}
                                    alt={task.assignee}
                                    className="w-6 h-6 rounded-full object-cover ring-1 ring-outline-variant/40 shrink-0"
                                  />
                                  <span className="text-body-sm text-text-main font-medium truncate">
                                    {task.assignee}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                                    <FaCalendarAlt className="text-[10px] text-brand-orange" />
                                    {task.dueDate}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCycleStatus(task.id);
                                    }}
                                    title="Advance task status"
                                    className="px-2 py-1 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-[10px] font-mono font-bold transition-colors cursor-pointer"
                                  >
                                    Advance →
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-12 px-4 text-center rounded-xl border border-dashed border-outline-variant/40 text-text-muted text-body-sm">
                          No tasks in {columnStatus} matching current filters.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            /* ==========================================
               TABLE VIEW
               ========================================== */
            <section className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/40 bg-surface-container-low text-label-caps text-text-muted">
                      <th className="py-3.5 px-4">Task ID &amp; Deliverable</th>
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Assignee</th>
                      <th className="py-3.5 px-4">Priority</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Due / Telemetry</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/25 text-body-sm">
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="table-row-kinetic cursor-pointer"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono font-bold text-brand-orange text-xs">
                              #{task.id}
                            </span>
                            <div>
                              <p className="font-semibold text-text-main">
                                {task.title}
                              </p>
                              <span className="text-[11px] font-mono text-text-muted">
                                {task.branch} • {task.prRef}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/work-space/${workspaceId}/projects/${task.projectId}`
                              );
                            }}
                            className="text-brand-cyan hover:underline font-medium cursor-pointer"
                          >
                            {task.projectName}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={task.avatar}
                              alt={task.assignee}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-text-main font-medium">
                              {task.assignee}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${getPriorityStyle(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${getStatusBadge(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-text-muted">
                          {task.dueDate}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div
                            className="inline-flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => handleCycleStatus(task.id)}
                              className="px-2.5 py-1 rounded bg-card hover:bg-brand-orange hover:text-white text-text-main text-xs font-mono transition-colors cursor-pointer"
                            >
                              Cycle Status
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                              aria-label="Delete task"
                              className="p-1.5 rounded text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                            >
                              <FaTrashAlt className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>

        {/* ==========================================
            4. CREATE & ASSIGN TASK MODAL
           ========================================== */}
        {isCreateModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsCreateModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaPlus className="text-base" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-on-surface font-bold">
                      Provision Sprint Task
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Assign deliverable and bind Git telemetry branch.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleCreateTask}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Task Title <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={values.title}
                    onChange={handleChange}
                    placeholder="e.g. Implement OAuth2 token rotation middleware"
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Technical Specification
                  </label>
                  <textarea
                    rows={2}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Acceptance criteria, PR notes, or telemetry links..."
                    className="w-full p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-brand-orange resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Target Project
                    </label>
                    <select
                      name="projectId"
                      value={values.projectId}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      {workspaceProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Assign Engineer
                    </label>
                    <select
                      name="assigneeName"
                      value={values.assigneeName}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      {workspaceMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Initial Status
                    </label>
                    <select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    >
                      {statusColumns.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface">
                      Target Due
                    </label>
                    <input
                      type="text"
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                      className="input-kinetic bg-surface-container-lowest"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <SecondaryBtn
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Deploy Task Node"
                    icon={<FaCheck className="text-xs" />}
                    position="left"
                    className="px-5 py-2.5 rounded-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================
            5. TASK TELEMETRY DRAWER / INSPECTOR MODAL
           ========================================== */}
        {selectedTask && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedTask(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange font-mono text-xs font-bold">
                    #{selectedTask.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${getStatusBadge(
                      selectedTask.status
                    )}`}
                  >
                    {selectedTask.status}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${getPriorityStyle(
                      selectedTask.priority
                    )}`}
                  >
                    {selectedTask.priority} Priority
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <div>
                <h2 className="text-headline-sm text-on-surface font-bold">
                  {selectedTask.title}
                </h2>
                <p className="text-body-md text-on-surface-variant mt-1.5">
                  {selectedTask.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 text-body-sm">
                <div>
                  <span className="text-label-caps text-text-muted block">
                    ASSIGNED ENGINEER
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={selectedTask.avatar}
                      alt={selectedTask.assignee}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-semibold text-on-surface">
                      {selectedTask.assignee}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-label-caps text-text-muted block">
                    GIT TELEMETRY
                  </span>
                  <span className="font-mono text-brand-cyan text-xs mt-1 block">
                    {selectedTask.branch} ({selectedTask.prRef})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                <SecondaryBtn
                  type="button"
                  onClick={() =>
                    navigate(
                      `/work-space/${workspaceId}/projects/${selectedTask.projectId}`
                    )
                  }
                  text={`Open ${selectedTask.projectName}`}
                  icon={<FaFolderOpen className="text-xs text-brand-orange" />}
                  position="left"
                  className="px-4 py-2 rounded-lg text-xs"
                />

                <div className="flex items-center gap-2">
                  <PrimaryBtn
                    type="button"
                    onClick={() => {
                      handleCycleStatus(selectedTask.id);
                      setSelectedTask(null);
                    }}
                    text="Advance Status"
                    className="px-4 py-2 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageTasks;