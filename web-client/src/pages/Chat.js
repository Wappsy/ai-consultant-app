import React, { useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Send as SendIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import api, { setAuthToken } from '../api';

export default function Chat({ token, showError, showSuccess }) {
  const [messages, setMessages] = React.useState([
    { role: 'system', content: 'You are an empathetic AI consultant helping to understand employee satisfaction and company culture.' }
  ]);
  const [input, setInput] = React.useState('');
  const [chatId, setChatId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingHistory, setLoadingHistory] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const bottomRef = useRef(null);

  const loadChatHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await api.get('/chat/history');
      setChatHistory(res.data);
    } catch (err) {
      showError('Failed to load chat history');
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    setAuthToken(token);
    loadChatHistory();
  }, [token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat/message', { message: userMsg.content, chatId });
      const { chatId: newChatId, message } = res.data;
      setChatId(newChatId);
      setMessages((m) => [...m, { role: 'assistant', content: message }]);
      if (!chatId) {
        showSuccess('Started new conversation');
        loadChatHistory(); // Refresh history when starting new chat
      }
    } catch (err) {
      showError('Failed to send message');
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleLoadChat = (selectedChatId) => {
    const chat = chatHistory.find(c => c._id === selectedChatId);
    if (chat) {
      setChatId(selectedChatId);
      setMessages(chat.messages);
      setAnchorEl(null);
    }
  };

  const handleNewChat = () => {
    setChatId(null);
    setMessages([
      { role: 'system', content: 'You are an empathetic AI consultant helping to understand employee satisfaction and company culture.' }
    ]);
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {chatId ? 'Continuing Conversation' : 'New Conversation'}
        </Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleNewChat}>New Chat</MenuItem>
          <Divider />
          {loadingHistory ? (
            <MenuItem disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} /> Loading history...
            </MenuItem>
          ) : chatHistory.map((chat) => (
            <MenuItem key={chat._id} onClick={() => handleLoadChat(chat._id)}>
              {new Date(chat.createdAt).toLocaleDateString()}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((m, i) => (
          <ListItem
            key={i}
            sx={{
              flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '80%',
                bgcolor: m.role === 'user' ? 'primary.main' : 'grey.100',
                color: m.role === 'user' ? 'white' : 'text.primary',
              }}
            >
              <Typography>{m.content}</Typography>
            </Paper>
          </ListItem>
        ))}
        <div ref={bottomRef} />
      </List>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling about your role and company culture?"
          disabled={loading}
          multiline
          maxRows={4}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !input.trim()}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </Button>
      </Box>
    </Paper>
  );
}
