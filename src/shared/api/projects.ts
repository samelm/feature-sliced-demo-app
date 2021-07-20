import { StatusResponse } from './common';

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface ProjectResponse {
  status: StatusResponse;
  data: Project[];
}

export async function getProjects(): Promise<ProjectResponse> {
  const projectsResponse = await fetch('/api/projects');
  const projects = await projectsResponse.json();
  return { status: 'success', data: projects.projects };
}
