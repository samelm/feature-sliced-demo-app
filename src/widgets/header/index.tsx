import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '@brunhild/features/auth';
import { paths } from '@brunhild/pages/paths';

export function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to={paths.home()}>Brunhild app</Link>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
