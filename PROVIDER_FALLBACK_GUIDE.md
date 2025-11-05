# GitHub Models AI Fallback Implementation

## Summary

This implementation adds automatic fallback to GitHub Models AI when the Gemini API key is unavailable or invalid, ensuring uninterrupted content generation in the Hyperion Content Empire.

## Changes Made

### 1. New Provider Architecture

Created a modular AI provider system:

```
src/core/providers/
├── AIProvider.js              # Base provider interface
├── GeminiProvider.js          # Google Gemini implementation
├── GitHubModelProvider.js     # GitHub Models implementation
├── AIProviderFactory.js       # Factory with fallback logic
└── README.md                  # Provider documentation
```

### 2. Updated Core System

- **HyperionOrchestrator.js**: Refactored to use provider abstraction
  - Removed hardcoded Gemini dependency
  - Now accepts any AIProvider instance
  - All agents updated to use `aiProvider.generateText()` and `aiProvider.generateJSON()`

### 3. Automatic Fallback Logic

Provider selection priority:
1. **Google Gemini** (if `GEMINI_API_KEY` or `GOOGLE_AI_API_KEY` available)
2. **GitHub Models** (if `GITHUB_TOKEN` available and valid)

Each provider is tested for availability before use:
```javascript
const geminiProvider = new GeminiProvider(apiKey);
if (await geminiProvider.isAvailable()) {
  return geminiProvider; // ✅ Use Gemini
}

const githubProvider = new GitHubModelProvider(token);
if (await githubProvider.isAvailable()) {
  return githubProvider; // ✅ Use GitHub Models
}

throw new Error('No AI provider available'); // ❌ Neither works
```

### 4. Enhanced Logging

Clear logging shows which provider is active:

```
🏭 AI PROVIDER FACTORY: Initializing provider...
🧪 Testing Gemini provider...
⚠️ Gemini API key found but provider unavailable, falling back...
🧪 Testing GitHub Models provider...
✅ Using GitHub Models AI for content generation
🤖 Active AI Provider: GitHub Models
```

### 5. Dependencies Added

```json
{
  "@azure-rest/ai-inference": "^1.0.0",
  "@azure/core-auth": "^1.9.0",
  "@azure/core-sse": "^2.4.0"
}
```

### 6. Updated Documentation

- `.env.example`: Updated with GitHub token requirements
- `README.md`: Added provider fallback information
- `src/core/providers/README.md`: Complete provider documentation

### 7. New Tests

- `test/aiProvider.test.js`: Unit tests for provider system (14 tests)
- `test/integration.test.js`: Integration test for fallback logic
- Updated `package.json` test script to run all tests

## Migration Guide

### For Existing Users (Have Gemini API Key)

**No action required!** The system will continue using Gemini as before.

### For Users Without Gemini API Key

1. Get a GitHub Personal Access Token:
   - Visit https://github.com/settings/tokens
   - Create a new token (Classic or Fine-grained)
   - Grant scopes:
     - `repo` (for content publishing)
     - `model.request` (for GitHub Models access)

2. Set the token in your environment:
   ```bash
   export GITHUB_TOKEN=ghp_your_token_here
   ```

3. The system will automatically use GitHub Models for content generation.

### For CI/CD (GitHub Actions)

Update workflow secrets:
- Ensure `GITHUB_TOKEN` secret is set in repository settings
- The workflow file already includes `GITHUB_TOKEN: ${{ secrets.BLOG_GITHUB_TOKEN }}`

## Testing

### Run All Tests

```bash
npm test
```

### Run Integration Test

```bash
npm run test:integration
```

### Manual Testing

```bash
# Without any API keys (should fail gracefully)
unset GEMINI_API_KEY GOOGLE_AI_API_KEY GITHUB_TOKEN
npm run empire:generate

# With only GitHub token (should use GitHub Models)
export GITHUB_TOKEN=your_token_here
npm run empire:generate

# With Gemini key (should use Gemini)
export GEMINI_API_KEY=your_key_here
npm run empire:generate
```

## Benefits

✅ **Resilient**: Content generation continues even if Gemini is unavailable
✅ **Flexible**: Easy to add new providers in the future
✅ **Backward Compatible**: Existing Gemini configurations work unchanged
✅ **Transparent**: Clear logging shows which provider is active
✅ **Tested**: Comprehensive test coverage for all scenarios

## Troubleshooting

### Error: "No AI provider available"

**Cause**: Neither Gemini nor GitHub Models credentials are configured.

**Solution**: Set at least one of:
- `GEMINI_API_KEY` or `GOOGLE_AI_API_KEY`
- `GITHUB_TOKEN` with model access

### GitHub Models returns 401/403

**Cause**: GitHub token lacks `model.request` scope.

**Solution**: Regenerate token with required scopes:
1. Go to https://github.com/settings/tokens
2. Delete old token
3. Create new token with `model.request` scope

### Both providers fail

**Possible causes**:
1. Invalid/expired credentials
2. Network connectivity issues
3. API service outages

**Solution**: Check logs for specific error messages and verify credentials.

## Future Enhancements

Potential future additions:
- OpenAI provider
- Anthropic Claude provider
- Azure OpenAI provider
- Custom provider configuration via environment

## Support

For issues or questions:
- Review provider documentation: `src/core/providers/README.md`
- Check test examples: `test/aiProvider.test.js`
- Review integration test: `test/integration.test.js`
