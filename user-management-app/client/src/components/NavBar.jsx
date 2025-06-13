import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/auth';

export default function NavBar({ token, onAuthChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    onAuthChange();
    navigate('/login');
  }

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        {!token && (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/register'>
              Register
            </Button>
          </>
        )}
        {token && (
          <>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}