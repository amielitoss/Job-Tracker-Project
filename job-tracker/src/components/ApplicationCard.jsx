function ApplicationCard({ application, onDeleteApplication }) {
    return (
        <div className="application-card">
            <h3>{application.company}</h3>
            <p>{application.role}</p>
            <span>{application.status}</span>
            <p>{application.date}</p>
            <p>{application.location}</p>
            <button type="button" onClick={() => {
                onDeleteApplication(application.id)
            }}>Delete Application</button>
        </div>
    )
}

export default ApplicationCard;