import CircularProgress from '@material-ui/core/CircularProgress';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import {
  ProjectEditForm,
  $projectEditForm,
  $projectEditFormLoadPending,
  ProjectEditGate,
} from '@brunhild/features/project/edit';
import { Layout } from '@brunhild/shared/ui';

export function ProjectEditPage() {
  const params = useParams<{ projectId: string }>();
  useGate(ProjectEditGate, { projectId: Number(params.projectId) });
  const loading = useStore($projectEditFormLoadPending);
  const projectEditForm = useStore($projectEditForm);

  return (
    <Layout>
      <Layout.Title>Edit project #{params.projectId}</Layout.Title>
      {loading ? <CircularProgress /> : <ProjectEditForm initialState={projectEditForm} />}
    </Layout>
  );
}
