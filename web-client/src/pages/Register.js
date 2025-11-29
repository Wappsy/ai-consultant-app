import React from 'react';
import { Paper, TextField, Button, Typography, Box, CircularProgress, Grid } from '@mui/material';
import api, { setAuthToken } from '../api';

export default function Register({ onLogin, onCancel, showError }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, department, position });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      onLogin(token);
    } catch (err) {
      showError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create Account
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          
          <Button
            onClick={onCancel}
            variant="outlined"
            size="large"
            fullWidth
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
