import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaCheck,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaCode,
  FaExclamationTriangle,
  FaFolderOpen,
  FaHistory,
  FaLayerGroup,
  FaLock,
  FaPlus,
  FaRegFileAlt,
  FaSearch,
  FaTachometerAlt,
  FaTasks,
  FaTerminal,
  FaTimes,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const initialProjects = [
  {
    id: "fintech-mobile",
    name: "Fintech Mobile Banking",
    code: "PRJ-01",
    category: "Mobile Core",
    status: "On Track",
    statusClass: "badge-completed",
    progress: 82,
    barColor: "from-brand-orange to-amber-400",
    tasksDone: 45,
    tasksTotal: 55,
    dueDate: "Dec 12",
    branch: "feat/biometric-auth",
    members: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "api-gateway-v4",
    name: "Core API v4 Gateway",
    code: "PRJ-02",
    category: "Infrastructure",
    status: "In Progress",
    statusClass: "badge-in-progress",
    progress: 64,
    barColor: "from-brand-cyan to-sky-400",
    tasksDone: 18,
    tasksTotal: 28,
    dueDate: "Dec 19",
    branch: "fix/webhook-retry-queue",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "kinetic-design-system",
    name: "Kinetic Horizon UI Kit",
    code: "PRJ-03",
    category: "Design System",
    status: "In Review",
    statusClass: "badge-review",
    progress: 91,
    barColor: "from-brand-emerald to-teal-400",
    tasksDone: 31,
    tasksTotal: 34,
    dueDate: "Dec 08",
    branch: "release/tokens-v4.2",
    members: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "saml-sso-engine",
    name: "Multi-Tenant SAML SSO",
    code: "PRJ-04",
    category: "Security",
    status: "In Progress",
    statusClass: "badge-in-progress",
    progress: 45,
    barColor: "from-brand-orange to-amber-400",
    tasksDone: 9,
    tasksTotal: 20,
    dueDate: "Jan 05",
    branch: "feat/scim-provisioning",
    members: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

const squadRoster = [
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
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "QA Architect",
    task: "PR-12",
    online: false,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    role: "Full-Stack Dev",
    task: "#WP-509",
    online: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Frontend Engineer",
    task: "#WP-518",
    online: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
];

const initialSprintTasks = [
  {
    id: "WP-482",
    title: "Refactor Transaction History virtualized list",
    project: "Fintech Mobile Banking",
    assignee: "Sarah Kim",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Progress",
    due: "Today, 6:00 PM",
    completed: false,
    isMine: false,
  },
  {
    id: "WP-311",
    title: "Stabilize Plaid webhook retry queue on staging",
    project: "Core API v4 Gateway",
    assignee: "David Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Review",
    due: "Tomorrow",
    completed: false,
    isMine: false,
  },
  {
    id: "WP-509",
    title: "Audit dark-mode contrast tokens on Kanban cards",
    project: "Kinetic Horizon UI Kit",
    assignee: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "Medium",
    status: "In Progress",
    due: "Thu, Dec 10",
    completed: false,
    isMine: true,
  },
  {
    id: "WP-294",
    title: "Implement Biometric FaceID session fallback",
    project: "Fintech Mobile Banking",
    assignee: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    priority: "Medium",
    status: "Completed",
    due: "Completed",
    completed: true,
    isMine: false,
  },
  {
    id: "WP-518",
    title: "Configure role-based route guards for workspace settings",
    project: "Multi-Tenant SAML SSO",
    assignee: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    priority: "High",
    status: "In Review",
    due: "Fri, Dec 11",
    completed: false,
    isMine: true,
  },
];

const telemetryFeed = [
  {
    id: "ev-1",
    actor: "David Lee",
    action: "merged PR #142 into",
    target: "main",
    time: "4m ago",
    dotColor: "bg-brand-emerald",
  },
  {
    id: "ev-2",
    actor: "Sarah Kim",
    action: "updated Figma tokens on",
    target: "#WP-482",
    time: "18m ago",
    dotColor: "bg-brand-orange",
  },
  {
    id: "ev-3",
    actor: "CI/CD Runner",
    action: "deployed staging build",
    target: "v4.2.1-rc3",
    time: "42m ago",
    dotColor: "bg-brand-cyan",
  },
  {
    id: "ev-4",
    actor: "Marcus Chen",
    action: "verified 48 E2E assertions on",
    target: "PR-12",
    time: "1h ago",
    dotColor: "bg-primary",
  },
];

const sprintVelocityBars = [
  { sprint: "S30", points: 42, pct: 60 },
  { sprint: "S31", points: 48, pct: 68 },
  { sprint: "S32", points: 51, pct: 74 },
  { sprint: "S33", points: 58, pct: 84 },
  { sprint: "S34", points: 64, pct: 94, active: true },
];

const WorkspaceOverview = () => {
  const { workspaceId = "12345" } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const rawRole = outletContext.role || "member";
  const normalizedRole = Array.isArray(rawRole) ? rawRole[0] : rawRole;
  const isManager = normalizedRole === "manager";

  const [tasks, setTasks] = useState(initialSprintTasks);
  const [taskFilter, setTaskFilter] = useState(isManager ? "all" : "mine");
  const [projectFilter, setProjectFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const { values, handleChange } = useForm({
    taskTitle: "",
    taskProject: "Fintech Mobile Banking",
    taskAssignee: "Sarah Kim",
    taskPriority: "High",
    taskDue: "Fri, Dec 12",
  });

  const handleToggleTask = (task) => {
    // Members can only toggle tasks assigned to themselves
    if (!isManager && !task.isMine) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== task.id) return t;
        const nextCompleted = !t.completed;
        return {
          ...t,
          completed: nextCompleted,
          status: nextCompleted ? "Completed" : "In Progress",
        };
      })
    );
  };

  const handleAssignTaskSubmit = (e) => {
    e.preventDefault();
    if (!isManager) return;

    const trimmed = values.taskTitle.trim();
    if (!trimmed) return;

    const matchedMember =
      squadRoster.find((m) => m.name === values.taskAssignee) ||
      squadRoster[0];

    const newTask = {
      id: `WP-${Math.floor(520 + Math.random() * 400)}`,
      title: trimmed,
      project: values.taskProject,
      assignee: matchedMember.name,
      avatar: matchedMember.avatar,
      priority: values.taskPriority,
      status: "In Progress",
      due: values.taskDue || "This Sprint",
      completed: false,
      isMine: matchedMember.name === "Alex Chen",
    };

    setTasks((prev) => [newTask, ...prev]);
    handleChange({ target: { name: "taskTitle", value: "", type: "text" } });
    setIsAssignModalOpen(false);
  };

  const filteredProjects = initialProjects.filter((p) => {
    if (projectFilter !== "all" && p.status !== projectFilter) return false;
    if (!searchQuery.trim()) return true;
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "mine" && !t.isMine) return false;
    if (taskFilter === "high" && t.priority !== "High") return false;
    if (!searchQuery.trim()) return true;
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const myPendingTasksCount = tasks.filter((t) => t.isMine && !t.completed).length;
  const highPriorityCount = tasks.filter(
    (t) => t.priority === "High" && !t.completed
  ).length;

  const kpiCards = [
    {
      id: "velocity",
      label: "Sprint 34 Velocity",
      value: "84.2%",
      delta: "+12.4% WoW",
      subtext: "64 / 76 story points burned",
      icon: FaTachometerAlt,
      accent: "text-brand-orange bg-brand-orange/15 border-brand-orange/30",
    },
    {
      id: "projects",
      label: "Active Projects",
      value: String(initialProjects.length),
      delta: "3 On Track",
      subtext: "1 release candidate in QA",
      icon: FaFolderOpen,
      accent: "text-brand-cyan bg-brand-cyan/15 border-brand-cyan/30",
    },
    {
      id: "tasks",
      label: isManager ? "Total Sprint Tasks" : "My Assigned Tasks",
      value: isManager
        ? `${completedTasksCount}/${tasks.length}`
        : String(myPendingTasksCount),
      delta: isManager
        ? `${highPriorityCount} High Priority`
        : "Active in Sprint 34",
      subtext: isManager
        ? "Cycle time avg: 1.4 days"
        : "Click My Tasks tab for full view",
      icon: FaTasks,
      accent: "text-brand-emerald bg-brand-emerald/15 border-brand-emerald/30",
    },
    {
      id: "telemetry",
      label: "PR Merge Health",
      value: "96.4%",
      delta: "14.2ms latency",
      subtext: "18 commits pushed today",
      icon: FaTerminal,
      accent: "text-primary bg-primary/15 border-primary/30",
    },
  ];

  const getStatusBadgeClass = (status) => {
    if (status === "Completed" || status === "On Track") {
      return "badge-completed";
    }
    if (status === "In Review") {
      return "badge-review";
    }
    return "badge-in-progress";
  };

  return (
    <>
      <Helmet>
        <title>WorkPilot | Workspace Overview #{workspaceId}</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* =========================================================
                        1. SPRINT TELEMETRY COMMAND BANNER (ROLE-ADAPTIVE)
                       ========================================================= */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container/35 via-panel to-secondary-container/25 dark:from-surface-container-high dark:via-surface-container dark:to-surface-container-lowest border border-outline-variant/40 p-5 sm:p-7 shadow-level-2">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col gap-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-panel/90 dark:bg-surface-container-highest border border-outline-variant/40 text-label-caps text-brand-orange font-mono">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                    SPRINT 34 • {isManager ? "MANAGER COMMAND" : "MEMBER VIEW"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emerald/15 border border-brand-emerald/30 text-label-caps text-brand-emerald font-mono">
                    <FaBolt className="text-[10px]" />
                    CLUSTER HEALTHY
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    6 days remaining • Freeze: Dec 12
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-text-main">
                  {isManager
                    ? "Operational Command & Task Dispatch"
                    : "Workspace Overview & Sprint Progress"}
                </h2>
                <p className="text-body-md text-text-muted">
                  {isManager
                    ? "Monitor squad velocity, orchestrate project deliverables, and assign sprint tasks to members in "
                    : "Track your assigned deliverables, inspect repository branches, and stay synced with your squad in "}
                  <span className="text-text-main font-semibold font-mono">
                    Workspace #{workspaceId}
                  </span>
                  .
                </p>
              </div>

              {/* Role-Specific Primary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <div className="relative flex items-center min-w-[220px]">
                  <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter projects or #WP-ID..."
                    className="input-kinetic pl-9 bg-surface-container-lowest h-10 text-body-sm"
                  />
                </div>

                <SecondaryBtn
                  type="button"
                  onClick={() => navigate("projects")}
                  text="Projects"
                  icon={<FaFolderOpen className="text-xs text-brand-cyan" />}
                  position="left"
                  className="px-4 py-2.5 rounded-lg text-label-md whitespace-nowrap"
                />

                {isManager ? (
                  <PrimaryBtn
                    type="button"
                    onClick={() => setIsAssignModalOpen(true)}
                    text="Assign Task"
                    icon={<FaPlus className="text-xs" />}
                    position="left"
                    className="px-4 py-2.5 rounded-lg text-label-md whitespace-nowrap"
                  />
                ) : (
                  <PrimaryBtn
                    type="button"
                    onClick={() => navigate("my-tasks")}
                    text="My Tasks"
                    icon={<FaClipboardList className="text-xs" />}
                    position="left"
                    className="px-4 py-2.5 rounded-lg text-label-md whitespace-nowrap"
                  />
                )}
              </div>
            </div>
          </section>

          {/* =========================================================
                        2. KPI TELEMETRY STRIP (4 CARDS)
                       ========================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpiCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-label-md text-text-muted font-medium">
                      {card.label}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${card.accent}`}
                    >
                      <Icon className="text-sm" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-text-main tracking-tight">
                      {card.value}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-card dark:bg-surface-container-highest text-[11px] font-mono font-semibold text-brand-orange">
                      {card.delta}
                    </span>
                  </div>

                  <p className="text-body-sm text-text-muted border-t border-outline-variant/25 pt-2">
                    {card.subtext}
                  </p>
                </div>
              );
            })}
          </section>

          {/* =========================================================
                        3. MAIN 12-COLUMN WORKSPACE GRID
                       ========================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* LEFT / CENTER COLUMN (8 COLS) */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              {/* A. ACTIVE PROJECTS MATRIX */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FaLayerGroup className="text-brand-orange text-base" />
                    <div>
                      <h2 className="text-headline-sm text-text-main font-bold">
                        Active Workspace Projects
                      </h2>
                      <p className="text-body-sm text-text-muted">
                        Shared project boards across this workspace
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 bg-card/70 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                    {["all", "On Track", "In Progress", "In Review"].map(
                      (status) => {
                        const active = projectFilter === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setProjectFilter(status)}
                            className={`px-2.5 py-1 rounded-lg text-label-md transition-colors cursor-pointer ${active
                                ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                                : "text-text-muted hover:text-text-main"
                              }`}
                          >
                            {status === "all" ? "All" : status}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => navigate(`projects/${project.id}`)}
                      className="bg-card/50 dark:bg-surface-container-low rounded-xl p-4 sm:p-5 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-panel dark:bg-surface-container-highest border border-outline-variant/40 text-[11px] font-mono text-text-muted">
                              {project.code}
                            </span>
                            <span className="text-label-md text-text-muted">
                              {project.category}
                            </span>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${project.statusClass}`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <h3 className="text-title-md font-bold text-text-main group-hover:text-brand-orange transition-colors">
                          {project.name}
                        </h3>

                        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/30 text-[11px] font-mono text-brand-cyan">
                          <FaCode className="text-[10px]" />
                          <span className="truncate">{project.branch}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 pt-2 border-t border-outline-variant/25">
                        <div className="flex items-center justify-between text-body-sm">
                          <span className="text-text-muted font-mono text-xs">
                            {project.tasksDone}/{project.tasksTotal} tasks
                          </span>
                          <span className="font-mono font-bold text-text-main text-xs">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="w-full h-1.5 rounded-full bg-panel dark:bg-surface-container-highest overflow-hidden">
                          <div
                            style={{ width: `${project.progress}%` }}
                            className={`h-full rounded-full bg-gradient-to-r ${project.barColor}`}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex -space-x-2">
                            {project.members.map((avatar, i) => (
                              <img
                                key={i}
                                src={avatar}
                                alt="Member"
                                className="w-6 h-6 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container-low"
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1">
                            <FaClock className="text-[10px] text-brand-orange" />
                            Due {project.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* B. SPRINT EXECUTION QUEUE */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FaTasks className="text-brand-orange text-base" />
                    <div>
                      <h2 className="text-headline-sm text-text-main font-bold">
                        Sprint Execution Queue
                      </h2>
                      <p className="text-body-sm text-text-muted">
                        {isManager
                          ? "Manager mode: assign, audit, or toggle any squad task"
                          : "Member mode: view squad queue and check off tasks assigned to you"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-card/70 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                      {[
                        { id: "all", label: "All Squad" },
                        { id: "mine", label: "Assigned to Me" },
                        { id: "high", label: "High Priority" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setTaskFilter(tab.id)}
                          className={`px-2.5 py-1 rounded-lg text-label-md transition-colors cursor-pointer ${taskFilter === tab.id
                              ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                              : "text-text-muted hover:text-text-main"
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <GhostBtn
                      type="button"
                      onClick={() =>
                        navigate(isManager ? "tasks" : "my-tasks")
                      }
                      text={isManager ? "Manage Tasks" : "My Tasks"}
                      icon={<FaArrowRight className="text-[10px]" />}
                      position="right"
                      className="text-label-md px-3 py-1.5"
                    />
                  </div>
                </div>

                <div className="divide-y divide-outline-variant/30 border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest/50">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => {
                      const canToggle = isManager || task.isMine;
                      return (
                        <div
                          key={task.id}
                          className={`p-3.5 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 table-row-kinetic ${task.priority === "High" && !task.completed
                              ? "priority-bar-left"
                              : ""
                            }`}
                        >
                          <div className="flex items-start sm:items-center gap-3 min-w-0">
                            <div className="relative flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                              {canToggle ? (
                                <>
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                      handleToggleTask(task)
                                    }
                                    aria-label={`Mark ${task.id} complete`}
                                    className="peer checkbox-kinetic"
                                  />
                                  <FaCheck className="absolute text-[9px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </>
                              ) : (
                                <span
                                  title="Assigned to another teammate"
                                  className="w-[18px] h-[18px] rounded bg-card dark:bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-text-placeholder"
                                >
                                  <FaLock className="text-[9px]" />
                                </span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-mono font-bold text-brand-orange">
                                  #{task.id}
                                </span>
                                <p
                                  className={`text-body-md font-semibold truncate ${task.completed
                                      ? "line-through text-text-muted"
                                      : "text-text-main"
                                    }`}
                                >
                                  {task.title}
                                </p>
                                {task.isMine && (
                                  <span className="px-1.5 py-0.2 rounded bg-brand-cyan/15 text-brand-cyan text-[10px] font-mono font-semibold">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-body-sm text-text-muted mt-0.5">
                                <span>{task.project}</span>
                                <span>•</span>
                                <span>Assigned to {task.assignee}</span>
                                <span>•</span>
                                <span className="font-mono text-[11px]">
                                  {task.due}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-7 sm:pl-0">
                            {task.priority === "High" && !task.completed && (
                              <span className="px-2 py-0.5 rounded bg-error/15 text-error border border-error/30 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                                <FaExclamationTriangle className="text-[9px]" />
                                High
                              </span>
                            )}

                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${getStatusBadgeClass(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>

                            <img
                              src={task.avatar}
                              alt={task.assignee}
                              title={task.assignee}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-outline-variant/50"
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-body-md text-text-muted">
                      No tasks match your current filter.
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (4 COLS) */}
            <aside className="xl:col-span-4 flex flex-col gap-6">
              {/* A. SPRINT VELOCITY TELEMETRY */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-brand-cyan text-sm" />
                    <h3 className="text-title-md font-bold text-text-main">
                      Sprint Velocity Trend
                    </h3>
                  </div>
                  <span className="badge-completed text-label-caps px-2 py-0.5 rounded">
                    +18.2% Avg
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2.5 items-end h-32 pt-4 px-2 bg-surface-container-lowest/70 rounded-xl border border-outline-variant/30 p-3">
                  {sprintVelocityBars.map((bar) => (
                    <div
                      key={bar.sprint}
                      className="flex flex-col items-center gap-1.5 h-full justify-end"
                    >
                      <span className="text-[10px] font-mono text-text-muted">
                        {bar.points}pt
                      </span>
                      <div
                        style={{ height: `${bar.pct}%` }}
                        className={`w-full rounded-t-md transition-all ${bar.active
                            ? "bg-gradient-to-t from-brand-orange-dark to-amber-400 shadow-orange-glow"
                            : "bg-brand-cyan/30 hover:bg-brand-cyan/50"
                          }`}
                      />
                      <span
                        className={`text-[11px] font-mono ${bar.active
                            ? "text-brand-orange font-bold"
                            : "text-text-muted"
                          }`}
                      >
                        {bar.sprint}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-body-sm text-text-muted pt-1">
                  <span>Commitment: 76 pts</span>
                  <span className="text-brand-emerald font-mono font-semibold flex items-center gap-1">
                    <FaCheckCircle className="text-xs" /> Zero Scope Creep
                  </span>
                </div>
              </section>

              {/* B. ACTIVE SQUAD ROSTER */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-brand-orange text-sm" />
                    <h3 className="text-title-md font-bold text-text-main">
                      Squad Roster
                    </h3>
                  </div>
                  {isManager && (
                    <button
                      type="button"
                      onClick={() => navigate("members")}
                      className="text-label-md text-brand-orange hover:underline cursor-pointer"
                    >
                      Manage
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  {squadRoster.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-card/50 dark:bg-surface-container-low border border-outline-variant/30"
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
                          <p className="text-label-lg text-text-main font-semibold truncate">
                            {member.name}
                          </p>
                          <p className="text-body-sm text-text-muted truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 text-[11px] font-mono font-semibold shrink-0">
                        {member.task}
                      </span>
                    </div>
                  ))}
                </div>

                <SecondaryBtn
                  type="button"
                  onClick={() => navigate("files")}
                  text="Workspace Shared Files"
                  icon={<FaRegFileAlt className="text-xs text-brand-cyan" />}
                  position="left"
                  className="w-full py-2.5 rounded-xl text-label-md"
                />
              </section>

              {/* C. LIVE TELEMETRY & ACTIVITY STREAM */}
              <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaHistory className="text-brand-orange text-sm" />
                    <h3 className="text-title-md font-bold text-text-main">
                      Live Activity Stream
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">
                    REAL-TIME
                  </span>
                </div>

                <div className="relative flex flex-col gap-4 pl-3">
                  <div className="absolute left-[15px] top-2.5 bottom-2.5 w-[1.5px] bg-outline-variant/40" />

                  {telemetryFeed.map((ev) => (
                    <div
                      key={ev.id}
                      className="relative flex items-start justify-between gap-2.5"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className={`relative z-10 mt-1.5 w-2 h-2 rounded-full shrink-0 ring-4 ring-panel dark:ring-surface-container ${ev.dotColor}`}
                        />
                        <p className="text-body-sm text-text-muted leading-snug">
                          <strong className="text-text-main font-semibold">
                            {ev.actor}
                          </strong>{" "}
                          {ev.action}{" "}
                          <span className="font-mono text-brand-cyan font-medium">
                            {ev.target}
                          </span>
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-text-muted shrink-0">
                        {ev.time}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </main>

        {/* =========================================================
                    4. MANAGER-ONLY MODAL: CREATE & ASSIGN TASK TO MEMBER
                   ========================================================= */}
        {isManager && isAssignModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAssignModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="w-full max-w-[50vw] bg-panel dark:bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaUserCheck className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-text-main font-bold">
                      Create &amp; Assign Task
                    </h3>
                    <p className="text-body-sm text-text-muted">
                      Manager-only dispatch to workspace members
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

              <form
                onSubmit={handleAssignTaskSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Task Title <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="taskTitle"
                    required
                    value={values.taskTitle}
                    onChange={handleChange}
                    placeholder="e.g. Implement OAuth2 PKCE token refresh flow"
                    className="input-kinetic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Target Project
                    </label>
                    <select
                      name="taskProject"
                      value={values.taskProject}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      {initialProjects.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Assign To Member
                    </label>
                    <select
                      name="taskAssignee"
                      value={values.taskAssignee}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      {squadRoster.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Priority Level
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

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Due / Target Window
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
                    text="Dispatch & Assign"
                    icon={<FaPlus className="text-xs" />}
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

export default WorkspaceOverview;