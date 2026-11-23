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
    fetch("http://localhost:5000/api/applications", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch applications");
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        setApplicationsError(error.message);
      })
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
    );
  }

  if (applicationsLoading) {
    return "Loading applications...";
  }

  if (applicationsError) {
    return <p>{applicationsError}</p>;
  }

  function deleteApplication(id: string) {
    fetch(`http://localhost:5000/api/applications/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to delete application");
        }
        return response.json();
      })
      .then((data) => {
        setApplications(
          applications.filter((application) => {
            return application.id !== data.id;
          }),
        );
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function updateApplication(updatedApplication: Application) {
    fetch(`http://localhost:5000/api/applications/${updatedApplication.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: updatedApplication.company,
        role: updatedApplication.role,
        status: updatedApplication.status,
        date: updatedApplication.date,
        location: updatedApplication.location,
        notes: updatedApplication.notes,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to update application");
        }
        return response.json();
      })
      .then((data) => {
        setApplications(
          applications.map((application) => {
            if (application.id === data.id) {
              return data;
            }

            return application;
          }),
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
