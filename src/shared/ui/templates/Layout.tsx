import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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

  const handleLogoutClick = () => {
    console.log('logout');
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          Brunhild app
          <Button
            color="inherit"
            onClick={handleLogoutClick}
            sx={{ marginLeft: 'auto' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '74px' }}>{children}</Container>
    </div>
  );
}
