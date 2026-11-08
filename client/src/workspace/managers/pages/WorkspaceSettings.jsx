import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  FaCheck,
  FaCog,
  FaLock,
  FaPalette,
  FaSave,
  FaShieldAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { PrimaryBtn, SecondaryBtn } from "../../../configs/UseBtn";
import useForm from "../../../coustom-hooks/UseForm";

const WorkspaceSettings = () => {
  const { workspaceId = "12345" } = useParams();
  const [saved, setSaved] = useState(false);
  const [accentColor, setAccentColor] = useState("#FF6A00");

  const { values, handleChange } = useForm({
    workspaceName: "Dev Squad",
    workspaceSlug: "dev-squad",
    workspaceDescription: "Software Development Team & Core Engineering Squad",
    ssoEnforced: true,
    requirePrReview: true,
  });

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>WorkPilot | Workspace Settings (#{workspaceId})</title>
      </Helmet>

      <div className="min-h-[calc(100vh-7.5rem)] surface-level-0 text-text-main selection:bg-brand-orange selection:text-white">
        <main className="max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6">
          {/* Header */}
          <div className="bg-panel dark:bg-surface-container rounded-2xl p-6 border border-outline-variant/40 shadow-level-2 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
              <FaCog className="text-xl" />
            </div>
            <div>
              <h1 className="text-headline-md font-extrabold text-text-main">
                Workspace Governance &amp; Settings
              </h1>
              <p className="text-body-sm text-text-muted">
                Configure tenant metadata, security compliance, and accent palette tokens.
              </p>
            </div>
          </div>

          <form onSubmit={handleSettingsSubmit} className="flex flex-col gap-6">
            {/* General Information Card */}
            <div className="bg-panel dark:bg-surface-container rounded-2xl p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
              <h2 className="text-headline-sm font-bold text-text-main pb-3 border-b border-outline-variant/30">
                General Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    name="workspaceName"
                    value={values.workspaceName}
                    onChange={handleChange}
                    className="input-kinetic bg-surface-container-lowest"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md text-text-main">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    name="workspaceSlug"
                    value={values.workspaceSlug}
                    onChange={handleChange}
                    className="input-kinetic bg-surface-container-lowest font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-text-main">
                  Description
                </label>
                <textarea
                  rows={2}
                  name="workspaceDescription"
                  value={values.workspaceDescription}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-text-main text-body-md focus:outline-none focus:border-brand-orange resize-none"
                />
              </div>
            </div>

            {/* Security & Compliance Card */}
            <div className="bg-panel dark:bg-surface-container rounded-2xl p-6 border border-outline-variant/40 shadow-level-2 flex flex-col gap-4">
              <h2 className="text-headline-sm font-bold text-text-main pb-3 border-b border-outline-variant/30 flex items-center gap-2">
                <FaShieldAlt className="text-brand-orange text-sm" />
                Security &amp; Access Governance
              </h2>

              <div className="flex flex-col gap-3.5">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                  <div>
                    <p className="text-title-md font-semibold text-text-main">
                      Enforce SAML SSO
                    </p>
                    <p className="text-body-sm text-text-muted">
                      Require corporate Okta or Azure AD identity validation for all members.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="ssoEnforced"
                    checked={values.ssoEnforced}
                    onChange={handleChange}
                    className="checkbox-kinetic"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                  <div>
                    <p className="text-title-md font-semibold text-text-main">
                      Mandatory PR Review Check
                    </p>
                    <p className="text-body-sm text-text-muted">
                      Block task status advancement until linked GitHub PR is approved.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="requirePrReview"
                    checked={values.requirePrReview}
                    onChange={handleChange}
                    className="checkbox-kinetic"
                  />
                </label>
              </div>
            </div>

            {/* Save Button Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <PrimaryBtn
                type="submit"
                text={saved ? "Settings Saved!" : "Save Configuration"}
                icon={saved && <FaCheck className="text-xs" />}
                position="left"
                className="px-6 py-3 rounded-xl text-label-lg shadow-orange-glow"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default WorkspaceSettings;