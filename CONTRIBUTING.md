# Contributing to USD8

Thank you for your interest in contributing to USD8! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/usd8-init.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit with clear messages
7. Push and create a pull request

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for initial setup.

## Project Structure

```
usd8-init/
├── landing-page/          # Next.js web application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   └── lib/             # Utilities, types, ABIs
├── mobile-app/           # React Native Expo app
│   └── src/
│       ├── components/  # React Native components
│       ├── screens/     # App screens
│       └── lib/        # Shared code
└── shared/              # Code shared between platforms
    └── src/
        ├── abis/       # Smart contract ABIs
        ├── config/     # Configuration
        ├── types/      # TypeScript types
        └── utils/      # Utility functions
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Export types from dedicated files

```typescript
// Good
interface UserBalance {
  deposited: bigint;
  staked: bigint;
}

// Avoid
const balance: any = { ... };
```

### React Components

- Use functional components with hooks
- One component per file
- Use descriptive names
- Add proper prop types

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  // component code
}
```

### Styling

**Web (Tailwind CSS)**
```tsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 rounded-xl">
```

**Mobile (StyleSheet)**
```tsx
// Use StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

### Smart Contract Interactions

- Always use proper error handling
- Show loading states
- Confirm transactions
- Handle edge cases

```typescript
try {
  const tx = await writeContract({
    address: CONTRACTS.USDC,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [spender, amount],
  });
  // Success handling
} catch (error) {
  console.error('Transaction failed:', error);
  // Error handling
}
```

## Testing

### Before Submitting

1. **Build Test**
   ```bash
   # Landing page
   cd landing-page && npm run build
   
   # Mobile app
   cd mobile-app && npm start
   ```

2. **Type Check**
   ```bash
   npm run type-check
   ```

3. **Lint** (if configured)
   ```bash
   npm run lint
   ```

4. **Manual Testing**
   - Test your changes on both light and dark themes
   - Test on mobile and desktop viewports
   - Test Web3 interactions on testnet
   - Check console for errors

### Test Checklist

- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Mobile responsive
- [ ] Web3 functions work (if applicable)

## Pull Request Process

1. **Title**: Clear, descriptive title
   - Good: "Add transaction history component"
   - Bad: "Update stuff"

2. **Description**: Explain what and why
   ```markdown
   ## Changes
   - Added transaction history component
   - Updated API types
   
   ## Why
   Users requested ability to see past transactions
   
   ## Testing
   - Tested on testnet
   - Works with light/dark themes
   - Mobile responsive
   ```

3. **Screenshots**: For UI changes, include before/after screenshots

4. **Breaking Changes**: Clearly mark breaking changes

5. **Link Issues**: Reference related issues

## Types of Contributions

### Bug Fixes

- Include steps to reproduce
- Explain the fix
- Add tests if possible

### New Features

- Discuss in an issue first
- Keep features focused
- Update documentation
- Add examples

### Documentation

- Fix typos
- Improve clarity
- Add examples
- Update guides

### Performance

- Benchmark before/after
- Explain the improvement
- Consider trade-offs

## Specific Guidelines

### Adding a New Component

1. Create component file
2. Add proper TypeScript types
3. Implement the component
4. Add to exports if shared
5. Document props
6. Test thoroughly

### Modifying Smart Contract Integration

1. **NEVER** change contract addresses without team approval
2. Test on testnet first
3. Update ABIs if contract changes
4. Update types
5. Test all affected flows

### Updating Styles

1. Maintain consistency with existing design
2. Test both themes
3. Ensure accessibility
4. Test on mobile

### Modifying Shared Code

Changes to `shared/` affect both platforms:

1. Make the change in `shared/src/`
2. Copy to `landing-page/lib/`
3. Copy to `mobile-app/src/lib/`
4. Test on both platforms

## Common Pitfalls

### Don't

- Commit `node_modules/`
- Commit `.env` files
- Commit build artifacts (`.next/`, `dist/`)
- Make unrelated changes in one PR
- Break existing functionality
- Remove error handling
- Skip testing

### Do

- Write clear commit messages
- Keep PRs focused
- Test your changes
- Update documentation
- Ask questions
- Be patient

## Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email security@usd8.app (if available)
2. Include detailed description
3. Provide steps to reproduce
4. Wait for response before disclosure

### Security Best Practices

- Never commit private keys
- Validate all user inputs
- Sanitize data before display
- Use proper error handling
- Follow Web3 best practices

## Review Process

1. Automated checks run
2. Team reviews code
3. Feedback provided
4. Make requested changes
5. Re-review
6. Merge when approved

## Questions?

- Check existing documentation
- Search existing issues
- Open a new issue
- Join our community [Discord/Telegram]

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## Recognition

Contributors will be acknowledged in:
- README.md (for significant contributions)
- Release notes
- Special thanks section

Thank you for contributing to USD8! 🚀
