import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../pages/Chat';

jest.mock('../api', () => ({
  post: jest.fn(),
  get: jest.fn(),
  defaults: { headers: { common: {} } },
}));

describe('Chat Component', () => {
  const mockToken = 'test-token';
  const mockShowError = jest.fn();
  const mockShowSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('../api').get.mockResolvedValueOnce({ data: [] }); // Mock empty chat history
  });

  it('renders chat interface', () => {
    render(<Chat token={mockToken} showError={mockShowError} showSuccess={mockShowSuccess} />);
    
    expect(screen.getByText(/new conversation/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/how are you feeling/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sends messages and displays responses', async () => {
    const mockResponse = {
      data: { chatId: 'test-chat', message: 'AI response' },
    };
    require('../api').post.mockResolvedValueOnce(mockResponse);

    render(<Chat token={mockToken} showError={mockShowError} showSuccess={mockShowSuccess} />);

    const input = screen.getByPlaceholderText(/how are you feeling/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
  });

  it('handles message send failure', async () => {
    require('../api').post.mockRejectedValueOnce(new Error('Failed to send'));

    render(<Chat token={mockToken} showError={mockShowError} showSuccess={mockShowSuccess} />);

    const input = screen.getByPlaceholderText(/how are you feeling/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('Failed to send message');
      expect(screen.getByText('Sorry, something went wrong.')).toBeInTheDocument();
    });
  });
});