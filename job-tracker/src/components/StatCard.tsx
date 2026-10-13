import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  type: "total" | "interview" | "offer" | "rejected" | "applied";
};

function StatCard({ label, value, icon, type }: StatCardProps) {
  const Icon = icon;
  return (
    <div className="card-wrapper">
      <div className="stat-card-header">
        <div className={`stat-icon stat-icon-${type}`}>
            <Icon size={20} />
        </div>
        <p>{label}</p>
      </div>

      <span>{value}</span>
    </div>
  );
}

export default StatCard;
