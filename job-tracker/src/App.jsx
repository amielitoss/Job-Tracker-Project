import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import initialApplications from "./data/applications";
import Footer from "./components/Footer";

function App() {
    const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications")) ?? initialApplications,
  );
    const [editApplication, setEditApplication] = useState(null);
    const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? false,
  );

    useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

    useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

    function deleteApplication(id) {
    setApplications(
      applications.filter((application) => {
        return application.id !== id;
      }),
    );
  }

   function updateApplication(updatedApplication) {
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

  return  (
    <>
    <Routes>
       <Route path="/" element={<Dashboard applications={applications} setApplications={setApplications} updateApplication={updateApplication} editApplication={editApplication} setEditApplication={setEditApplication} darkMode={darkMode} setDarkMode={setDarkMode}/>} />

       <Route path="/applications" element={<Applications applications={applications} deleteApplication={deleteApplication} updateApplication={updateApplication}
       setEditApplication={setEditApplication} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
    </Routes>

    <Footer />
   </>
  )

}

export default App;
