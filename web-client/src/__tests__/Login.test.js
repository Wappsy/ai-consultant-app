import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

jest.mock('../api', () => ({
  post: jest.fn(),
}));

describe('Login Component', () => {
  const mockOnLogin = jest.fn();
  const mockOnRegister = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<Login onLogin={mockOnLogin} onRegister={mockOnRegister} showError={mockShowError} />);
    
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockToken = 'test-token';
    require('../api').post.mockResolvedValueOnce({ data: { token: mockToken } });

    render(<Login onLogin={mockOnLogin} onRegister={mockOnRegister} showError={mockShowError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith(mockToken);
    });
  });

  it('handles login failure', async () => {
    const errorMessage = 'Invalid credentials';
    require('../api').post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    render(<Login onLogin={mockOnLogin} onRegister={mockOnRegister} showError={mockShowError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong-password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(errorMessage);
    });
  });
});