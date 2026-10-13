export type Application = {
    id: number;
    company: string;
    role: string;
    status: ApplicationStatus;
    date: string;
    location: string;
    notes?: string;
}
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";
