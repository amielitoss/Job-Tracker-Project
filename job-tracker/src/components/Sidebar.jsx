import { NavLink } from "react-router-dom";
import logo from "../assets/jobtrackly-logo.webp";
import icon from "../assets/jobtrackly-icon.webp";

function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand-link">
        <img src={logo} alt="JobTrackly" className="brand-logo" />
        <img src={icon} alt="" className="brand-icon" />
      </NavLink>
      <nav>
        <NavLink to="/" onClick={onNavigate}>Dashboard</NavLink>
        <NavLink to="/applications" onClick={onNavigate}>Applications</NavLink>
        <NavLink to="/interviews" onClick={onNavigate}>Interviews</NavLink>
        <NavLink to="/settings" onClick={onNavigate}>Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
