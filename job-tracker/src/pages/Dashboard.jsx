import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import { useState } from "react";
import initialApplications from "../data/applications";

function Dashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [editApplication, setEditApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  function deleteApplication(id) {
    setApplications(
      applications.filter((application) => {
        return application.id !== id;
      }),
    );
  }

  function cancelEdit() {
    setEditApplication(null);
  }

  function updateApplication(updatedApplication) {
    setApplications(
      applications.map((application) => {
        if (application.id === updatedApplication.id) {
          return updatedApplication;
        } else {
          return application;
        }
      }),
    );
  }
  
  const normalizedSearch = searchTerm.toLowerCase();

  const filteredApplications = applications.filter((application) => {
    return (
      (application.company.toLowerCase().includes(normalizedSearch) ||  application.role.toLowerCase().includes(normalizedSearch)) 
      &&
      (statusFilter === "All" || application.status === statusFilter) 
    )

});

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
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
          <select name="statusFilter" id="statusFilter" value={statusFilter} onChange={(event) => {
            setStatusFilter(event.target.value)
          }}>
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          </div>
          <ApplicationForm
            key={editApplication?.id ?? "new"}
            onAddApplication={addApplication}
            onUpdateApplication={updateApplication}
            editApplication={editApplication}
            onCancelEdit={cancelEdit}
          />
          {filteredApplications.map((application) => {
            return (
              <ApplicationCard
                key={application.id}
                application={application}
                onDeleteApplication={deleteApplication}
                onEditApplication={setEditApplication}
                onUpdateApplication={updateApplication}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
