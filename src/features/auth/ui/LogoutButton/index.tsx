import Button from '@material-ui/core/Button';
import React from 'react';
import { logoutUserFx } from '../../model';

export function LogoutButton() {
  const handleLogoutClick = () => logoutUserFx();

  return (
    <Button
      color="inherit"
      onClick={handleLogoutClick}
      sx={{ marginLeft: 'auto' }}
    >
      Logout
    </Button>
  );
}
