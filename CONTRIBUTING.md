# Contributing to AI Consultant App

Thank you for your interest in contributing to the AI Consultant App! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- Clear description of the feature
- Use cases and benefits
- Potential implementation approach (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write/update tests** (if applicable)
5. **Run tests**
   ```bash
   cd web-client && npm test
   ```
6. **Commit with clear messages**
   ```bash
   git commit -m "Add: feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** to the `main` branch

## 📝 Code Style

### JavaScript/React
- Use ES6+ syntax
- Use functional components with hooks
- Follow existing code formatting
- Add comments for complex logic
- Use meaningful variable names

### Commit Messages
Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/config changes

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage

## 📦 Project Structure

```
├── backend/          # Express API server
│   ├── src/
│   │   ├── index.js      # Server entry point
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Express middleware
├── web-client/       # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom hooks
│   │   └── __tests__/    # Test files
└── .github/          # GitHub Actions workflows
```

## 🔍 Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Run Tests**
   ```bash
   cd web-client && npm test
   ```

3. **Build for Production**
   ```bash
   cd web-client && npm run build
   ```

## 🐛 Debugging

- Use browser DevTools for frontend issues
- Check terminal logs for backend errors
- Use `console.log()` strategically
- Use React DevTools extension

## 🔐 Security

- Never commit sensitive data (API keys, passwords)
- Use environment variables for secrets
- Report security vulnerabilities privately

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

## ❓ Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🎉
