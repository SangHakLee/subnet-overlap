# Contributing to subnet-overlap

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/SangHakLee/subnet-overlap.git
cd subnet-overlap

# Install dependencies
npm install

# Build TypeScript
npm run build
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run tests and linters
4. Commit your changes following the commit message guidelines
5. Push your branch and create a pull request

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run coverage
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Build TypeScript
npm run build

# Build browser bundle
npm run build:browser
```

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. The format is:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Changes to build process or dependencies
- **ci**: CI configuration changes
- **chore**: Other changes that don't modify src or test files

### Examples

```bash
feat: add IPv6 support
fix: handle edge case for /32 subnets
docs: update installation instructions
test: add more overlap test cases
```

## Git Hooks

This project uses Husky for git hooks:

- **pre-commit**: Runs lint, build, and tests
- **commit-msg**: Validates commit message format
- **pre-push**: Runs coverage check

## Pull Request Process

1. Ensure your code passes all tests and linters
2. Update documentation if needed
3. Follow the commit message guidelines
4. Create a pull request with a clear description
5. Wait for review and address any feedback

## Code Style

- Use TypeScript for new code
- Follow the existing code style
- Use tabs for indentation
- Use single quotes for strings
- No semicolons
- Add JSDoc comments for public APIs

## Testing

- Write tests for new features
- Maintain or improve code coverage
- Test both Node.js and browser environments when applicable
- Include edge cases in your tests

## Questions?

Feel free to open an issue for any questions or concerns.
