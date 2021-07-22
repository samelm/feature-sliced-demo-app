import { StatusResponse } from './common';

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface GetProjectListResponse {
  status: StatusResponse;
  data: Project[];
}

export async function getProjects(): Promise<GetProjectListResponse> {
  const projectsResponse = await fetch('/api/projects');
  const projects = await projectsResponse.json();
  return { status: 'success', data: projects.projects };
}

export interface GetProjectResponse {
  status: StatusResponse;
  data: Project;
}

export async function getProject({
  projectId,
}: {
  projectId: number;
}): Promise<GetProjectResponse> {
  const projectsResponse = await fetch('/api/projects');
  const { projects } = await projectsResponse.json();
  const foundProjectById = projects.find((project: Project) => project.id === String(projectId));
  if (foundProjectById) {
    return { status: 'success', data: foundProjectById };
  }
  throw { status: 'error', error: 'Not found project by id' };
}

export interface ProjectEditResponse {
  status: 'success';
  data: Project;
}

export async function projectEdit({ project }: { project: Project }): Promise<ProjectEditResponse> {
  const cloneProject: Partial<Project> = { ...project };
  const projectId = cloneProject.id;
  delete cloneProject.id;
  const res = await fetch(`/api/projects/${projectId}`, {
    method: 'PATCH',
    body: JSON.stringify(cloneProject),
  }).then((res) => res.json());
  return { status: 'success', data: res.project };
}
