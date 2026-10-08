function RecentApplication({
  application,
  onViewApplication,
  onEditApplication,
}) {
  function sliceText(text, maxLength) {
    return text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  }

  return (
    <div className="recent-application">
      <div className="recent-application-info">
        <p>{sliceText(application.company, 10)}</p>
        <p>{sliceText(application.role, 14)}</p>
        <p>{application.date}</p>
        <p>{sliceText(application.location, 14)}</p>
      </div>

      <div className={`recent-application-status status-${application.status.toLowerCase()}`}>
        <p>{application.status}</p>
      </div>

      <div className="recent-application-actions">
        <button onClick={() => onViewApplication(application)}>View</button>
        <button onClick={() => onEditApplication(application)}>Edit</button>
      </div>
    </div>
  );
}

export default RecentApplication;