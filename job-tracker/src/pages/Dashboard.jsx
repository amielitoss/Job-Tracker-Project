import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";
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
  const [isClosing, setIsClosing] =  useState(false);

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
    setIsClosing(false)
    setIsFormOpen(false)
  }, 2000);

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
            <div className={isClosing ? "modal-overlay closing" : "modal-overlay"} onClick={isClosing}>
              <div className="modal-content">
                <ApplicationForm
                  key={editApplication?.id ?? "new"}
                  onAddApplication={addApplication}
                  onUpdateApplication={updateApplication}
                  editApplication={editApplication}
                  onCancelEdit={cancelEdit}
                />

                <button onClick={closeForm}>✕</button>
              </div>
            </div>
          )}

          <h2>Recent Applications</h2>
          {recentApplications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
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
