import { useState } from "react";

function ApplicationForm({
  onAddApplication,
  editApplication,
  onCancelEdit,
  onUpdateApplication,
}) {
  const emptyForm = {
    company: "",
    role: "",
    status: "Applied",
    date: "",
    location: "",
    notes: "",
  };

  const [formData, setFormData] = useState(editApplication ?? emptyForm);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (editApplication) {
          onUpdateApplication({
            id: editApplication.id,
            ...formData,
          });
          onCancelEdit();
        } else {
          const newApplication = {
            id: crypto.randomUUID(),
            ...formData,
          };
          onAddApplication(newApplication);
        }
        setFormData({
          company: "",
          role: "",
          status: "Applied",
          date: "",
          location: "",
          notes: "",
        });
      }}
    >
      {/* Company */}
      <label htmlFor="company">Company</label>
      <input
        id="company"
        name="company"
        type="text"
        value={formData.company}
        onChange={(event) => {
          setFormData({
            ...formData,
            company: event.target.value,
          });
        }}
      />

      {/* Role */}
      <label htmlFor="role">Role</label>
      <input
        id="role"
        name="role"
        type="text"
        value={formData.role}
        onChange={(event) => {
          setFormData({
            ...formData,
            role: event.target.value,
          });
        }}
      />

      {/* Status */}
      <label htmlFor="status">Status</label>
      <select
        name="status"
        id="status"
        value={formData.status}
        onChange={(event) => {
          setFormData({
            ...formData,
            status: event.target.value,
          });
        }}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Date */}
      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={(event) => {
          setFormData({
            ...formData,
            date: event.target.value,
          });
        }}
      />

      {/* Location */}
      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={(event) => {
          setFormData({
            ...formData,
            location: event.target.value,
          });
        }}
      />

      {/* Notes */}
      <label htmlFor="notes">Notes</label>
      <textarea
        name="notes"
        id="notes"
        value={formData.notes}
        onChange={(event) => {
          setFormData({
            ...formData,
            notes: event.target.value,
          });
        }}
      ></textarea>

      <button type="submit">
        {editApplication ? "Save Changes" : "Add Application"}
      </button>
      {editApplication && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ApplicationForm;
