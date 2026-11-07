import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaFolderOpen,
  FaLayerGroup,
  FaListUl,
  FaPlus,
  FaSearch,
  FaTasks,
  FaThLarge,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const initialProjectsData = [
  {
    id: "fintech-mobile",
    code: "PRJ-01",
    name: "Fintech Mobile Banking",
    description:
      "Biometric authentication, real-time ledger virtualized lists, and instant peer-to-peer transfers.",
    category: "Mobile Core",
    status: "On Track",
    statusClass: "badge-completed",
    progress: 82,
    barColor: "from-brand-orange to-amber-400",
    tasksDone: 45,
    tasksTotal: 55,
    myTasksCount: 2,
    dueDate: "Dec 12",
    branch: "feat/biometric-auth",
    lead: "Sarah Kim",
    members: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "api-gateway-v4",
    code: "PRJ-02",
    name: "Core API v4 Gateway",
    description:
      "High-throughput webhook retry queues, rate-limiting middleware, and zero-downtime edge routing.",
    category: "Infrastructure",
    status: "In Progress",
    statusClass: "badge-in-progress",
    progress: 64,
    barColor: "from-brand-cyan to-sky-400",
    tasksDone: 18,
    tasksTotal: 28,
    myTasksCount: 1,
    dueDate: "Dec 19",
    branch: "fix/webhook-retry-queue",
    lead: "David Lee",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "kinetic-design-system",
    code: "PRJ-03",
    name: "Kinetic Horizon UI Kit",
    description:
      "Unified light/dark elevation tokens, accessible kanban primitives, and micro-interaction specs.",
    category: "Design System",
    status: "In Review",
    statusClass: "badge-review",
    progress: 91,
    barColor: "from-brand-emerald to-teal-400",
    tasksDone: 31,
    tasksTotal: 34,
    myTasksCount: 1,
    dueDate: "Dec 08",
    branch: "release/tokens-v4.2",
    lead: "Alex Chen",
    members: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "saml-sso-engine",
    code: "PRJ-04",
    name: "Multi-Tenant SAML SSO",
    description:
      "Enterprise Okta/Azure AD handshakes, SCIM 2.0 automated user provisioning, and RBAC audit logs.",
    category: "Security",
    status: "In Progress",
    statusClass: "badge-in-progress",
    progress: 45,
    barColor: "from-brand-orange to-amber-400",
    tasksDone: 9,
    tasksTotal: 20,
    myTasksCount: 1,
    dueDate: "Jan 05",
    branch: "feat/scim-provisioning",
    lead: "Marcus Chen",
    members: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

const WorkspaceProjects = () => {
  const { workspaceId = "12345" } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const rawRole = outletContext.role || "member";
  const normalizedRole = Array.isArray(rawRole) ? rawRole[0] : rawRole;
  const isManager = normalizedRole === "manager";

  const [projects, setProjects] = useState(initialProjectsData);
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { values, handleChange } = useForm({
    projectName: "",
    projectCategory: "Infrastructure",
    projectBranch: "feat/new-module",
    projectLead: "Sarah Kim",
    projectDue: "Jan 18",
    projectDesc: "",
  });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsCreateModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!isManager) return;

    const trimmedName = values.projectName.trim();
    if (!trimmedName) return;

    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProject = {
      id: `${slug}-${Date.now().toString().slice(-3)}`,
      code: `PRJ-0${projects.length + 1}`,
      name: trimmedName,
      description:
        values.projectDesc.trim() ||
        " newly provisioned sprint repository and milestone board.",
      category: values.projectCategory,
      status: "In Progress",
      statusClass: "badge-in-progress",
      progress: 0,
      barColor: "from-brand-orange to-amber-400",
      tasksDone: 0,
      tasksTotal: 1,
      myTasksCount: 0,
      dueDate: values.projectDue || "TBD",
      branch: values.projectBranch || "main",
      lead: values.projectLead,
      members: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      ],
    };

    setProjects((prev) => [newProject, ...prev]);
    handleChange({ target: { name: "projectName", value: "", type: "text" } });
    handleChange({ target: { name: "projectDesc", value: "", type: "text" } });
    setIsCreateModalOpen(false);
  };

  const filteredProjects = projects.filter((proj) => {
    if (statusFilter !== "all" && proj.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      proj.name.toLowerCase().includes(q) ||
      proj.code.toLowerCase().includes(q) ||
      proj.category.toLowerCase().includes(q) ||
      proj.branch.toLowerCase().includes(q) ||
      proj.lead.toLowerCase().includes(q)
    );
  });

  const totalTasks = projects.reduce((acc, p) => acc + p.tasksTotal, 0);
  const completedTasks = projects.reduce((acc, p) => acc + p.tasksDone, 0);
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / (projects.length || 1)
  );

  return (
    <>
      <Helmet>
        <title>WorkPilot | Projects • {workspaceId}</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* =========================================================
                        1. PORTFOLIO HEADER & CONTROLS BAR
                       ========================================================= */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                  <FaFolderOpen className="text-lg" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-headline-sm sm:text-headline-md text-text-main font-bold tracking-tight">
                      Workspace Projects
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-card dark:bg-surface-container-highest border border-outline-variant/40 text-xs font-mono text-text-muted">
                      {projects.length} Repositories
                    </span>
                  </div>
                  <p className="text-body-md text-text-muted mt-0.5">
                    {isManager
                      ? "Provision project boards, track branch velocity, and manage deliverables across squads."
                      : "Browse active workspace projects, inspect linked Git branches, and open task boards."}
                  </p>
                </div>
              </div>

              {/* Search, View Switcher & Manager CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex items-center flex-1 sm:flex-initial min-w-[220px]">
                  <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search PRJ code, branch, or lead..."
                    className="input-kinetic pl-9 bg-surface-container-lowest h-10 text-body-sm"
                  />
                </div>

                {/* Grid / List Toggle */}
                <div className="inline-flex items-center bg-card/80 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === "grid"
                      ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                      : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === "list"
                      ? "bg-panel dark:bg-surface-container-high text-brand-orange shadow-xs"
                      : "text-text-muted hover:text-text-main"
                      }`}
                  >
                    <FaListUl />
                  </button>
                </div>

                {isManager && (
                  <PrimaryBtn
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    text="New Project"
                    icon={<FaPlus className="text-xs" />}
                    position="left"
                    className="px-4 py-2.5 rounded-xl text-label-md"
                  />
                )}
              </div>
            </div>

            {/* Portfolio Telemetry Strip + Filter Tabs */}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 bg-card/70 dark:bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/30 self-start">
                {["all", "On Track", "In Progress", "In Review"].map(
                  (tab) => {
                    const active = statusFilter === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setStatusFilter(tab)}
                        className={`px-3 py-1.5 rounded-lg text-label-md transition-colors cursor-pointer ${active
                          ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-main"
                          }`}
                      >
                        {tab === "all" ? "All Projects" : tab}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-muted font-mono">
                <span className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-brand-emerald text-xs" />
                  Avg Completion:{" "}
                  <strong className="text-text-main">{avgProgress}%</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FaTasks className="text-brand-orange text-xs" />
                  Tasks Burned:{" "}
                  <strong className="text-text-main">
                    {completedTasks}/{totalTasks}
                  </strong>
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
                        2. PROJECTS DIRECTORY (GRID OR LIST VIEW)
                       ========================================================= */}
          {filteredProjects.length === 0 ? (
            <div className="bg-panel dark:bg-surface-container rounded-2xl p-12 border border-outline-variant/40 text-center flex flex-col items-center gap-3">
              <FaLayerGroup className="text-3xl text-text-placeholder" />
              <h2 className="text-title-md font-bold text-text-main">
                No matching projects found
              </h2>
              <p className="text-body-sm text-text-muted">
                Try clearing your search filter or switching status tabs.
              </p>
              <SecondaryBtn
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                text="Reset Filters"
                className="mt-2 px-4 py-2 rounded-lg text-label-md"
              />
            </div>
          ) : viewMode === "grid" ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => navigate(project.id)}
                  className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 card-kinetic-interactive flex flex-col justify-between gap-5 cursor-pointer group"
                >
                  <div className="flex flex-col gap-3">
                    {/* Top Meta Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-card dark:bg-surface-container-highest border border-outline-variant/40 text-xs font-mono font-semibold text-brand-orange">
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

                    {/* Title & Description */}
                    <div>
                      <h2 className="text-headline-sm text-text-main font-bold group-hover:text-brand-orange transition-colors">
                        {project.name}
                      </h2>
                      <p className="text-body-sm text-text-muted mt-1 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Telemetry Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/30 text-[11px] font-mono text-brand-cyan">
                        <FaCodeBranch className="text-[10px]" />
                        {project.branch}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card/70 dark:bg-surface-container-low border border-outline-variant/30 text-[11px] font-mono text-text-muted">
                        Lead: <strong className="text-text-main">{project.lead}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress & Footer */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-text-muted">
                        {project.tasksDone} / {project.tasksTotal} tasks done
                      </span>
                      <span className="text-text-main font-bold">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-card dark:bg-surface-container-highest overflow-hidden">
                      <div
                        style={{ width: `${project.progress}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${project.barColor} transition-all duration-500`}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center -space-x-2">
                        {project.members.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Squad member"
                            className="w-7 h-7 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                          <FaClock className="text-[10px] text-brand-orange" />
                          {project.dueDate}
                        </span>
                        <span className="inline-flex items-center gap-1 text-label-md text-brand-orange font-semibold group-hover:translate-x-0.5 transition-transform">
                          Open <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            /* LIST VIEW */
            <section className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden divide-y divide-outline-variant/30">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(project.id)}
                  className="p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 table-row-kinetic cursor-pointer group"
                >
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-card dark:bg-surface-container-highest border border-outline-variant/40 text-xs font-mono font-bold text-brand-orange">
                        {project.code}
                      </span>
                      <h3 className="text-title-md font-bold text-text-main group-hover:text-brand-orange transition-colors truncate">
                        {project.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${project.statusClass}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-body-sm text-text-muted truncate">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-5 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-lowest border border-outline-variant/30 text-xs font-mono text-brand-cyan">
                      <FaCode className="text-[10px]" />
                      {project.branch}
                    </span>

                    <div className="w-36 flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-text-muted">
                          {project.tasksDone}/{project.tasksTotal}
                        </span>
                        <span className="text-text-main font-bold">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-card dark:bg-surface-container-highest overflow-hidden">
                        <div
                          style={{ width: `${project.progress}%` }}
                          className={`h-full rounded-full bg-gradient-to-r ${project.barColor}`}
                        />
                      </div>
                    </div>

                    <div className="flex -space-x-2">
                      {project.members.map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar}
                          alt="Member"
                          className="w-7 h-7 rounded-full object-cover ring-2 ring-panel dark:ring-surface-container"
                        />
                      ))}
                    </div>

                    <span className="text-xs font-mono text-text-muted flex items-center gap-1 min-w-[70px]">
                      <FaCalendarAlt className="text-[10px] text-brand-orange" />
                      {project.dueDate}
                    </span>

                    <FaArrowRight className="text-xs text-text-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>

        {/* =========================================================
                    3. MANAGER-ONLY MODAL: PROVISION NEW PROJECT
                   ========================================================= */}
        {isManager && isCreateModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsCreateModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="w-full max-w-[40vw] bg-panel dark:bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaFolderOpen className="text-sm" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm text-text-main font-bold">
                      Provision New Project
                    </h3>
                    <p className="text-body-sm text-text-muted">
                      Initialize a shared project board in Workspace #{workspaceId}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-text-muted hover:text-text-main p-1 cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Project Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    required
                    value={values.projectName}
                    onChange={handleChange}
                    placeholder="e.g. Zero-Trust Telemetry Engine"
                    className="input-kinetic"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Category
                    </label>
                    <select
                      name="projectCategory"
                      value={values.projectCategory}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Mobile Core">Mobile Core</option>
                      <option value="Design System">Design System</option>
                      <option value="Security">Security</option>
                      <option value="Frontend">Frontend</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Project Lead
                    </label>
                    <select
                      name="projectLead"
                      value={values.projectLead}
                      onChange={handleChange}
                      className="input-kinetic"
                    >
                      <option value="Sarah Kim">Sarah Kim</option>
                      <option value="David Lee">David Lee</option>
                      <option value="Alex Chen">Alex Chen</option>
                      <option value="Marcus Chen">Marcus Chen</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Default Git Branch
                    </label>
                    <input
                      type="text"
                      name="projectBranch"
                      value={values.projectBranch}
                      onChange={handleChange}
                      placeholder="feat/core-v1"
                      className="input-kinetic font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-text-main">
                      Target Release Date
                    </label>
                    <input
                      type="text"
                      name="projectDue"
                      value={values.projectDue}
                      onChange={handleChange}
                      placeholder="e.g. Jan 18"
                      className="input-kinetic"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Scope Summary
                  </label>
                  <textarea
                    rows={2}
                    name="projectDesc"
                    value={values.projectDesc}
                    onChange={handleChange}
                    placeholder="Describe key deliverables and architecture goals..."
                    className="w-full p-3 rounded-lg bg-canvas border border-outline-variant text-text-main text-body-md focus:border-brand-orange focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Create Project"
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

export default WorkspaceProjects;