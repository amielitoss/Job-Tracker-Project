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
          <ApplicationForm
            key={editApplication?.id ?? "new"}
            onAddApplication={addApplication}
            editApplication={editApplication}
          />
          {applications.map((application) => {
            return (
              <ApplicationCard
                key={application.id}
                application={application}
                onDeleteApplication={deleteApplication}
                onEditApplication={setEditApplication}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
