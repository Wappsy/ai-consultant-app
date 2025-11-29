# AI Consultant App

AI-guided employee feedback system with web interface.

## Overview

This application provides an AI-powered consultation system for employee feedback and guidance. It consists of a backend API server and a web client interface.

## Project Structure

- `backend/` - Node.js/Express backend server
- `web-client/` - React web application

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- OpenAI API key

## Installation

Install all dependencies:

```bash
npm run install:all
```

Or install individually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install web client dependencies
cd web-client && npm install
```

## Configuration

Create `.env` files in both `backend` and `web-client` directories:

### Backend `.env`
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

### Web Client `.env`
```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

Run both backend and web client concurrently:

```bash
npm run dev
```

Or run separately:

```bash
# Run backend
npm run start:backend

# Run web client (in another terminal)
npm run start:web
```

### Production Mode

```bash
# Build web client
cd web-client && npm run build

# Start backend in production
cd backend && npm start
```

## Testing

Run tests for the web client:

```bash
cd web-client && npm test
```

## Deployment

This project includes GitHub Actions for automated deployment. See `.github/workflows/` for CI/CD configuration.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, OpenAI API
- **Frontend**: React, Material-UI, Axios
- **Authentication**: JWT
- **Testing**: Jest, React Testing Library

## License

ISC
