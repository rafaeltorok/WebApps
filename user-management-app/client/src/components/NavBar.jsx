import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/auth';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Button
          color='inherit'
          component={Link}
          to='/users'
        >
          Users
        </Button>
        <Button
          color='inherit'
          component={Link}
          to='/profile'
        >
          Profile
        </Button>
        <Button
          color='inherit'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}