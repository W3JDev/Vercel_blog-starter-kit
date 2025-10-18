# 🚀 DEPLOYMENT GUIDE

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your API keys
# At minimum, you need GOOGLE_AI_API_KEY for free tier
```

### 3. Get Free API Keys

#### Google Gemini (FREE - Recommended)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a free API key
3. Add to `.env` as `GOOGLE_AI_API_KEY`

#### Optional (For enhanced features)
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/
- **GitHub Token**: https://github.com/settings/tokens

### 4. Run the Empire
```bash
# Start the empire
npm run empire:activate

# Or use any command from package.json:
npm run empire:status     # Check status
npm run empire:generate   # Generate content
npm run blog:create       # Create blog post
npm run agents:evolve     # Evolve agents
```

## Vercel Deployment

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/W3JDev/Vercel_blog-starter-kit)

### Option 2: Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
npm run empire:deploy
```

### Configure Environment Variables in Vercel
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `GOOGLE_AI_API_KEY` (Required)
   - `GITHUB_TOKEN` (Required for auto-publishing)
   - `OPENAI_API_KEY` (Optional)
   - `ANTHROPIC_API_KEY` (Optional)

## GitHub Actions (Auto Deployment)

The repository includes GitHub Actions for:
- ✅ Automatic deployment on push to main
- ✅ Scheduled content generation (3x daily)
- ✅ Auto-commit and deploy new content

### Setup GitHub Actions
1. Add secrets to your repository:
   - `GOOGLE_AI_API_KEY`
   - `GITHUB_TOKEN` (automatically available)

2. Enable Actions in repository settings

## Testing

### Test Local Installation
```bash
# Check if dependencies are installed
npm list --depth=0

# Test the orchestrator
node src/core/HyperionOrchestrator.js
```

### Test API Endpoints
```bash
# Start the empire
npm run empire:activate

# In another terminal, test endpoints:
curl http://localhost:3001/empire/status
curl http://localhost:3001/empire/generate
```

## Troubleshooting

### "Cannot find package 'dotenv'"
```bash
npm install
```

### "API key not found"
```bash
# Make sure .env file exists and contains keys
cp .env.example .env
# Edit .env with your keys
```

### "Permission denied"
```bash
# Make scripts executable
chmod +x src/scripts/*.js
chmod +x src/agents/*.js
```

## Architecture

```
🏛️ HYPERION EMPIRE
├── src/
│   ├── core/
│   │   └── HyperionOrchestrator.js  (Main orchestrator)
│   ├── agents/
│   │   ├── ContentGenerator.js
│   │   └── ConsciousnessEvolution.js
│   ├── scripts/
│   │   └── activateEmpire.js
│   ├── content/
│   │   └── BlogCreator.js
│   ├── revenue/
│   │   └── RevenueTracker.js
│   └── monitoring/
│       └── EmpireStatus.js
├── content/
│   └── blog/  (Generated blog posts)
├── .env  (Your configuration)
└── vercel.json  (Deployment config)
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure API keys
3. ✅ Test locally
4. ✅ Deploy to Vercel
5. ✅ Set up GitHub Actions
6. 🚀 Watch your empire grow!

## Support

For issues or questions:
- 📧 Email: contact@w3jllc.com
- 🌐 Website: https://w3jdev.com
- 🐙 GitHub: https://github.com/W3JDev/Vercel_blog-starter-kit
