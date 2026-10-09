import { useState } from "react";

function Settings({ darkMode, setDarkMode, setApplications }) {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  return (
    <div className={darkMode ? "settings-page dark-mode" : "settings-page"}>
      <div className="settings-header">
        <h2>Settings</h2>
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
