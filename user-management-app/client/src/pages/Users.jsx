import { useState, useEffect } from "react";
import axios from 'axios';
import { 
  Container, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow, 
  Paper,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getValidToken } from "../utils/auth";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getValidToken();
        if (!token) {
          setError('No valid tokens found');
          return;
        }

        const res = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearch = async e => {
    const query = e.target.value;
    setSearch(query);

    try {
      const token = getValidToken();
      if (!token) return;

      const res = await axios.get(`/api/users?search=${query}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Search failed');
    }
  }

  // Delete a user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = getValidToken();
        if (!token) return;

        await axios.delete(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        console.error(err);
        setError('Failed to delete user');
      }
    }
  };

  // Edit a user (prompt for new name/email)
  const handleEdit = async (id) => {
    const newName = prompt('Enter new name:');
    if (!newName || newName.trim() === '') return;

    const newEmail = prompt('Enter new email');
    if (!newEmail || newEmail.trim() === '') return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const token = getValidToken();
      if (!token) return;

      await axios.put(`/api/users/${id}`, 
        { name: newName.trim(), email: newEmail.trim() }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(users.map(u => 
        u._id === id ? { ...u, name: newName, email: newEmail } : u
      ));
    } catch (err) {
      console.error(err);
      setError('Failed to update user');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box mt={4}>
          <Typography color='error'>{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={3} mb={2}>
        <TextField 
          label="Search by name or email"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell align='right'><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => handleEdit(user._id)}>
                    <EditIcon color='primary' />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}