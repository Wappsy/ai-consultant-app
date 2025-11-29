const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware to verify JWT token
const auth = require('../middleware/auth');

// Start or continue a chat session
router.post('/message', auth, async (req, res) => {
  try {
    const { message, chatId } = req.body;
    let chat;

    if (chatId) {
      // Continue existing chat
      chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
    } else {
      // Start new chat
      chat = new Chat({
        userId: req.user.id,
        messages: [{
          role: 'system',
          content: 'You are an empathetic AI consultant helping to understand employee satisfaction and company culture. Ask thoughtful questions about their experience and provide constructive feedback.'
        }]
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: chat.messages,
      temperature: 0.7,
      max_tokens: 500
    });

    // Add AI response to chat
    const aiResponse = completion.choices[0].message;
    chat.messages.push({
      role: 'assistant',
      content: aiResponse.content
    });

    // Save chat
    await chat.save();

    res.json({
      chatId: chat._id,
      message: aiResponse.content
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get chat history
router.get('/history', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;