import { createEvent, createStore, forward, sample, Store } from 'effector';
import { createGate } from 'effector-react';
import { loadProjectByIdFx, saveProjectFx } from '@brunhild/entities/project';
import { Project } from '@brunhild/shared/api';

export const ProjectEditGate = createGate<{ projectId: number }>();

export const $projectEditForm = createStore<Project | null>(null);

export const projectUpdateEditForm = createEvent<Project>();
export const projectEditFormChangeName = createEvent<string>();
export const projectEditFormChangeDescription = createEvent<string>();
export const projectEditFormSave = createEvent();

export const $projectEditFormLoadPending = loadProjectByIdFx.pending;
export const $projectEditFormSavePending = saveProjectFx.pending;

$projectEditForm
  .on(projectUpdateEditForm, (_, project) => project)
  .on(
    projectEditFormChangeName,
    (state, projectName) =>
      ({
        ...state,
        name: projectName,
      } as Project),
  )
  .on(
    projectEditFormChangeDescription,
    (state, projectDescription) =>
      ({
        ...state,
        description: projectDescription,
      } as Project),
  );

forward({
  from: ProjectEditGate.open,
  to: loadProjectByIdFx,
});

forward({
  from: loadProjectByIdFx.doneData,
  to: projectUpdateEditForm,
});

sample({
  source: $projectEditForm as Store<Project>,
  clock: projectEditFormSave,
  target: saveProjectFx,
});
