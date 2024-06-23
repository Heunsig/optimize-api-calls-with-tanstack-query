import { UnauthorizedError } from "@/errors/UnauthorizedError";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");
  const json = await response.json();
  
  const status = response.status
  
  if (json.status === "error") {
    if (status === 401) {
      throw new UnauthorizedError(json.message);
    }

    throw new Error(json.message);
  }

  return json.data;
}

export async function createProject(project: {
  name: string;
  description?: string;
}): Promise<{ insertedId: string }> {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  const status = response.status
  const json = await response.json();
  
  if (json.status === "error") {
    if (status === 401) {
      throw new UnauthorizedError(json.message);
    }

    throw new Error(json.message);
  }

  return json.data;
}

export async function deleteProject(
  projectId: string
): Promise<{ deletedId: string }> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  });

  const status = response.status
  const json = await response.json();

  if (json.status === "error") {
    if (status === 401) {
      throw new UnauthorizedError(json.message);
    }

    throw new Error(json.message);
  }

  return json.data;
}
