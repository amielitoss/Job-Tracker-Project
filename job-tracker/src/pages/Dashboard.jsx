import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import RecentApplication from "../components/RecentApplications";
import { Link } from "react-router-dom";
import { useState } from "react";

function Dashboard({
  applications,
  setApplications,
  updateApplication,
  editApplication,
  setEditApplication,
  darkMode,
  setDarkMode,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [viewApp, setViewApp] = useState(null);

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
    },
    {
      label: "Interviews",
      value: applications.filter((application) => {
        return application.status === "Interview";
      }).length,
    },
    {
      label: "Offers",
      value: applications.filter((application) => {
        return application.status === "Offer";
      }).length,
    },
    {
      label: "Rejected",
      value: applications.filter((application) => {
        return application.status === "Rejected";
      }).length,
    },
    {
      label: "Applied",
      value: applications.filter((application) => {
        return application.status === "Applied";
      }).length,
    },
  ];

  function addApplication(newApplication) {
    setApplications([...applications, newApplication]);
  }

  function cancelEdit() {
    setEditApplication(null);
  }

  function openForm() {
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setIsFormOpen(false);
    }, 200);
  }

  function editApplicationForm(application) {
    setEditApplication(application);
    openForm();
  }

  function updateAndClose(updatedApplication) {
    updateApplication(updatedApplication);
    closeForm();
  }

  function addAndClose(newApplication){
    addApplication(newApplication);
    closeForm();
  }

  const recentApplications = applications.slice(-5);

  return (
    <div className={darkMode ? "dashboard dark-mode" : "dashboard"}>
      <div className="main-content">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenForm={openForm}
        />
        <div className="stats-section">
          {stats.map((stat) => {
            return (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            );
          })}
        </div>
        <div className="applications-section">
          {isFormOpen && (
            <div
              className={isClosing ? "modal-overlay closing" : "modal-overlay"}
            >
              <div className="modal-content">
                <ApplicationForm
                  key={editApplication?.id ?? "new"}
                  onAddApplication={addAndClose}
                  onUpdateApplication={updateAndClose}
                  editApplication={editApplication}
                  onCancelEdit={cancelEdit}
                />

                <button onClick={closeForm}>✕</button>
              </div>
            </div>
          )}

          {viewApp && (
           <ApplicationDetailsModal
            application={viewApp}
            onClose={() => setViewApp(null)}
            />
          )}

          <h2>Recent Applications</h2>
          {recentApplications.map((application) => {
            return (
              <RecentApplication 
              key={application.id}
              application={application}
              onViewApplication={(application) => setViewApp(application)}
              onEditApplication={editApplicationForm}
              />
            );
          })}
          <Link className="view-all-link" to="/applications">
            View all applications
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
