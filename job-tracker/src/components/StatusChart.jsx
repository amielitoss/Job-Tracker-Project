import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

function StatusChart({ applications }) {
  const data = [
    {
      name: "Applied",
      value: applications.filter((application) => {
        return application.status === "Applied";
      }).length,
      fill: "#4F46E5",
    },
    {
      name: "Interview",
      value: applications.filter((application) => {
        return application.status === "Interview";
      }).length,
      fill: "#D9A30A",
    },
    {
      name: "Offer",
      value: applications.filter((application) => {
        return application.status === "Offer";
      }).length,
      fill: "#22C55E",
    },
    {
      name: "Rejected",
      value: applications.filter((application) => {
        return application.status === "Rejected";
      }).length,
      fill: "#DC2626",
    },
  ];

  return (
  <div className="status-chart">
    <h2>Status Distribution</h2>

    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
}

export default StatusChart;
