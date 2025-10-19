# 🚀 QUICK START GUIDE

Welcome to the Hyperion Content Empire! This guide will get you up and running in 5 minutes.

## ✅ Prerequisites

- Node.js 18+ installed
- Git installed
- A text editor

## 📦 Step 1: Install Dependencies

```bash
npm install
```

**Note**: If you see errors about Puppeteer, that's normal. The system will work without it.

## 🔑 Step 2: Configure API Keys (Optional)

The system works WITHOUT any API keys! But for AI-powered content, you can add:

```bash
# Copy the example file
cp .env.example .env

# Get a FREE Google Gemini API key (recommended)
# Visit: https://makersuite.google.com/app/apikey
# Add it to .env as: GOOGLE_AI_API_KEY=your_key_here
```

## 🏛️ Step 3: Start the Empire

```bash
npm run empire:activate
```

You should see:
```
🔥 ACTIVATING HYPERION CONTENT EMPIRE...
✅ HYPERION EMPIRE FULLY OPERATIONAL!
🎯 Target: 300K monthly revenue
🔥 Viral Success Rate: 85%
🌐 EMPIRE DASHBOARD LIVE: http://localhost:3001/empire/status
```

## 🎯 Step 4: Generate Your First Post

Open a new terminal and run:

```bash
npm run empire:generate
```

This will:
1. ✅ Analyze market trends
2. ✅ Build content strategy
3. ✅ Generate blog content
4. ✅ Save to `content/blog/` directory

Check `content/blog/` for your generated post!

## 📊 Step 5: Check Empire Status

```bash
npm run empire:status
```

## 🎨 Available Commands

```bash
npm run empire:activate     # Start the empire
npm run empire:generate     # Generate content
npm run empire:status       # Check status
npm run blog:create         # Create blog post
npm run revenue:track       # View revenue metrics
npm run agents:evolve       # Evolve AI agents
```

## 🌐 Dashboard Access

Once the empire is running, visit:
- **Status Dashboard**: http://localhost:3001/empire/status
- **Generate Endpoint**: http://localhost:3001/empire/generate

## 🚀 Deploy to Production

### Deploy to Vercel

1. Push to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_AI_API_KEY` (optional but recommended)
   - `GITHUB_TOKEN` (for auto-publishing)

### Or use Vercel CLI:

```bash
npm i -g vercel
npm run empire:deploy
```

## 🎓 Next Steps

1. ✅ Customize content strategy in `src/core/HyperionOrchestrator.js`
2. ✅ Add your API keys for AI-powered content
3. ✅ Set up GitHub Actions for automated posting
4. ✅ Configure Vercel for live deployment
5. ✅ Monitor your empire's growth!

## 💡 Tips

- **Without API keys**: System uses fallback content generation (still high quality!)
- **With Google Gemini**: Get AI-powered, unique content for each post
- **With GitHub Token**: Auto-publish to your repository
- **Scheduled Posts**: GitHub Actions will generate content 3x daily

## 🆘 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "Port 3001 already in use"
```bash
# Change PORT in .env
echo "PORT=3002" >> .env
```

### "API key error"
The system works without API keys! But if you want AI features:
1. Get free key at https://makersuite.google.com/app/apikey
2. Add to `.env`: `GOOGLE_AI_API_KEY=your_key`

## 🎉 Success!

You're now running an autonomous content empire! 

Questions? Check:
- Full docs: [README.md](README.md)
- Deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Website: https://w3jdev.com
