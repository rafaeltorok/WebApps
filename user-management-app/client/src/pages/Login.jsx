import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setTokenWithExpiration } from '../utils/auth';

export default function Login({ onAuthChange }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', form);
      // Store the token (for simplicity in localStorage)
      setTokenWithExpiration(res.data.token);
      onAuthChange();
      navigate('/users');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box mt={5} component='form' onSubmit={handleSubmit}>
        <Typography variant='h5' gutterBottom>Log In</Typography>
        <TextField 
          label='Email'
          name='email'
          type='email'
          fullWidth
          margin='normal'
          onChange={handleChange}
          required
          disabled={loading}
        />
        <TextField 
          label='Password'
          name='password'
          type='password'
          fullWidth
          margin='normal'
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color='inherit' /> : null}
        >
          {loading ? 'Authenticating...' : 'Log In'}
        </Button>
      </Box>
    </Container>
  );
}