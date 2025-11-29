# Deployment Guide

This guide covers various deployment options for the AI Consultant App.

## Table of Contents

1. [GitHub Pages (Frontend)](#github-pages-frontend)
2. [Heroku (Backend + Frontend)](#heroku-deployment)
3. [Vercel (Frontend)](#vercel-deployment)
4. [Railway (Backend)](#railway-deployment)
5. [Environment Variables](#environment-variables)

---

## GitHub Pages (Frontend)

The web client is automatically deployed to GitHub Pages via GitHub Actions when you push to the `main` branch.

### Setup

1. Go to your repository settings: https://github.com/Wappsy/ai-consultant-app/settings/pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The CI/CD pipeline will automatically deploy on push to main

**Live URL**: `https://wappsy.github.io/ai-consultant-app/`

### Manual Deployment

```bash
cd web-client
npm run build
npx gh-pages -d build
```

---

## Heroku Deployment

### Backend Deployment

1. **Install Heroku CLI**
```bash
brew install heroku/brew/heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App for Backend**
```bash
heroku create ai-consultant-backend
```

4. **Add MongoDB Add-on**
```bash
heroku addons:create mongolab:sandbox
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set ALLOWED_ORIGINS=https://wappsy.github.io
```

6. **Create Procfile for Backend**
Create `backend/Procfile`:
```
web: node src/index.js
```

7. **Deploy Backend**
```bash
git subtree push --prefix backend heroku main
```

### Frontend with Backend URL

Update `web-client/.env.production`:
```
REACT_APP_API_URL=https://ai-consultant-backend.herokuapp.com
```

---

## Vercel Deployment

### Frontend on Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy Web Client**
```bash
cd web-client
vercel --prod
```

3. **Configure Environment Variables in Vercel Dashboard**
- Go to your Vercel project settings
- Add `REACT_APP_API_URL` environment variable

---

## Railway Deployment

Railway is great for backend deployment with database support.

### Backend on Railway

1. **Install Railway CLI**
```bash
brew install railway
```

2. **Login to Railway**
```bash
railway login
```

3. **Initialize Project**
```bash
cd backend
railway init
```

4. **Add MongoDB**
```bash
railway add mongodb
```

5. **Set Environment Variables**
```bash
railway variables set JWT_SECRET=your_secret
railway variables set OPENAI_API_KEY=your_key
```

6. **Deploy**
```bash
railway up
```

---

## Environment Variables

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://...` |
| `JWT_SECRET` | Secret for JWT tokens | `your_secret_key` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) automatically:

1. **On every push/PR**:
   - Installs dependencies
   - Runs tests
   - Builds the application

2. **On push to main**:
   - Deploys frontend to GitHub Pages
   - Can be extended to deploy backend

### Customizing Deployment

Edit `.github/workflows/ci-cd.yml` to add your deployment commands:

```yaml
- name: Deploy Backend
  run: |
    # Add your backend deployment commands
    # Example for Heroku:
    # git push heroku main
```

---

## Database Setup

### MongoDB Atlas (Recommended for Production)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Whitelist your application's IP or use `0.0.0.0/0` for all IPs
5. Update `MONGODB_URI` in your environment variables

---

## SSL/HTTPS Configuration

For production deployments:

1. **GitHub Pages**: Automatically provides HTTPS
2. **Heroku**: Automatically provides HTTPS for `*.herokuapp.com` domains
3. **Custom Domain**: Configure SSL certificate through your hosting provider

---

## Monitoring and Logs

### View Heroku Logs
```bash
heroku logs --tail --app ai-consultant-backend
```

### View Railway Logs
```bash
railway logs
```

### GitHub Actions Logs
Check the "Actions" tab in your GitHub repository.

---

## Troubleshooting

### CORS Issues
Ensure `ALLOWED_ORIGINS` in backend includes your frontend URL.

### Database Connection
Verify `MONGODB_URI` is correct and IP is whitelisted.

### API Key Issues
Check that `OPENAI_API_KEY` is set correctly in your environment.

---

## Scaling

- **Heroku**: Upgrade dyno type or add more dynos
- **Railway**: Automatic scaling based on usage
- **Database**: Upgrade MongoDB Atlas cluster tier

For questions or issues, please open an issue on GitHub.
