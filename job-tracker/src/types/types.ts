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
