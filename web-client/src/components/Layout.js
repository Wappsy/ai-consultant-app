import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function Layout({ children, onLogout }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Consultant
          </Typography>
          {onLogout && (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} AI Consultant. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}