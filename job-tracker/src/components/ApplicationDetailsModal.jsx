import { useEffect } from "react";

function ApplicationDetailsModal({ application, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
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
  );
}

export default ApplicationDetailsModal;
