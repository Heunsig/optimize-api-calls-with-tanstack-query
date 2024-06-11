export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch("/api/projects");
  const data = await response.json();
  return data.data;
};