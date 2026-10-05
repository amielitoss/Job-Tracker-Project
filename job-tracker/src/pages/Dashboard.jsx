import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

function Dashboard() {
  const stats = [
    { label: "Total Applications", value: 27 },
    { label: "Applied", value: 12 },
    { label: "Interviews", value: 6 },
    { label: "Offers", value: 2 },
    { label: "Rejected", value: 7 },
  ];

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
      </div>
    </div>
  );
}

export default Dashboard;
