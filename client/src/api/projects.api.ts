export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");
  const data = await response.json();
  return data.data;
};

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

  const json = await response.json();

  if (json.status === "error") {
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

  const data = await response.json();
  return data.data;
}