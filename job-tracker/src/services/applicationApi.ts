import type { Application } from "../types/types";

const API_URL = "http://localhost:5000/api/applications";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch applications");
  }

  return response.json();
}

export async function updateApplicationApi(
  application: Application,
): Promise<Application> {
  const response = await fetch(`${API_URL}/${application.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: application.company,
      role: application.role,
      status: application.status,
      date: application.date,
      location: application.location,
      notes: application.notes,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to update application");
  }

  return response.json();
}

export async function deleteApplicationApi(id: string): Promise<Application> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to delete application");
  }

  return response.json();
}

export async function createApplicationApi(
  application: Application,
): Promise<Application> {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company: application.company,
      role: application.role,
      status: application.status,
      date: application.date,
      location: application.location,
      notes: application.notes,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to create application");
  }

  return response.json();
}
