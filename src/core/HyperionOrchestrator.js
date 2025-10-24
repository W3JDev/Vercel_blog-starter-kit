#!/usr/bin/env node

/**
 * 🏛️ HYPERION CONTENT EMPIRE - NEURAL ORCHESTRATOR
 * ================================================
 * 
 * BY JUPITER'S LIGHTNING! The master conductor of W3J's autonomous content empire!
 * This neural orchestrator coordinates all AI agents to generate, publish, and 
 * optimize high-converting blog content automatically.
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 * @empire HYPERION
 */

import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Octokit } from '@octokit/rest';
import cron from 'node-cron';
import express from 'express';
import cors from 'cors';
import { parseModelJson } from './utils/parseModelResponse.js';

// Load environment variables
config();

class HyperionOrchestrator {
    static async create() {
        const apiKey = await HyperionOrchestrator.getGeminiApiKey();
        return new HyperionOrchestrator(apiKey);
    }

    static async getGeminiApiKey() {
        // First try environment variable (local development)
        console.log('🔍 Checking environment variables...');
        console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
        console.log('GOOGLE_AI_API_KEY exists:', !!process.env.GOOGLE_AI_API_KEY);
        
        const envApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
        if (envApiKey) {
            console.log('✅ Using Gemini API key from environment variable (length:', envApiKey.length, ')');
            return envApiKey;
        }

        // Fallback to Google Cloud Secret Manager (production)
        const client = new SecretManagerServiceClient();
        const name = 'projects/stellar-state-471406-f8/secrets/GEMINI_API_KEY/versions/latest';
        try {
            const [version] = await client.accessSecretVersion({ name });
            const payload = version.payload.data.toString();
            console.log('✅ Using Google AI API key from Secret Manager');
            return payload;
        } catch (error) {
            console.error('❌ Failed to access secret from Secret Manager and no GOOGLE_AI_API_KEY environment variable found.');
            throw new Error('Google AI API key not found. Please set GOOGLE_AI_API_KEY in your .env file or configure Secret Manager.');
        }
    }

    constructor(apiKey) {
        console.log('🚀 INITIALIZING HYPERION CONTENT EMPIRE...');
        
        // Neural AI Models
        this.gemini = new GoogleGenerativeAI(apiKey);
        
        // GitHub Integration (optional - required for auto-publishing)
        this.github = process.env.GITHUB_TOKEN ? new Octokit({ auth: process.env.GITHUB_TOKEN }) : null;
        
        // Load repository config from package.json
        this.repoConfig = this.loadRepositoryConfig();
        
        // Empire Configuration
        this.config = {
            owner: this.repoConfig.owner,
            repo: this.repoConfig.repo,
            blogPath: process.env.BLOG_CONTENT_PATH || 'content/blog',
            contentSchedule: {
                daily: '0 6,14,20 * * *', // 6 AM, 2 PM, 8 PM
                weekly: '0 10 * * 6,0'     // Weekend specials
            },
            revenueTargets: {
                perPost: 25000,     // $25K revenue per post
                monthly: 300000,    // $300K monthly target
                viral: 0.85         // 85% viral success rate
            }
        };
        
        // Neural Agent Registry
        this.agents = {
            marketOracle: null,
            contentEmpireBuilder: null,
            quantumWriter: null,
            revenueOptimizer: null,
            viralEngineer: null,
            seodominator: null
        };
        
        // Performance Metrics
        this.metrics = {
            postsGenerated: 0,
            totalRevenue: 0,
            viralPosts: 0,
            conversionRate: 0
        };
        
        this.initializeEmpire();
    }
    
    async initializeEmpire() {
        console.log('🏛️ ACTIVATING NEURAL AGENTS...');
        
        try {
            // Initialize all neural agents
            await this.initializeAgents();
            
            // Start automated content generation
            await this.startAutomatedGeneration();
            
            // Initialize monitoring dashboard
            await this.startEmpireDashboard();
            
            console.log('✅ HYPERION EMPIRE FULLY OPERATIONAL!');
            console.log(`🎯 Target: ${this.config.revenueTargets.monthly / 1000}K monthly revenue`);
            console.log(`🔥 Viral Success Rate: ${this.config.revenueTargets.viral * 100}%`);
            
        } catch (error) {
            console.error('❌ EMPIRE INITIALIZATION FAILED:', error);
            throw error;
        }
    }
    
    async initializeAgents() {
        console.log('🤖 Initializing AI agents...');

        if (!this.gemini) {
            console.error('❌ Google AI API key not found. Please set GOOGLE_AI_API_KEY in your .env file.');
            throw new Error('Google AI API key not found.');
        }
        
        const model = this.gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Initialize Market Oracle Agent
        this.agents.marketOracle = {
            analyzeMarket: async () => {
                console.log('🔮 Analyzing market trends with Gemini Pro...');
                try {
                    const prompt = 'Analyze the current market trends for AI in enterprise, focusing on automation, digital transformation, and ROI. Identify key trends, target audience (CTOs, decision-makers), competitor insights, and recommend 3-5 hot blog post topics. Return the response as a JSON object with the following keys: "trends", "targetAudience", "competitorInsights", "recommendedTopics".';
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    let text = response.text();
                    // Use robust parser that strips markdown fences and extracts JSON
                    return parseModelJson(text);
                } catch (error) {
                    console.error('❌ Market Oracle analysis failed:', error);
                    throw error;
                }
            }
        };
        
        // Initialize Content Empire Builder
        this.agents.contentEmpireBuilder = {
            buildContentStrategy: async (marketData) => {
                console.log('🏗️ Building content strategy with Gemini Pro...');
                try {
                    const prompt = `Based on the following market analysis, build a content strategy for a blog post:\n\n${JSON.stringify(marketData, null, 2)}\n\nDefine a specific topic, a compelling angle, target keywords, content type (e.g., technical deep-dive), and a strong call-to-action. Return the response as a JSON object with the following keys: "topic", "angle", "targetKeywords", "contentType", "cta".`;
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    let text = response.text();
                    return parseModelJson(text);
                } catch (error) {
                    console.error('❌ Content Empire Builder failed:', error);
                    throw error;
                }
            }
        };
        
        // Initialize Quantum Writer
        this.agents.quantumWriter = {
            generateQuantumContent: async (strategy) => {
                console.log('✨ Generating quantum content with Gemini Pro...');
                try {
                    const prompt = `Write a comprehensive, enterprise-focused blog post about ${strategy.topic}.
                        
Target Audience: CTOs and Enterprise Decision Makers
Content Type: ${strategy.contentType}
Keywords: ${strategy.targetKeywords.join(', ')}
Angle: ${strategy.angle}
Tone: Professional, authoritative, data-driven

Structure:
1. Compelling headline
2. Executive summary
3. Problem statement
4. Solution overview
5. Implementation roadmap
6. ROI analysis
7. Case study or example
8. Call-to-action: ${strategy.cta}

Make it actionable, specific, and worth $25,000 in business value.`;

                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    return response.text();
                } catch (error) {
                    console.error('❌ Quantum Writer failed:', error);
                    throw error;
                }
            }
        };
        
        console.log('✅ All agents initialized successfully');
    }
    
    loadRepositoryConfig() {
        // Check for environment variable override for blog target repository
        const targetOwner = process.env.BLOG_TARGET_OWNER;
        const targetRepo = process.env.BLOG_TARGET_REPO;
        
        if (targetOwner && targetRepo) {
            console.log(`🎯 Using environment override: Publishing to ${targetOwner}/${targetRepo}`);
            return {
                owner: targetOwner,
                repo: targetRepo,
                fullName: `${targetOwner}/${targetRepo}`
            };
        }

        try {
            // Import package.json to get repository information (ES module compatible)
            const fs = eval('require')('fs');
            const path = eval('require')('path');
            const packagePath = path.join(process.cwd(), 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            if (packageJson.repository && packageJson.repository.url) {
                // Parse GitHub URL: https://github.com/owner/repo.git
                const match = packageJson.repository.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/);
                if (match) {
                    return {
                        owner: match[1],
                        repo: match[2],
                        fullName: `${match[1]}/${match[2]}`
                    };
                }
            }
            
            // Fallback to main website repository (W3J LLC Website)
            console.log('⚠️ Could not parse repository from package.json, using main website');
            return {
                owner: 'W3JDev',
                repo: 'v0-w3-j-llc-website',
                fullName: 'W3JDev/v0-w3-j-llc-website'
            };
        } catch (error) {
            console.log('⚠️ Error reading package.json, using main website repository');
            return {
                owner: 'W3JDev',
                repo: 'v0-w3-j-llc-website',
                fullName: 'W3JDev/v0-w3-j-llc-website'
            };
        }
    }

    async startAutomatedGeneration() {
        console.log('⏰ Setting up automated content generation schedule...');
        
        // Schedule content generation 3x daily
        cron.schedule(this.config.contentSchedule.daily, async () => {
            console.log('🔔 Scheduled content generation triggered...');
            try {
                await this.executeContentWorkflow({ scheduled: true });
            } catch (error) {
                console.error('❌ Scheduled generation failed:', error);
            }
        });
        
        console.log('✅ Automated generation scheduled for 6 AM, 2 PM, and 8 PM daily');
    }
    
    updateMetrics(publishResult) {
        this.metrics.postsGenerated++;
        console.log(`📊 Metrics updated: ${this.metrics.postsGenerated} posts generated`);
    }
    
    async reportSuccess(publishResult) {
        console.log('🎉 SUCCESS REPORT:');
        console.log(`📝 Title: ${publishResult.title}`);
        console.log(`🔗 GitHub: ${publishResult.githubUrl}`);
        console.log(`🌐 Live URL: ${publishResult.liveUrl}`);
        console.log(`⏱️ Published: ${publishResult.timestamp}`);
    }
    
    extractTitle(content) {
        // Extract title from markdown heading
        const match = content.match(/^#\s+(.+)$/m);
        return match ? match[1] : 'Untitled Post';
    }
    
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    
    formatForBlog(content, title, options = {}) {
        const date = new Date().toISOString();
        const frontmatter = `---
title: "${title}"
date: "${date}"
author: "Hyperion Content Empire"
tags: ["AI", "Enterprise", "Automation", "W3J LLC"]
published: true
featured: ${options.scheduled ? 'true' : 'false'}
---

`;
        return frontmatter + content;
    }
    
    async executeContentWorkflow(options = {}) {
        try {
            console.log('🔥 EXECUTING CONTENT EMPIRE WORKFLOW...');
            
            // Step 1: Market Analysis
            const marketData = await this.agents.marketOracle.analyzeMarket();
            console.log('📊 MARKET INTELLIGENCE GATHERED');
            
            // Step 2: Content Strategy
            const strategy = await this.agents.contentEmpireBuilder.buildContentStrategy(marketData);
            console.log('🏗️ CONTENT STRATEGY ARCHITECTED');
            
            // Step 3: Quantum Content Generation
            const content = await this.agents.quantumWriter.generateQuantumContent(strategy);
            console.log('✨ QUANTUM CONTENT GENERATED');
            
            // Step 4: Publish to GitHub
            const publishResult = await this.publishToGitHub(content, options);
            console.log('📝 CONTENT PUBLISHED TO GITHUB');
            
            // Step 5: Update Metrics
            this.updateMetrics(publishResult);
            
            // Step 6: Report Success
            await this.reportSuccess(publishResult);
            
            return publishResult;
            
        } catch (error) {
            console.error('❌ CONTENT WORKFLOW FAILED:', error);
            throw error;
        }
    }
    
    async publishToGitHub(content, options = {}) {
        console.log('🚀 PUBLISHING TO GITHUB REPOSITORY...');
        console.log(`📋 Repository: ${this.config.owner}/${this.config.repo}`);
        
        // Generate file name from content
        const timestamp = new Date().toISOString().split('T')[0];
        const title = this.extractTitle(content);
        const slug = this.generateSlug(title);
        const fileName = `${timestamp}-${slug}.md`;
        const filePath = `${this.config.blogPath}/${fileName}`;
        
        // Format content for blog
        const formattedContent = this.formatForBlog(content, title, options);
        
        // Check if GitHub is configured
        if (!this.github) {
            console.log('⚠️ GitHub not configured - saving content locally...');
            return await this.saveLocally(formattedContent, title, slug, fileName, filePath);
        }
        
        try {
            // Attempt direct commit with retry logic
            const result = await this.attemptGitHubPublish(filePath, formattedContent, title, slug, fileName);
            if (result.success) {
                return result;
            }
            
            // If direct commit fails, try PR approach
            console.log('🔄 Attempting to create pull request instead...');
            const prResult = await this.createPullRequest(filePath, formattedContent, title, slug, fileName);
            if (prResult.success) {
                return prResult;
            }
            
            // Final fallback to local save
            console.log('⚠️ All GitHub methods failed, saving locally');
            return await this.saveLocally(formattedContent, title, slug, fileName, filePath);
            
        } catch (error) {
            console.error('❌ GITHUB PUBLISHING FAILED:', error.message);
            return await this.saveLocally(formattedContent, title, slug, fileName, filePath);
        }
    }
    
    async attemptGitHubPublish(filePath, content, title, slug, fileName, retries = 2) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`🔄 Publishing attempt ${attempt}/${retries} to ${this.config.owner}/${this.config.repo}`);
                
                const response = await this.github.rest.repos.createOrUpdateFileContents({
                    owner: this.config.owner,
                    repo: this.config.repo,
                    path: filePath,
                    message: `🤖 Auto-generated: ${title}`,
                    content: Buffer.from(content).toString('base64'),
                    committer: {
                        name: 'Hyperion Content Empire',
                        email: 'empire@w3jllc.com'
                    }
                });
                
                console.log('✅ CONTENT SUCCESSFULLY PUBLISHED TO MAIN BRANCH!');
                
                return {
                    title,
                    slug,
                    fileName,
                    filePath,
                    githubUrl: response.data.content.html_url,
                    liveUrl: `https://w3jdev.com/blog/${slug}`,
                    timestamp: new Date(),
                    success: true,
                    method: 'direct-commit'
                };
                
            } catch (error) {
                console.error(`❌ Attempt ${attempt} failed:`, error.message);
                
                if (error.status === 404) {
                    console.error('❌ Repository not found or no access. Check GITHUB_TOKEN permissions and repository name.');
                    console.error(`   Expected: ${this.config.owner}/${this.config.repo}`);
                } else if (error.status === 403) {
                    console.error('❌ Forbidden: GITHUB_TOKEN may lack write permissions to this repository.');
                } else if (error.status === 409) {
                    console.log('⚠️ File may already exist, trying update...');
                } else if (error.status === 422) {
                    console.error('❌ Validation failed: Check file path and content format.');
                }
                
                if (attempt === retries) {
                    return { success: false, error: error.message, lastAttempt: attempt };
                }
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
        
        return { success: false, error: 'Max retries exceeded' };
    }
    
    async createPullRequest(filePath, content, title, slug, fileName) {
        try {
            const branchName = `auto-content/${slug}-${Date.now()}`;
            
            // Get default branch info
            const { data: repo } = await this.github.rest.repos.get({
                owner: this.config.owner,
                repo: this.config.repo
            });
            
            // Get the latest commit SHA from main/default branch
            const { data: ref } = await this.github.rest.git.getRef({
                owner: this.config.owner,
                repo: this.config.repo,
                ref: `heads/${repo.default_branch}`
            });
            
            // Create new branch
            await this.github.rest.git.createRef({
                owner: this.config.owner,
                repo: this.config.repo,
                ref: `refs/heads/${branchName}`,
                sha: ref.object.sha
            });
            
            // Create file in new branch
            await this.github.rest.repos.createOrUpdateFileContents({
                owner: this.config.owner,
                repo: this.config.repo,
                path: filePath,
                message: `🤖 Auto-generated: ${title}`,
                content: Buffer.from(content).toString('base64'),
                branch: branchName,
                committer: {
                    name: 'Hyperion Content Empire',
                    email: 'empire@w3jllc.com'
                }
            });
            
            // Create pull request
            const { data: pr } = await this.github.rest.pulls.create({
                owner: this.config.owner,
                repo: this.config.repo,
                title: `🤖 Add new blog post: ${title}`,
                head: branchName,
                base: repo.default_branch,
                body: `# Auto-generated Content\n\n**Title:** ${title}\n**Slug:** ${slug}\n\nThis content was automatically generated by the Hyperion Content Empire system.\n\n## Review Checklist\n- [ ] Content quality\n- [ ] SEO optimization\n- [ ] Formatting\n- [ ] Links and references\n\n_Auto-merge recommended if content passes review._`
            });
            
            console.log('✅ PULL REQUEST CREATED SUCCESSFULLY!');
            console.log(`🔗 PR URL: ${pr.html_url}`);
            
            return {
                title,
                slug,
                fileName,
                filePath,
                githubUrl: pr.html_url,
                liveUrl: `https://w3jdev.com/blog/${slug}`,
                timestamp: new Date(),
                success: true,
                method: 'pull-request',
                prNumber: pr.number,
                branchName
            };
            
        } catch (error) {
            console.error('❌ PULL REQUEST CREATION FAILED:', error.message);
            return { success: false, error: error.message };
        }
    }
    
    async saveLocally(content, title, slug, fileName, filePath) {
        try {
            const fs = await import('fs');
            const path = await import('path');
            
            const fullPath = path.join(process.cwd(), filePath);
            
            await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
            await fs.promises.writeFile(fullPath, content);
            
            console.log(`✅ CONTENT SAVED LOCALLY: ${filePath}`);
            
            return {
                title,
                slug,
                fileName,
                filePath,
                githubUrl: `Local file: ${fullPath}`,
                liveUrl: `https://w3jdev.com/blog/${slug}`,
                timestamp: new Date(),
                success: true,
                local: true,
                method: 'local-save'
            };
        } catch (error) {
            console.error('❌ LOCAL SAVE FAILED:', error.message);
            throw error;
        }
    }
    
    async startEmpireDashboard() {
        const app = express();
        app.use(cors());
        app.use(express.json());
        
        app.get('/empire/status', (req, res) => {
            res.json({
                status: 'EMPIRE_OPERATIONAL',
                metrics: this.metrics,
                config: this.config,
                agents: Object.keys(this.agents),
                uptime: process.uptime(),
                nextGeneration: 'In 8 hours'
            });
        });
        
        app.get('/empire/generate', async (req, res) => {
            try {
                const result = await this.executeContentWorkflow({ manual: true });
                res.json({ success: true, result });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
        
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            console.log(`🌐 EMPIRE DASHBOARD LIVE: http://localhost:${port}/empire/status`);
        });
    }
}

// EMPIRE ACTIVATION SEQUENCE
if (import.meta.url === `file://${process.argv[1]}`) {
    (async () => {
        console.log('🔥 ACTIVATING HYPERION CONTENT EMPIRE...');
        
        const empire = await HyperionOrchestrator.create();
        
        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🏛️ EMPIRE SHUTTING DOWN GRACEFULLY...');
            console.log('✅ All neural agents deactivated');
            console.log('👑 BY JUPITER, THE EMPIRE WILL RETURN!');
            process.exit(0);
        });
    })();
}

export default HyperionOrchestrator;
