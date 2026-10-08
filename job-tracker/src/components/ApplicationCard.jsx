function ApplicationCard({
  application,
  onDeleteApplication,
  onEditApplication,
  onUpdateApplication,
  onViewApplication
}) {

  return (
    <div className="application-card">
      <h3>{application.company}</h3>
      <p>{application.role}</p>
      <select
        name="status"
        value={application.status}
        onChange={(event) => {
          onUpdateApplication({
            ...application,
            status: event.target.value,
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
        onClick={() => {
          onDeleteApplication(application.id);
        }}
      >
        Delete Application
      </button>
      <button
        type="button"
        onClick={() => {
          onEditApplication(application);
        }}
      >
        Edit Application
      </button>
      <button
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
