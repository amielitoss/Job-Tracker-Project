import { useState, useEffect } from "react";
import type { Application, CurrentUser } from "../types/types";

type SettingsProps = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  setApplications: (application: Application[]) => void;
  currentUser: CurrentUser;
};

function Settings({
  darkMode,
  setDarkMode,
  setApplications,
  currentUser,
}: SettingsProps) {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  useEffect(() => {
    if (!isClearModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsClearModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClearModalOpen]);

  useEffect(() => {
    if (isClearModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isClearModalOpen]);

  return (
    <div className={darkMode ? "settings-page dark-mode" : "settings-page"}>
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-card account-card">
        <h3>Account</h3>

        <div className="account-summary">
          <div className="account-avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          <div className="account-info">
            <strong>{currentUser.name}</strong>
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>Appearance</h3>

        <div className="setting-row">
          <div>
            <p>Theme</p>
            <span>Choose between light and dark mode</span>
          </div>

          <button
            type="button"
            className={darkMode ? "theme-switch active" : "theme-switch"}
            onClick={() => setDarkMode(!darkMode)}
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
          >
            <span className="theme-switch-knob"></span>
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>Data</h3>

        <div className="setting-row">
          <div>
            <p>Clear application data</p>
            <span>Remove all saved applications from JobTrackly</span>
          </div>

          <button
            className="danger-button"
            onClick={() => setIsClearModalOpen(true)}
          >
            Clear Applications
          </button>
        </div>
      </div>

      {isClearModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" role="dialog" aria-modal="true">
            <h3>Clear all applications?</h3>
            <p>This will remove all saved applications from JobTrackly.</p>

            <div className="modal-actions">
              <button type="button" onClick={() => setIsClearModalOpen(false)}>
                Cancel
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={() => {
                  setApplications([]);
                  setIsClearModalOpen(false);
                }}
              >
                Clear Applications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
