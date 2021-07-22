export const paths = {
  home: () => '/',
  login: () => '/login',
  projectEdit: (projectId?: string) =>
    projectId ? `/project/${projectId}/edit` : '/project/:projectId/edit',
};
