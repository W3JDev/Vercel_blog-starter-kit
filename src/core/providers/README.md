# AI Provider System

## Overview

The Hyperion Content Empire uses a flexible AI provider system with automatic fallback to ensure uninterrupted content generation.

## Provider Selection Mechanism

The system attempts to use providers in the following priority order:

1. **Google Gemini AI** (Primary)
   - Tries environment variable: `GEMINI_API_KEY` or `GOOGLE_AI_API_KEY`
   - Falls back to Google Cloud Secret Manager (production)
   - Model: `gemini-2.5-flash`

2. **GitHub Models AI** (Fallback)
   - Uses: `GITHUB_TOKEN` environment variable
   - Endpoint: Azure AI Inference API via GitHub Models
   - Model: `gpt-4o-mini`

## Configuration

### Environment Variables

```bash
# Primary Provider (Gemini)
GOOGLE_AI_API_KEY=your_gemini_api_key_here
# or
GEMINI_API_KEY=your_gemini_api_key_here

# Fallback Provider (GitHub Models)
GITHUB_TOKEN=your_github_token_here
```

### Getting API Keys

#### Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create or select a project
3. Generate an API key
4. Set as `GOOGLE_AI_API_KEY` in your environment

#### GitHub Token (for GitHub Models)
1. Visit [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Create a Personal Access Token (Classic or Fine-grained)
3. Required scopes:
   - `repo` (for repository publishing)
   - `model.request` (for GitHub Models access)
4. Set as `GITHUB_TOKEN` in your environment

## How It Works

### Automatic Fallback Logic

```javascript
// 1. Try Gemini first
const geminiProvider = new GeminiProvider(geminiKey);
if (await geminiProvider.isAvailable()) {
  return geminiProvider; // ✅ Use Gemini
}

// 2. Fallback to GitHub Models
const githubProvider = new GitHubModelProvider(githubToken);
if (await githubProvider.isAvailable()) {
  return githubProvider; // ✅ Use GitHub Models
}

// 3. Error if no provider available
throw new Error('No AI provider available');
```

### Provider Detection

Each provider implements an `isAvailable()` method that:
- Checks if credentials are configured
- Tests the API with a simple request
- Returns `true` if the provider can be used

### Logging

The system provides clear logging to indicate which provider is active:

```
🏭 AI PROVIDER FACTORY: Initializing provider...
🧪 Testing Gemini provider...
⚠️ Gemini API key found but provider unavailable, falling back...
🧪 Testing GitHub Models provider...
✅ Using GitHub Models AI for content generation
🤖 Active AI Provider: GitHub Models
```

## Adding New Providers

To add a new AI provider:

1. Create a new class extending `AIProvider`:

```javascript
import { AIProvider } from './AIProvider.js';

export class MyProvider extends AIProvider {
  constructor(apiKey) {
    super('My Provider');
    this.apiKey = apiKey;
  }

  async generateText(prompt) {
    // Implementation
  }

  async generateJSON(prompt) {
    // Implementation
  }

  async isAvailable() {
    // Test if provider is working
  }
}
```

2. Update `AIProviderFactory` to include the new provider in the fallback chain.

## Architecture

```
AIProvider (Base Class)
├── GeminiProvider
├── GitHubModelProvider
└── [Future providers...]

AIProviderFactory
└── Creates and tests providers in priority order

HyperionOrchestrator
└── Uses provider returned by factory
```

## Benefits

- ✅ **Resilient**: Automatic fallback ensures content generation continues
- ✅ **Flexible**: Easy to add new providers
- ✅ **Transparent**: Clear logging shows which provider is active
- ✅ **Testable**: Each provider has availability checking
- ✅ **Backward Compatible**: Existing Gemini setup continues to work

## Troubleshooting

### No provider available error

```
Error: No AI provider available. Please configure either GEMINI_API_KEY/GOOGLE_AI_API_KEY or GITHUB_TOKEN.
```

**Solution**: Set at least one of the required environment variables.

### Gemini provider fails but GitHub Models not used

Check that:
1. `GITHUB_TOKEN` is set in your environment
2. Token has `model.request` scope
3. Your GitHub account has access to GitHub Models

### Both providers fail

This usually indicates:
1. Invalid or expired API keys/tokens
2. Network connectivity issues
3. API service outages

Check the logs for specific error messages from each provider.
