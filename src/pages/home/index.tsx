import CircularProgress from '@material-ui/core/CircularProgress';
import { useStore } from 'effector-react';
import React from 'react';
import { $projects, loadProjectsFx } from '@brunhild/entities/project';
import { ProjectCard } from '@brunhild/entities/project/ui/ProjectCard';
import { Layout } from '@brunhild/shared/ui';

export function HomePage() {
  const projects = useStore($projects);
  const loadingProjects = useStore(loadProjectsFx.pending);

  React.useEffect(() => {
    loadProjectsFx();
  }, []);

  return (
    <Layout>
      <Layout.Title>Project list</Layout.Title>
      {loadingProjects ? (
        <CircularProgress />
      ) : (
        projects.map((project) => <ProjectCard key={project.id} project={project} />)
      )}
    </Layout>
  );
}
