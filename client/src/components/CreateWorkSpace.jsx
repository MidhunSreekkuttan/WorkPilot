import { FaBuilding, FaLink, FaSpinner, FaTimes } from "react-icons/fa";

const CreateWorkSpace = ({
    createStatus,
    handleCreateSubmit,
    paletteColors,
    selectedColor,
    setSelectedColor,
    selectedTeamSize,
    setSelectedTeamSize,
    setActiveModal,
    setWorkspaceDesc,
    setWorkspaceName,
    slugPreview,
    teamSizes,
    workspaceDesc,
    workspaceName,
    getInitials,
}) => {
    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) setActiveModal(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/80 backdrop-blur-md transition-opacity duration-200"
        >
            <div className="relative w-full max-w-[36rem] bg-surface-container border border-outline-variant/40 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                {/* Glow Corner */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl pointer-events-none" />

                {/* Modal Header */}
                <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-primary to-primary-container flex items-center justify-center text-on-primary-container shadow-md">
                            <FaBuilding className="text-lg" />
                        </div>
                        <div>
                            <h3 className="text-headline-md text-on-surface">
                                Create New Workspace
                            </h3>
                            <p className="text-body-sm text-on-surface-variant">
                                Deploy an operational environment in seconds.
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
                    onSubmit={handleCreateSubmit}
                    className="px-6 py-4 flex flex-col gap-4"
                >
                    {/* Name & Live Slug Preview */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="input-workspace-name"
                            className="text-label-md text-on-surface flex items-center justify-between"
                        >
                            <span>
                                Workspace Name <span className="text-primary">*</span>
                            </span>
                            <span className="text-label-caps text-on-surface-variant">
                                Visible to all members
                            </span>
                        </label>
                        <input
                            id="input-workspace-name"
                            type="text"
                            required
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            placeholder="e.g. Acme Engineering or Core Infrastructure"
                            className="w-full px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-body-md border border-outline-variant/40 placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container shadow-inner"
                        />
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-highest/60 rounded text-xs font-mono text-on-surface-variant">
                            <FaLink className="text-xs text-primary" />
                            <span>workpilot.com/</span>
                            <span className="text-primary font-semibold">
                                {slugPreview}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="input-workspace-desc"
                            className="text-label-md text-on-surface"
                        >
                            Description{" "}
                            <span className="text-on-surface-variant text-label-caps">
                                (Optional)
                            </span>
                        </label>
                        <textarea
                            id="input-workspace-desc"
                            rows={2}
                            value={workspaceDesc}
                            onChange={(e) => setWorkspaceDesc(e.target.value)}
                            placeholder="Briefly describe the purpose of this workspace..."
                            className="w-full px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface text-body-md border border-outline-variant/40 placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container resize-none shadow-inner"
                        />
                    </div>

                    {/* Avatar Icon Selector */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-label-md text-on-surface">
                            Workspace Avatar Palette
                        </span>
                        <div className="flex items-center gap-3">
                            <div
                                style={{ backgroundColor: selectedColor }}
                                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-headline-sm transition-colors"
                            >
                                {getInitials(workspaceName)}
                            </div>
                            <div className="flex items-center gap-2">
                                {paletteColors.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedColor(item.hex)}
                                        className={`w-6 h-6 rounded-full ${item.bgClass} ring-offset-2 ring-offset-surface-container focus:outline-none cursor-pointer transition-all ${selectedColor === item.hex
                                            ? "ring-2 ring-primary"
                                            : ""
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team Size Selector */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-label-md text-on-surface">
                            Estimated Team Scope
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                            {teamSizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedTeamSize(size)}
                                    className={`py-2 rounded-lg text-label-md text-center transition-colors cursor-pointer ${selectedTeamSize === size
                                        ? "bg-surface-container-high text-on-surface font-semibold"
                                        : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Modal Footer Actions */}
                    <div className="pt-4 mt-2 flex items-center justify-end gap-2 border-t border-outline-variant/20">
                        <button
                            type="button"
                            onClick={() => setActiveModal(null)}
                            className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createStatus !== "idle"}
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-primary to-primary-container text-on-primary-container text-headline-sm shadow-md hover:brightness-110 active:brightness-95 flex items-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                            {createStatus === "loading" && (
                                <FaSpinner className="text-base animate-spin" />
                            )}
                            <span>
                                {createStatus === "loading"
                                    ? "Provisioning..."
                                    : createStatus === "ready"
                                        ? "Workspace Ready!"
                                        : "Create Workspace"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkSpace;