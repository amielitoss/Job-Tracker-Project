import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal";

function Applications({
  applications,
  deleteApplication,
  updateApplication,
  setEditApplication,
  darkMode,
  setDarkMode,
}) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewApp, setViewApp] = useState(null);

  const normalizedSearch = searchTerm.toLowerCase();

  const filteredApplications = applications.filter((application) => {
    return (
      (application.company.toLowerCase().includes(normalizedSearch) ||
        application.role.toLowerCase().includes(normalizedSearch)) &&
      (statusFilter === "All" || application.status === statusFilter)
    );
  });

  return (
    <div
      className={darkMode ? "applications-page dark-mode" : "applications-page"}
    >
      <div className="applications-header">
        <h2>All Applications</h2>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="application-filters">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <label htmlFor="statusFilter">Status</label>
        <select
          name="statusFilter"
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {viewApp && (
        <ApplicationDetailsModal
          application={viewApp}
          onClose={() => setViewApp(null)}
        />
      )}

      {applications.length === 0 ? (
        <p className="empty-state">No Applications recorded.</p>
      ) : filteredApplications.length === 0 ? (
        <p className="empty-state">No applications match...</p>
      ) : (
        filteredApplications.map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              onDeleteApplication={deleteApplication}
              onUpdateApplication={updateApplication}
              onEditApplication={(application) => {
                setEditApplication(application);
                navigate("/");
              }}
              onViewApplication={(application) => setViewApp(application)}
            />
          );
        })
      )}
    </div>
  );
}

export default Applications;
