export type Application = {
    id: string;
    company: string;
    role: string;
    status: ApplicationStatus;
    date: string;
    location: string;
    notes?: string;
}
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export type CurrentUser = {
  user_uid: string;
  email: string;
  created_at?: string;
};