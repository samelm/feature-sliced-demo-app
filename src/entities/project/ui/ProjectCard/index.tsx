import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { Project } from '@brunhild/shared/api/projects';

interface Props {
  project: Project;
}

export function ProjectCard(props: Props) {
  const { project } = props;

  return (
    <Box sx={{ margin: '20px 0' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div>{project.name}</div>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
