import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBolt,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaCodeBranch,
  FaColumns,
  FaCopy,
  FaExclamationTriangle,
  FaFilter,
  FaFolderOpen,
  FaListUl,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const initialMemberTasks = [
  {
    id: "WP-509",
    title: "Audit dark-mode contrast tokens on Kanban cards",
    description:
      "Verify WCAG AA contrast ratios across surface-container elevation tiers and hover states.",
    projectId: "kinetic-design-system",
    projectName: "Kinetic Horizon UI Kit",
    projectCode: "PRJ-03",
    priority: "High",
    status: "In Progress",
    dueDate: "Today, 6:00 PM",
    prRef: "PR #151",
    branch: "chore/a11y-dark-tokens",
    checklist: [
      {
        id: "c1",
        label: "Verify surface-level-2 border contrast in dark mode",
        done: true,
      },
      {
        id: "c2",
        label: "Test orange focus-ring visibility on input-kinetic",
        done: true,
      },
      {
        id: "c3",
        label: "Update badge-review background opacity token",
        done: false,
      },
      {
        id: "c4",
        label: "Run visual regression snapshot suite",
        done: false,
      },
    ],
  },
  {
    id: "WP-518",
    title: "Wire role-based route guards for workspace views",
    description:
      "Enforce manager and member route boundaries across workspace navigation outlets.",
    projectId: "saml-sso-engine",
    projectName: "Multi-Tenant SAML SSO",
    projectCode: "PRJ-04",
    priority: "High",
    status: "In Review",
    dueDate: "Tomorrow",
    prRef: "PR #153",
    branch: "feat/rbac-route-guards",
    checklist: [
      {
        id: "c1",
        label: "Configure ProtectedRoute outlet context check",
        done: true,
      },
      {
        id: "c2",
        label: "Add fallback redirect for unauthorized roles",
        done: true,
      },
      {
        id: "c3",
        label: "Verify lazy suspense loading screen transitions",
        done: true,
      },
    ],
  },
  {
    id: "WP-524",
    title: "Optimize virtualized transaction list memory footprint",
    description:
      "Reduce DOM node allocation during rapid inertial scrolling on mobile viewports.",
    projectId: "fintech-mobile",
    projectName: "Fintech Mobile Banking",
    projectCode: "PRJ-01",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Fri, Dec 12",
    prRef: "PR #156",
    branch: "perf/virtual-list-pool",
    checklist: [
      {
        id: "c1",
        label: "Profile React 19 render commits in DevTools",
        done: true,
      },
      {
        id: "c2",
        label: "Memoize row item renderer and status badges",
        done: false,
      },
      {
        id: "c3",
        label: "Benchmark 60fps scroll on low-tier Android",
        done: false,
      },
    ],
  },
  {
    id: "WP-477",
    title: "Add exponential backoff to webhook client SDK",
    description:
      "Prevent retry storms when downstream banking endpoints return HTTP 429.",
    projectId: "api-gateway-v4",
    projectName: "Core API v4 Gateway",
    projectCode: "PRJ-02",
    priority: "Low",
    status: "Completed",
    dueDate: "Completed",
    prRef: "PR #142",
    branch: "fix/sdk-backoff-jitter",
    checklist: [
      { id: "c1", label: "Implement full-jitter backoff formula", done: true },
      { id: "c2", label: "Add unit tests for 429 & 503 responses", done: true },
    ],
  },
];

const statusColumns = ["In Progress", "In Review", "Completed"];

const MyTasks = () => {
  const { workspaceId = "12345" } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(initialMemberTasks);
  const [viewMode, setViewMode] = useState("list"); // "list" | "kanban"
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedBranchId, setCopiedBranchId] = useState(null);
  const [activeTaskModal, setActiveTaskModal] = useState(null);

  const { values, handleChange } = useForm({
    newSubtask: "",
    prRef: "",
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveTaskModal(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Toggle individual checklist item
  const handleToggleSubtask = (taskId, checklistId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const updatedChecklist = task.checklist.map((item) =>
          item.id === checklistId ? { ...item, done: !item.done } : item
        );
        return { ...task, checklist: updatedChecklist };
      })
    );
  };

  // Cycle task status forward
  const handleCycleStatus = (taskId) => {
    const nextStatusMap = {
      "In Progress": "In Review",
      "In Review": "Completed",
      Completed: "In Progress",
    };

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus = nextStatusMap[task.status] || "In Progress";
        return {
          ...task,
          status: nextStatus,
          checklist:
            nextStatus === "Completed"
              ? task.checklist.map((c) => ({ ...c, done: true }))
              : task.checklist,
        };
      })
    );
  };

  // Copy git branch name
  const handleCopyBranch = async (taskId, branchName) => {
    try {
      await navigator.clipboard.writeText(branchName);
      setCopiedBranchId(taskId);
      setTimeout(() => setCopiedBranchId(null), 1600);
    } catch {
      // Fallback if clipboard permissions are denied
    }
  };

  // Open modal to add subtask or update PR
  const handleOpenTaskModal = (task) => {
    handleChange({
      target: { name: "prRef", value: task.prRef, type: "text" },
    });
    handleChange({
      target: { name: "newSubtask", value: "", type: "text" },
    });
    setActiveTaskModal(task);
  };

  // Save new subtask & PR reference
  const handleUpdateTaskSubmit = (e) => {
    e.preventDefault();
    if (!activeTaskModal) return;

    const trimmedSubtask = values.newSubtask.trim();
    const trimmedPr = values.prRef.trim();

    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== activeTaskModal.id) return task;

        const updatedChecklist = trimmedSubtask
          ? [
            ...task.checklist,
            {
              id: `c-${Date.now()}`,
              label: trimmedSubtask,
              done: false,
            },
          ]
          : task.checklist;

        return {
          ...task,
          prRef: trimmedPr || task.prRef,
          checklist: updatedChecklist,
        };
      })
    );

    setActiveTaskModal(null);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
      return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(q) ||
      task.id.toLowerCase().includes(q) ||
      task.projectName.toLowerCase().includes(q) ||
      task.branch.toLowerCase().includes(q)
    );
  });

  // Personal Telemetry Calculations
  const totalAssigned = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const inReviewCount = tasks.filter((t) => t.status === "In Review").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  const totalSubtasks = tasks.reduce((acc, t) => acc + t.checklist.length, 0);
  const completedSubtasks = tasks.reduce(
    (acc, t) => acc + t.checklist.filter((c) => c.done).length,
    0
  );
  const checklistVelocity = Math.round(
    (completedSubtasks / (totalSubtasks || 1)) * 100
  );

  const getStatusBadge = (status) => {
    if (status === "Completed") return "badge-completed";
    if (status === "In Review") return "badge-review";
    return "badge-in-progress";
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High")
      return "bg-error/15 text-error border border-error/30";
    if (priority === "Medium")
      return "bg-brand-orange/15 text-brand-orange border border-brand-orange/30";
    return "bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30";
  };

  const getNextActionLabel = (status) => {
    if (status === "In Progress") return "Submit for PR Review →";
    if (status === "In Review") return "Mark Completed ✓";
    return "Reopen Task ↺";
  };

  return (
    <>
      <Helmet>
        <title>WorkPilot | My Tasks (Workspace #{workspaceId})</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* =========================================================
              1. PERSONAL TELEMETRY & SPRINT VELOCITY HEADER
             ========================================================= */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0 shadow-xs">
                  <FaClipboardList className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-label-caps font-mono">
                      <FaBolt className="text-[10px]" />
                      PERSONAL EXECUTION CONSOLE
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      ENGINEER: ALEX CHEN
                    </span>
                  </div>
                  <h1 className="text-headline-md sm:text-headline-lg font-extrabold text-text-main tracking-tight mt-1">
                    My Assigned Tasks
                  </h1>
                  <p className="text-body-md text-text-muted">
                    Execute sprint deliverables, check off technical subtasks,
                    and push branches for PR review.
                  </p>
                </div>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
                <div className="inline-flex items-center bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-label-md transition-all cursor-pointer ${viewMode === "list"
                        ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                        : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaListUl className="text-xs" />
                    <span>Focus Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("kanban")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-label-md transition-all cursor-pointer ${viewMode === "kanban"
                        ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                        : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaColumns className="text-xs" />
                    <span>Kanban</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Card KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 border-t border-outline-variant/30">
              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    ASSIGNED TO ME
                  </span>
                  <div className="text-2xl font-extrabold font-display text-text-main mt-1">
                    {totalAssigned} Tasks
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center">
                  <FaClipboardList className="text-base" />
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-label-caps text-text-muted">
                    ACTIVE CODING
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
                    SUBTASK VELOCITY ({checklistVelocity}%)
                  </span>
                  <div className="text-2xl font-extrabold font-display text-brand-emerald mt-1">
                    {completedSubtasks}/{totalSubtasks}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-emerald/15 border border-brand-emerald/30 text-brand-emerald flex items-center justify-center">
                  <FaCheckCircle className="text-base" />
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================
              2. SEARCH & FILTER BAR
             ========================================================= */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5">
            <div className="relative flex-1 flex items-center">
              <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search my tasks by ID (#WP-509), title, project, or branch..."
                className="input-kinetic pl-9 bg-surface-container-lowest h-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 text-label-md text-text-muted mr-1">
                <FaFilter className="text-xs text-brand-orange" />
                <span>Filter:</span>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40">
                {[
                  { id: "all", label: "All", count: totalAssigned },
                  { id: "In Progress", label: "In Progress", count: inProgressCount },
                  { id: "In Review", label: "In Review", count: inReviewCount },
                  { id: "Completed", label: "Completed", count: completedCount },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${statusFilter === tab.id
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

              {/* Priority Select */}
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
                searchQuery.trim() !== "") && (
                  <GhostBtn
                    type="button"
                    onClick={() => {
                      setStatusFilter("all");
                      setPriorityFilter("all");
                      setSearchQuery("");
                    }}
                    text="Reset"
                    className="text-xs px-3 py-2 rounded-lg"
                  />
                )}
            </div>
          </section>

          {/* =========================================================
              3. TASK CARDS (FOCUS LIST VIEW OR KANBAN VIEW)
             ========================================================= */}
          {viewMode === "list" ? (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const doneCount = task.checklist.filter((c) => c.done).length;
                  const totalCount = task.checklist.length;
                  const pct = Math.round(
                    (doneCount / (totalCount || 1)) * 100
                  );

                  return (
                    <div
                      key={task.id}
                      className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-5"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Top Metadata Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-brand-orange/15 border border-brand-orange/30 text-brand-orange font-mono text-xs font-bold">
                              #{task.id}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${getPriorityBadge(
                                task.priority
                              )}`}
                            >
                              {task.priority === "High" && (
                                <FaExclamationTriangle className="text-[10px]" />
                              )}
                              {task.priority}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/work-space/${workspaceId}/projects/${task.projectId}`
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-card dark:bg-surface-container-highest text-xs text-text-muted hover:text-brand-orange transition-colors cursor-pointer"
                            >
                              <FaFolderOpen className="text-[10px] text-brand-orange" />
                              <span>{task.projectName}</span>
                            </button>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${getStatusBadge(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h2 className="text-headline-sm font-bold text-text-main leading-snug">
                            {task.title}
                          </h2>
                          <p className="text-body-sm text-text-muted mt-1">
                            {task.description}
                          </p>
                        </div>

                        {/* Git Branch & Due Date Telemetry Strip */}
                        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs font-mono">
                          <div className="flex items-center gap-2 min-w-0">
                            <FaCodeBranch className="text-brand-cyan shrink-0" />
                            <span className="text-brand-cyan truncate">
                              {task.branch}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyBranch(task.id, task.branch)
                              }
                              title="Copy branch name"
                              className="text-text-muted hover:text-text-main p-1 rounded transition-colors cursor-pointer"
                            >
                              {copiedBranchId === task.id ? (
                                <FaCheck className="text-brand-emerald text-[11px]" />
                              ) : (
                                <FaCopy className="text-[11px]" />
                              )}
                            </button>
                            <span className="text-text-placeholder">|</span>
                            <span className="text-text-main font-semibold">
                              {task.prRef}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 text-text-muted">
                            <FaCalendarAlt className="text-brand-orange text-[11px]" />
                            {task.dueDate}
                          </span>
                        </div>

                        {/* Interactive Subtask Checklist */}
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-label-caps text-text-muted font-mono">
                              TECHNICAL SUBTASKS ({doneCount}/{totalCount})
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-brand-orange">
                                {pct}%
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenTaskModal(task)}
                                className="inline-flex items-center gap-1 text-xs font-mono text-brand-cyan hover:underline cursor-pointer"
                              >
                                <FaPlus className="text-[9px]" />
                                <span>Add Item</span>
                              </button>
                            </div>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                            <div
                              style={{ width: `${pct}%` }}
                              className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-emerald transition-all duration-300"
                            />
                          </div>

                          <div className="flex flex-col gap-2 pt-1">
                            {task.checklist.map((item) => (
                              <label
                                key={item.id}
                                className="flex items-start gap-2.5 text-body-sm cursor-pointer select-none group"
                              >
                                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={item.done}
                                    onChange={() =>
                                      handleToggleSubtask(task.id, item.id)
                                    }
                                    className="peer checkbox-kinetic"
                                  />
                                  <FaCheck className="absolute text-[9px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </div>
                                <span
                                  className={`transition-colors ${item.done
                                      ? "line-through text-text-muted"
                                      : "text-text-main group-hover:text-brand-orange"
                                    }`}
                                >
                                  {item.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-3">
                        <SecondaryBtn
                          type="button"
                          onClick={() => handleOpenTaskModal(task)}
                          text="Update PR / Subtasks"
                          icon={<FaCodeBranch className="text-xs text-brand-cyan" />}
                          position="left"
                          className="px-4 py-2 rounded-xl text-xs"
                        />

                        <PrimaryBtn
                          type="button"
                          onClick={() => handleCycleStatus(task.id)}
                          text={getNextActionLabel(task.status)}
                          className="px-4 py-2 rounded-xl text-xs"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="lg:col-span-2 bg-panel dark:bg-surface-container rounded-2xl p-12 border border-outline-variant/40 text-center flex flex-col items-center gap-3">
                  <FaClipboardList className="text-3xl text-text-muted" />
                  <h3 className="text-title-md font-bold text-text-main">
                    No assigned tasks match your filter
                  </h3>
                  <p className="text-body-sm text-text-muted max-w-md">
                    Try clearing your search query or switching status tabs to
                    view all sprint deliverables assigned to you.
                  </p>
                </div>
              )}
            </section>
          ) : (
            /* =========================================================
               KANBAN BOARD VIEW
               ========================================================= */
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {statusColumns.map((colStatus) => {
                const colTasks = filteredTasks.filter(
                  (t) => t.status === colStatus
                );

                return (
                  <div
                    key={colStatus}
                    className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4 min-h-[420px]"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${colStatus === "Completed"
                              ? "bg-brand-emerald"
                              : colStatus === "In Review"
                                ? "bg-brand-cyan"
                                : "bg-brand-orange"
                            }`}
                        />
                        <h2 className="text-title-md font-bold text-text-main">
                          {colStatus}
                        </h2>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-card dark:bg-surface-container-highest text-xs font-mono font-bold text-text-muted">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3.5">
                      {colTasks.length > 0 ? (
                        colTasks.map((task) => {
                          const doneCount = task.checklist.filter(
                            (c) => c.done
                          ).length;
                          const pct = Math.round(
                            (doneCount / (task.checklist.length || 1)) * 100
                          );

                          return (
                            <div
                              key={task.id}
                              onClick={() => handleOpenTaskModal(task)}
                              className="card-kinetic card-kinetic-interactive bg-card/60 dark:bg-surface-container-low flex flex-col gap-3 cursor-pointer"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getPriorityBadge(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                  <span className="text-xs font-mono font-semibold text-text-muted">
                                    #{task.id}
                                  </span>
                                </div>
                                <span className="text-[11px] font-mono text-brand-cyan bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/30">
                                  {task.prRef}
                                </span>
                              </div>

                              <h3 className="text-title-md font-bold text-text-main leading-snug">
                                {task.title}
                              </h3>

                              <div className="bg-panel/80 dark:bg-surface-container p-2.5 rounded-lg border border-outline-variant/30 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-text-muted truncate">
                                    {task.projectName}
                                  </span>
                                  <span className="font-mono font-bold text-text-main">
                                    {doneCount}/{task.checklist.length}
                                  </span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                                  <div
                                    style={{ width: `${pct}%` }}
                                    className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-emerald transition-all duration-300"
                                  />
                                </div>
                              </div>

                              <div className="pt-2 border-t border-outline-variant/25 flex items-center justify-between gap-2">
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
                                  className="px-2.5 py-1 rounded bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white text-[10px] font-mono font-bold transition-colors cursor-pointer"
                                >
                                  Advance →
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-10 px-4 text-center rounded-xl border border-dashed border-outline-variant/40 text-xs text-text-muted">
                          No tasks in {colStatus}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </main>

        {/* =========================================================
            4. ADD SUBTASK & UPDATE PR TELEMETRY MODAL
           ========================================================= */}
        {activeTaskModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveTaskModal(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaCodeBranch className="text-base" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-brand-orange">
                        #{activeTaskModal.id}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        • {activeTaskModal.projectName}
                      </span>
                    </div>
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      Update Task Telemetry
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTaskModal(null)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleUpdateTaskSubmit}
                className="p-6 flex flex-col gap-4"
              >
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <p className="text-title-md font-bold text-on-surface">
                    {activeTaskModal.title}
                  </p>
                  <p className="text-xs font-mono text-brand-cyan mt-1">
                    Branch: {activeTaskModal.branch}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Add New Checklist Subtask
                  </label>
                  <input
                    type="text"
                    name="newSubtask"
                    value={values.newSubtask}
                    onChange={handleChange}
                    placeholder="e.g. Write integration test for edge case"
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Linked Pull Request Reference
                  </label>
                  <input
                    type="text"
                    name="prRef"
                    value={values.prRef}
                    onChange={handleChange}
                    placeholder="e.g. PR #158"
                    className="input-kinetic bg-surface-container-lowest font-mono"
                  />
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <GhostBtn
                    type="button"
                    onClick={() => setActiveTaskModal(null)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Save Changes"
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

export default MyTasks;