function ApplicationDetailsModal({ application, onClose}) {
    return (
           <div className="modal-overlay">
              <div className="modal-content">
                <div className="application-detail">
                  <span>Company:</span>
                  <h2>{application.company}</h2>
                </div>
                <div className="application-detail">
                  <span>Role:</span>
                  <p>{application.role}</p>
                </div>
                <div className="application-detail">
                  <span>Status:</span>
                  <p>{application.status}</p>
                </div>
                <div className="application-detail">
                  <span>Date:</span>
                  <p>{application.date}</p>
                </div>
                <div className="application-detail">
                  <span>Location:</span>
                  <p>{application.location}</p>
                </div>
                <div className="application-detail">
                  <span>Notes:</span>
                  <p>{application.notes}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close application details"
                  onClick={onClose}
                >
                  ✕
                </button>
              </div>
            </div>
    )
}

export default ApplicationDetailsModal;