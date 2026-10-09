import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";
import RecentApplication from "../components/RecentApplications";
import StatusChart from "../components/StatusChart";
import ApplicationsChart from "../components/ApplicationsChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, Send, CalendarCheck, BadgeCheck, CircleX } from "lucide-react";

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

  useEffect(() => {
    if (isFormOpen || editApplication) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen, editApplication]);

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: BriefcaseBusiness,
      type: "total"
    },
    {
      label: "Interviews",
      value: applications.filter((application) => {
        return application.status === "Interview";
      }).length,
      icon: CalendarCheck,
      type: "interview"
    },
    {
      label: "Offers",
      value: applications.filter((application) => {
        return application.status === "Offer";
      }).length,
      icon: BadgeCheck,
      type: "offer"
    },
    {
      label: "Rejected",
      value: applications.filter((application) => {
        return application.status === "Rejected";
      }).length,
      icon: CircleX,
      type: "rejected"
    },
    {
      label: "Applied",
      value: applications.filter((application) => {
        return application.status === "Applied";
      }).length,
      icon: Send,
      type: "applied"
    },
  ];

  function addApplication(newApplication) {
    setApplications([...applications, newApplication]);
  }

  function openForm() {
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setIsFormOpen(false);
      setEditApplication(null);
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

  function addAndClose(newApplication) {
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
                icon={stat.icon}
                type={stat.type}
              />
            );
          })}
        </div>

        <div className="charts-section">
          <ApplicationsChart applications={applications} />
          <StatusChart applications={applications} />
        </div>

        <div className="applications-section">
          {(isFormOpen || editApplication) && (
            <div
              className={isClosing ? "modal-overlay closing" : "modal-overlay"}
            >
              <div className="modal-content" role="dialog" aria-modal="true">
                <h2>
                  {editApplication ? "Edit Application" : "Add Application"}
                </h2>
                <ApplicationForm
                  key={editApplication?.id ?? "new"}
                  onAddApplication={addAndClose}
                  onUpdateApplication={updateAndClose}
                  editApplication={editApplication}
                  onCancelEdit={closeForm}
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
