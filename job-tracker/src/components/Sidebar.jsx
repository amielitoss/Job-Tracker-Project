import { NavLink } from "react-router-dom";
import logo from "../assets/jobtrackly-logo.webp";
import icon from "../assets/jobtrackly-icon.webp";
import { LayoutDashboard,BriefcaseBusiness,CalendarCheck, Settings } from "lucide-react";

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand-link">
        <img src={logo} alt="JobTrackly" className="brand-logo" />
        <img src={icon} alt="" className="brand-icon" />
      </NavLink>
      <nav>
        <NavLink to="/" onClick={onNavigate}>
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
        </NavLink>

        <NavLink to="/applications" onClick={onNavigate}>
        <BriefcaseBusiness size={18} />
        <span>Applications</span>
        </NavLink>

        <NavLink to="/interviews" onClick={onNavigate}>
        <CalendarCheck size={18} />
        <span>Interviews</span>
        </NavLink>

        <NavLink to="/settings" onClick={onNavigate}>
        <Settings size={18} />
        <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
