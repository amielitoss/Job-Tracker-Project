function ApplicationCard({ application }) {
    return (
        <div className="application-card">
            <h3>{application.company}</h3>
            <p>{application.role}</p>
            <span>{application.status}</span>
            <p>{application.date}</p>
            <p>{application.location}</p>
        </div>
    )
}

export default ApplicationCard;