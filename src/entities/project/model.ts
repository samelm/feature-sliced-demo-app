import { createEffect, createStore, createEvent } from 'effector';
import { getProject, getProjects, Project, projectEdit } from '@brunhild/shared/api';

export const $projects = createStore<Project[]>([]);

export const loadProjectsFx = createEffect({
  handler: async () => {
    const res = await getProjects();
    return res.data;
  },
});

export const loadProjectByIdFx = createEffect({
  handler: async ({ projectId }: { projectId: number }) => {
    try {
      const res = await getProject({ projectId });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const saveProjectFx = createEffect({
  handler: async (project: Project) => {
    try {
      const res = await projectEdit({ project });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

$projects.on(loadProjectsFx.doneData, (_, projects) => projects);

export const $currentProject = createStore<Project | null>(null);

export const setCurrentProject = createEvent<Project>();

$currentProject.on(setCurrentProject, (_, project) => project);
