import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Footer from "./components/Footer";
import AppLayout from "./components/AppLayout";
import Settings from "./pages/Settings";
import "./App.css";
import type { Application } from "./types/types";


function App() {
  const savedApplications = localStorage.getItem("applications");
  const savedDarkMode = localStorage.getItem("darkMode");

const [applications, setApplications] = useState<Application[]>(
  savedApplications ? JSON.parse(savedApplications) : []
);

  const [editApplication, setEditApplication] = useState<Application | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(
    savedDarkMode ? JSON.parse(savedDarkMode) : false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  function deleteApplication(id: string) {
    setApplications(
      applications.filter((application) => {
        return application.id !== id;
      }),
    );
  }

  function updateApplication(updatedApplication: Application) {
    setApplications(
      applications.map((application) => {
        if (application.id === updatedApplication.id) {
          return updatedApplication;
        } else {
          return application;
        }
      }),
    );
  }

  return (
    <>
      <Routes>
        <Route element={<AppLayout darkMode={darkMode} />}>
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
            element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} 
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
