import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import type { CurrentUser } from "../types/types";

type AppLayoutProps = {
  darkMode: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

function AppLayout({ darkMode, setCurrentUser }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  function handleLogout() {
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setCurrentUser(null);
        }
      });
  }

  return (
    <div className={darkMode ? "app-layout dark-mode" : "app-layout"}>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className={menuOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
