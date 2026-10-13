import { useState } from "react";
import type { Application, ApplicationStatus } from "../types/types";

type ApplicationFormProps = {
  onAddApplication: (application: Application) => void;
  editApplication: Application | null;
  onCancelEdit: () => void;
  onUpdateApplication: (application: Application) => void;
};

function ApplicationForm({
  onAddApplication,
  editApplication,
  onCancelEdit,
  onUpdateApplication,
}: ApplicationFormProps) {
  
  const emptyForm: Omit<Application, "id"> = {
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
      className="application-form"
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
          setFormData(emptyForm);
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
        required
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
        required
      />

      {/* Status */}
      <label htmlFor="status">Status</label>
      <select
        name="status"
        id="status"
        value={formData.status}
        onChange={(event) => {
          const newStatus = event.target.value as ApplicationStatus;
          setFormData({
            ...formData,
            status: newStatus,
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
        required
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
        required
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
