import { NavLink } from "react-router-dom";
import logo from "../assets/jobtrackly-logo.webp";
import icon from "../assets/jobtrackly-icon.webp";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand-link">
        <img src={logo} alt="JobTrackly" className="brand-logo" />
        <img src={icon} alt="" className="brand-icon" />
      </NavLink>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/applications">Applications</NavLink>
        <NavLink to="/interviews">Interviews</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
