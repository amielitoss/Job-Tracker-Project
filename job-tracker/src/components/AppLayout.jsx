import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

function AppLayout({ darkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
    
  useEffect(() => {
    if(menuOpen === true){
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }   
  }, [menuOpen]);

  return (
    <div className={darkMode ? "app-layout dark-mode" : "app-layout"}>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className={menuOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <Sidebar onNavigate={() => setMenuOpen(false)}/>
      </div>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
