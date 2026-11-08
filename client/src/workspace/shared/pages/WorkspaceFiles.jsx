import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaDownload,
  FaFileCode,
  FaFilePdf,
  FaFileWord,
  FaFolderOpen,
  FaRegFileAlt,
  FaSearch,
  FaShieldAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { GhostBtn, PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const initialFiles = [
  {
    id: "file-1",
    name: "Kinetic_Horizon_Design_Tokens_v4.2.json",
    category: "Design System",
    size: "248 KB",
    type: "json",
    updated: "2 hours ago",
    uploader: "Sarah Kim",
  },
  {
    id: "file-2",
    name: "Plaid_Webhook_Retry_Architecture_RFC.pdf",
    category: "Architecture",
    size: "1.4 MB",
    type: "pdf",
    updated: "Yesterday",
    uploader: "David Lee",
  },
  {
    id: "file-3",
    name: "SAML_SSO_SCIM_Provisioning_Guide.md",
    category: "Security",
    size: "92 KB",
    type: "code",
    updated: "3 days ago",
    uploader: "Marcus Chen",
  },
  {
    id: "file-4",
    name: "Sprint_34_Velocity_Benchmark_Report.docx",
    category: "Sprints",
    size: "3.1 MB",
    type: "word",
    updated: "Dec 04, 2026",
    uploader: "Sarah Jenkins",
  },
  {
    id: "file-5",
    name: "Biometric_FaceID_Enclave_Fallback.json",
    category: "Mobile Core",
    size: "114 KB",
    type: "json",
    updated: "Dec 01, 2026",
    uploader: "Alex Chen",
  },
];

const WorkspaceFiles = () => {
  const { workspaceId = "12345" } = useParams();
  const [files, setFiles] = useState(initialFiles);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { values, handleChange } = useForm({
    fileName: "",
    fileCategory: "Architecture",
  });

  const getFileIcon = (type) => {
    if (type === "pdf") return <FaFilePdf className="text-red-500 text-lg" />;
    if (type === "code" || type === "json")
      return <FaFileCode className="text-brand-cyan text-lg" />;
    if (type === "word")
      return <FaFileWord className="text-blue-500 text-lg" />;
    return <FaRegFileAlt className="text-brand-orange text-lg" />;
  };

  const handleDeleteFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const trimmed = values.fileName.trim();
    if (!trimmed) return;

    const newFile = {
      id: `file-${Date.now()}`,
      name: trimmed.endsWith(".pdf") || trimmed.endsWith(".json") ? trimmed : `${trimmed}.pdf`,
      category: values.fileCategory,
      size: "1.2 MB",
      type: trimmed.endsWith(".json") ? "json" : "pdf",
      updated: "Just now",
      uploader: "Alex Chen",
    };

    setFiles((prev) => [newFile, ...prev]);
    handleChange({ target: { name: "fileName", value: "", type: "text" } });
    setIsUploadModalOpen(false);
  };

  const filteredFiles = files.filter((file) => {
    if (categoryFilter !== "all" && file.category !== categoryFilter)
      return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      file.name.toLowerCase().includes(q) ||
      file.category.toLowerCase().includes(q) ||
      file.uploader.toLowerCase().includes(q)
    );
  });

  const categories = ["all", "Design System", "Architecture", "Security", "Sprints", "Mobile Core"];

  return (
    <>
      <Helmet>
        <title>WorkPilot | Workspace Files (#{workspaceId})</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
          {/* Header Banner */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-level-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                <FaFolderOpen className="text-xl" />
              </div>
              <div>
                <h1 className="text-headline-md font-extrabold text-text-main">
                  Repository Files &amp; Documentation
                </h1>
                <p className="text-body-sm text-text-muted">
                  Access shared design tokens, RFC specifications, and compliance guides.
                </p>
              </div>
            </div>

            <PrimaryBtn
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              text="Upload Document"
              icon={<FaCloudUploadAlt className="text-base" />}
              position="left"
              className="px-5 py-3 rounded-xl text-label-lg shadow-orange-glow"
            />
          </section>

          {/* Search & Category Filter Bar */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl p-4 border border-outline-variant/40 shadow-level-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
            <div className="relative flex-1 flex items-center">
              <FaSearch className="absolute left-3.5 text-text-muted text-xs pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repository files by name, category, or uploader..."
                className="input-kinetic pl-9 bg-surface-container-lowest h-10"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-label-md whitespace-nowrap transition-all cursor-pointer ${categoryFilter === cat
                    ? "bg-panel dark:bg-surface-container-high text-brand-orange font-semibold shadow-xs"
                    : "text-text-muted hover:text-text-main"
                    }`}
                >
                  {cat === "all" ? "All Files" : cat}
                </button>
              ))}
            </div>
          </section>

          {/* Files Grid / List */}
          <section className="bg-panel dark:bg-surface-container rounded-2xl border border-outline-variant/40 shadow-level-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/40 bg-surface-container-low text-label-caps text-text-muted">
                    <th className="py-3.5 px-5">Document Name</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">File Size</th>
                    <th className="py-3.5 px-5">Updated</th>
                    <th className="py-3.5 px-5">Uploader</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/25 text-body-md">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <tr key={file.id} className="table-row-kinetic">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shrink-0">
                              {getFileIcon(file.type)}
                            </div>
                            <span
                              title={file.name}
                              className="font-semibold text-text-main truncate max-w-[15vw] cursor-default">
                              {file.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          <span className="px-2.5 py-0.5 rounded bg-card dark:bg-surface-container-highest text-xs font-mono text-text-muted">
                            {file.category}
                          </span>
                        </td>

                        <td className="py-4 px-5 font-mono text-xs text-text-muted">
                          {file.size}
                        </td>

                        <td className="py-4 px-5 font-mono text-xs text-text-muted">
                          {file.updated}
                        </td>

                        <td className="py-4 px-5 text-body-sm text-text-main">
                          {file.uploader}
                        </td>

                        <td className="py-4 px-5 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              title="Download document"
                              className="p-2 rounded-lg bg-card hover:bg-brand-orange hover:text-white text-text-main transition-colors cursor-pointer"
                            >
                              <FaDownload className="text-xs" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteFile(file.id)}
                              title="Delete file"
                              className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                            >
                              <FaTrashAlt className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-muted">
                        No repository documents found matching your query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* UPLOAD MODAL */}
        {isUploadModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsUploadModalOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <div className="relative w-full max-w-[40vw] bg-surface-container border border-outline-variant/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                    <FaCloudUploadAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-headline-sm font-bold text-on-surface">
                      Upload Repository File
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Attach RFC specifications or design token packages.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleUploadSubmit}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Document Filename <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="fileName"
                    required
                    value={values.fileName}
                    onChange={handleChange}
                    placeholder="e.g. Q4_Security_Audit_Report.pdf"
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-on-surface">
                    Document Category
                  </label>
                  <select
                    name="fileCategory"
                    value={values.fileCategory}
                    onChange={handleChange}
                    className="input-kinetic bg-surface-container-lowest"
                  >
                    {categories
                      .filter((c) => c !== "all")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="pt-4 mt-2 border-t border-outline-variant/30 flex items-center justify-end gap-2.5">
                  <GhostBtn
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    text="Cancel"
                    className="px-4 py-2.5 rounded-lg"
                  />
                  <PrimaryBtn
                    type="submit"
                    text="Upload File"
                    icon={<FaCloudUploadAlt className="text-xs" />}
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

export default WorkspaceFiles;