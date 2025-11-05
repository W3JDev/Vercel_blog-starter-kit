#!/usr/bin/env node

/**
 * 🐙 GITHUB MODEL AI PROVIDER
 * ============================
 * GitHub Models AI provider implementation
 * Uses Azure AI Inference SDK with GitHub Models endpoint
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 */

import ModelClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { AIProvider } from './AIProvider.js';
import { parseModelJson } from '../utils/parseModelResponse.js';

export class GitHubModelProvider extends AIProvider {
    constructor(githubToken) {
        super('GitHub Models');
        this.githubToken = githubToken;
        this.client = null;
        this.modelName = 'gpt-4o-mini'; // Default to GPT-4o-mini for cost efficiency
        
        if (githubToken) {
            try {
                this.client = ModelClient(
                    'https://models.inference.ai.azure.com',
                    new AzureKeyCredential(githubToken)
                );
            } catch (error) {
                console.error('⚠️ Failed to initialize GitHub Models client:', error.message);
            }
        }
    }

    async isAvailable() {
        if (!this.githubToken || !this.client) {
            return false;
        }

        try {
            // Test with a simple prompt
            const response = await this.client.path('/chat/completions').post({
                body: {
                    messages: [
                        { role: 'user', content: 'Say "OK" if you can read this.' }
                    ],
                    model: this.modelName,
                    max_tokens: 10,
                    temperature: 0.1
                }
            });

            if (response.status !== 200) {
                console.error('⚠️ GitHub Models availability check failed:', response.status);
                return false;
            }

            const result = response.body;
            return result?.choices?.[0]?.message?.content?.length > 0;
        } catch (error) {
            console.error('⚠️ GitHub Models availability check failed:', error.message);
            return false;
        }
    }

    async generateText(prompt) {
        if (!this.client) {
            throw new Error('GitHub Models provider not initialized');
        }

        try {
            const response = await this.client.path('/chat/completions').post({
                body: {
                    messages: [
                        { role: 'system', content: 'You are an expert content creator for enterprise AI and automation solutions.' },
                        { role: 'user', content: prompt }
                    ],
                    model: this.modelName,
                    max_tokens: 4000,
                    temperature: 0.7
                }
            });

            if (response.status !== 200) {
                throw new Error(`GitHub Models API error: ${response.status}`);
            }

            const result = response.body;
            return result.choices[0].message.content;
        } catch (error) {
            console.error('❌ GitHub Models generateText failed:', error.message);
            throw error;
        }
    }

    async generateJSON(prompt) {
        if (!this.client) {
            throw new Error('GitHub Models provider not initialized');
        }

        try {
            const response = await this.client.path('/chat/completions').post({
                body: {
                    messages: [
                        { role: 'system', content: 'You are an expert at generating structured JSON responses. Always return valid JSON.' },
                        { role: 'user', content: prompt }
                    ],
                    model: this.modelName,
                    max_tokens: 4000,
                    temperature: 0.7,
                    response_format: { type: 'json_object' }
                }
            });

            if (response.status !== 200) {
                throw new Error(`GitHub Models API error: ${response.status}`);
            }

            const result = response.body;
            const text = result.choices[0].message.content;
            return parseModelJson(text);
        } catch (error) {
            console.error('❌ GitHub Models generateJSON failed:', error.message);
            throw error;
        }
    }
}

export default GitHubModelProvider;
