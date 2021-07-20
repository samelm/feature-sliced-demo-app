import { createEffect, createStore } from 'effector';
import { getProjects } from '@brunhild/shared/api';
import { Project } from '@brunhild/shared/api/projects';

export const $projects = createStore<Project[]>([]);

export const loadProjectsFx = createEffect({
  handler: async () => {
    const res = await getProjects();
    return res.data;
  },
});

$projects.on(loadProjectsFx.doneData, (_, projects) => projects);
