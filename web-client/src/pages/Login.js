import React from 'react';
import { Paper, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import api, { setAuthToken } from '../api';

export default function Login({ onRegister, onLogin, showError }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      onLogin(token);
    } catch (err) {
      showError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome Back
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          autoComplete="email"
          autoFocus
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button color="primary" onClick={onRegister} sx={{ ml: 1 }}>
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
