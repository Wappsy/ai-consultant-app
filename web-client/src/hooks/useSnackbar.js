import { useState, useCallback } from 'react';

export default function useSnackbar() {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const showSnackbar = useCallback((msg, sev = 'info') => {
    setMessage(msg);
    setSeverity(sev);
  }, []);

  const closeSnackbar = useCallback(() => {
    setMessage('');
  }, []);

  return { message, severity, showSnackbar, closeSnackbar };
}