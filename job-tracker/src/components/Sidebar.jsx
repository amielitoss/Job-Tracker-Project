import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1>
        <NavLink to="/">JobTracker</NavLink>
      </h1>
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
