import type { Application, ApplicationStatus } from "../types/types";

type ApplicationCardProps = {
  application: Application
  onDeleteApplication: (id: number) => void;
  onEditApplication: (application: Application) => void;
  onUpdateApplication: (application: Application) => void;
  onViewApplication: (application: Application) => void;
};

function ApplicationCard({
  application,
  onDeleteApplication,
  onEditApplication,
  onUpdateApplication,
  onViewApplication
}: ApplicationCardProps) { 

  return (
    <div className="application-card">
      <h3>{application.company}</h3>
      <p>{application.role}</p>
      <select
      className={`application-status status-${application.status.toLowerCase()}`}
        name="status"
        value={application.status}
        onChange={(event) => {
          const newStatus = event.target.value as ApplicationStatus;
          onUpdateApplication({
            ...application,
            status: newStatus
          });
        }}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <p>{application.date}</p>
      <p>{application.location}</p>

      <div className="application-card-actions">
      <button
        type="button"
        className="delete-button"
        onClick={() => {
          onDeleteApplication(application.id);
        }}
      >
        Delete Application
      </button>
      <button
      className="edit-button"
        type="button"
        onClick={() => {
          onEditApplication(application);
        }}
      >
        Edit Application
      </button>
      <button
      className="view-button"
        type="button"
        onClick={() => {
          onViewApplication(application);
        }}
      >
        View Application 
      </button>
    </div>
    </div>
  );
}

export default ApplicationCard;
