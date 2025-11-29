import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';
import useSnackbar from './hooks/useSnackbar';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2b6cb0',
    },
    background: {
      default: '#f5f7fb',
    },
  },
});

export default function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [view, setView] = React.useState(token ? 'chat' : 'login');
  const { message, severity, showSnackbar, closeSnackbar } = useSnackbar();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
    showSnackbar('Logged out successfully', 'success');
  };

  const handleLogin = (token) => {
    setToken(token);
    setView('chat');
    showSnackbar('Logged in successfully', 'success');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout onLogout={token ? handleLogout : undefined}>
        {view === 'login' && (
          <Login
            onRegister={() => setView('register')}
            onLogin={handleLogin}
            showError={(msg) => showSnackbar(msg, 'error')}
          />
        )}

        {view === 'register' && (
          <Register
            onLogin={handleLogin}
            onCancel={() => setView('login')}
            showError={(msg) => showSnackbar(msg, 'error')}
          />
        )}

        {view === 'chat' && token && (
          <Chat
            token={token}
            showError={(msg) => showSnackbar(msg, 'error')}
            showSuccess={(msg) => showSnackbar(msg, 'success')}
          />
        )}

        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Layout>
    </ThemeProvider>
  );
}
