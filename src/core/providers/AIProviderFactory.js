#!/usr/bin/env node

/**
 * 🏭 AI PROVIDER FACTORY
 * ======================
 * Factory for creating and managing AI providers with automatic fallback
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 */

import { GeminiProvider } from './GeminiProvider.js';
import { GitHubModelProvider } from './GitHubModelProvider.js';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export class AIProviderFactory {
    /**
     * Create an AI provider with automatic fallback
     * Priority: Gemini -> GitHub Models
     */
    static async createProvider() {
        console.log('🏭 AI PROVIDER FACTORY: Initializing provider...');
        
        // Try Gemini first
        const geminiKey = await AIProviderFactory.getGeminiApiKey();
        if (geminiKey) {
            console.log('🧪 Testing Gemini provider...');
            const geminiProvider = new GeminiProvider(geminiKey);
            const geminiAvailable = await geminiProvider.isAvailable();
            
            if (geminiAvailable) {
                console.log('✅ Using Gemini AI for content generation');
                return geminiProvider;
            } else {
                console.log('⚠️ Gemini API key found but provider unavailable, falling back...');
            }
        } else {
            console.log('⚠️ Gemini API key not found, trying fallback...');
        }
        
        // Fallback to GitHub Models
        const githubToken = AIProviderFactory.getGitHubToken();
        if (githubToken) {
            console.log('🧪 Testing GitHub Models provider...');
            const githubProvider = new GitHubModelProvider(githubToken);
            const githubAvailable = await githubProvider.isAvailable();
            
            if (githubAvailable) {
                console.log('✅ Using GitHub Models AI for content generation');
                return githubProvider;
            } else {
                console.log('⚠️ GitHub token found but provider unavailable');
            }
        } else {
            console.log('⚠️ GitHub token not found');
        }
        
        // No provider available
        throw new Error('No AI provider available. Please configure either GEMINI_API_KEY/GOOGLE_AI_API_KEY or GITHUB_TOKEN.');
    }

    /**
     * Get Gemini API key from environment or Secret Manager
     */
    static async getGeminiApiKey() {
        // First try environment variable (local development)
        console.log('🔍 Checking for Gemini API key in environment...');
        
        const envApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
        if (envApiKey) {
            console.log('✅ Found Gemini API key in environment');
            return envApiKey;
        }

        // Fallback to Google Cloud Secret Manager (production)
        try {
            // Use configurable project ID or fall back to default
            const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'stellar-state-471406-f8';
            const secretName = process.env.GEMINI_SECRET_NAME || 'GEMINI_API_KEY';
            const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
            
            const client = new SecretManagerServiceClient();
            console.log('🔍 Checking Google Cloud Secret Manager...');
            
            const [version] = await client.accessSecretVersion({ name });
            const payload = version.payload.data.toString();
            console.log('✅ Found Gemini API key in Secret Manager');
            return payload;
        } catch (error) {
            console.log('⚠️ Failed to access Gemini API key from Secret Manager:', error.message);
            return null;
        }
    }

    /**
     * Get GitHub token from environment
     */
    static getGitHubToken() {
        console.log('🔍 Checking for GitHub token in environment...');
        
        const token = process.env.GITHUB_TOKEN || process.env.BLOG_GITHUB_TOKEN;
        if (token) {
            console.log('✅ Found GitHub token in environment');
            return token;
        }
        
        console.log('⚠️ GitHub token not found in environment');
        return null;
    }
}

export default AIProviderFactory;
