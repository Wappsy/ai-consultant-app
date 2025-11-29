# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- OpenAI API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/Wappsy/ai-consultant-app.git
cd ai-consultant-app
```

### Step 2: Install Dependencies
```bash
npm run install:all
```

### Step 3: Configure Environment Variables

#### Backend Configuration
Create `backend/.env`:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and add your values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Any random secure string
- `OPENAI_API_KEY`: Your OpenAI API key

#### Web Client Configuration
Create `web-client/.env`:
```bash
cp web-client/.env.example web-client/.env
```

The default settings should work for local development.

### Step 4: Start the Application
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Web client on http://localhost:3000

### Step 5: Open Your Browser
Navigate to http://localhost:3000

## 🧪 Testing

Run tests for the web client:
```bash
cd web-client
npm test
```

## 📦 Building for Production

Build the web client:
```bash
cd web-client
npm run build
```

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to GitHub Pages
```bash
cd web-client
npm run deploy
```

## 📝 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running locally, or
- Use MongoDB Atlas and whitelist your IP address

### Port Already in Use
- Change the `PORT` in `backend/.env`
- Or kill the process using the port: `lsof -ti:5000 | xargs kill`

### CORS Errors
- Ensure `ALLOWED_ORIGINS` in backend includes your frontend URL
- Default is `http://localhost:3000` for development

## 🔑 Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API keys section
4. Create a new secret key

### MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a new cluster (Free tier)
4. Get your connection string

## 📚 Next Steps

- Read the [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Customize the application to your needs

## 💡 Tips

- Use MongoDB Compass for easy database management
- Use Postman to test API endpoints
- Check browser console for frontend errors
- Check terminal logs for backend errors

## 🆘 Getting Help

If you encounter issues:
1. Check the logs (terminal output)
2. Review environment variables
3. Ensure all dependencies are installed
4. Open an issue on GitHub

Happy coding! 🎉
