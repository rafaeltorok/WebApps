import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/auth/register', form);
      // On success, redirect to login
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='sm'>  {/* constrains the form to a small-medium width (typically around 600px) */}
      <Box mt={5} component='form' onSubmit={handleSubmit}>
        <Typography variant='h5' gutterBottom>Sign Up</Typography>
        <TextField 
          label='Name' 
          name='name' 
          fullWidth
          margin='normal' 
          onChange={handleChange} 
          required 
          disabled={loading}  // Prevents editing during submission
        />
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
          {loading ? 'Creating account...' : 'Register'}
        </Button>
      </Box>
    </Container>
  );
}