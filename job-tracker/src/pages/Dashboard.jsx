import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ApplicationForm from "../components/ApplicationForm";
import { useEffect, useState } from "react";

function Dashboard({ applications, setApplications, updateApplication, editApplication, setEditApplication}) {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) ?? false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode])

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

 

  return (
    <div className={darkMode ? "dashboard dark-mode" : "dashboard"}>
      <Sidebar />
      <div className="main-content">
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
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
            onUpdateApplication={updateApplication}
            editApplication={editApplication}
            onCancelEdit={cancelEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
