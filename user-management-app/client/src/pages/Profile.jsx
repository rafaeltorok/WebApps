import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import { getValidToken } from '../utils/auth';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch profile on mount
    const fetchProfile = async () => {
      try {
        const token = getValidToken();
        const res = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <Typography>Loading...</Typography>

  return (
    <Container>
      <Box mt={3}>
        <Typography variant='h4'>Profile</Typography>
        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
      </Box>
    </Container>
  );
}