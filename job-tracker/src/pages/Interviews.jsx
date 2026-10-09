import { Sun, Moon } from "lucide-react";

function Interviews({ darkMode, setDarkMode, applications }) {
  const interviews = applications.filter((application) => {
    return application.status === "Interview";
  });

  return (
    <div className={darkMode ? "interviews-page dark-mode" : "interviews-page"}>
      <div className="interviews-header">
        <h2>Interviews</h2>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {interviews.map((interview) => {
        return (
          <div className="interview-card" key={interview.id}>
            <div className="interview-detail">
              <span>Company</span>
              <h3>{interview.company}</h3>
            </div>

            <div className="interview-detail">
              <span>Role</span>
              <p>{interview.role}</p>
            </div>

            <div className="interview-detail">
              <span>Date</span>
              <p>{interview.date}</p>
            </div>

            <div className="interview-detail">
              <span>Location</span>
              <p>{interview.location}</p>
            </div>

            <div className="interview-detail">
              <span>Notes</span>
              <p>{interview.notes}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Interviews;
