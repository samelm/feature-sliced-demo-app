import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { LogoutButton } from '@brunhild/features/auth/ui/LogoutButton';

export function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        Brunhild app
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
