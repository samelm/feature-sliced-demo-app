import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Header } from '@brunhild/widgets/header';

interface Props {
  children: React.ReactNode;
}

Layout.Title = function ({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};

export function Layout(props: Props) {
  const { children } = props;

  return (
    <div>
      <Container sx={{ marginTop: '74px' }}>
        <Header />
        {children}
      </Container>
    </div>
  );
}
