import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Footer from "./components/Footer";
import AppLayout from "./components/AppLayout";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import {
  getApplications,
  updateApplicationApi,
  deleteApplicationApi,
} from "./services/applicationApi";
import "./App.css";
import type { Application, CurrentUser } from "./types/types";

function App() {
  const savedDarkMode = localStorage.getItem("darkMode");
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") setCurrentUser(data.user);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const [applications, setApplications] = useState<Application[]>([]);
  const [editApplication, setEditApplication] = useState<Application | null>(
    null,
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    savedDarkMode ? JSON.parse(savedDarkMode) : false,
  );

useEffect(() => {
  if (!currentUser) return;

  setApplicationsLoading(true);
  setApplicationsError("");

  getApplications()
    .then((data) => setApplications(data))
    .catch((error) => setApplicationsError(error.message))
    .finally(() => setApplicationsLoading(false));
}, [currentUser]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  if (authLoading) {
    return "Loading...";
  }

  if (!currentUser) {
    return (
      <div className={darkMode ? "dark-mode" : ""}>
        <Routes>
          <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    );
  }

  if (applicationsLoading) {
    return "Loading applications...";
  }

  if (applicationsError) {
    return <p>{applicationsError}</p>;
  }

function deleteApplication(id: string) {
  deleteApplicationApi(id)
    .then((data) => {
      setApplications((current) =>
        current.filter((application) => application.id !== data.id),
      );
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function updateApplication(updatedApplication: Application) {
  updateApplicationApi(updatedApplication)
    .then((data) => {
      setApplications((current) =>
        current.map((application) =>
          application.id === data.id ? data : application,
        ),
      );
    })
    .catch((error) => {
      console.error(error.message);
    });
}

  return (
    <>
      <Routes>
        <Route
          element={
            <AppLayout darkMode={darkMode} setCurrentUser={setCurrentUser} />
          }
        >
          <Route
            path="/"
            element={
              <Dashboard
                applications={applications}
                setApplications={setApplications}
                updateApplication={updateApplication}
                editApplication={editApplication}
                setEditApplication={setEditApplication}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                currentUser={currentUser}
              />
            }
          />

          <Route
            path="/applications"
            element={
              <Applications
                applications={applications}
                deleteApplication={deleteApplication}
                updateApplication={updateApplication}
                setEditApplication={setEditApplication}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route
            path="/interviews"
            element={
              <Interviews
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                applications={applications}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setApplications={setApplications}
                currentUser={currentUser}
              />
            }
          />
        </Route>
      </Routes>
      <Footer darkMode={darkMode} />
    </>
  );
}

export default App;
