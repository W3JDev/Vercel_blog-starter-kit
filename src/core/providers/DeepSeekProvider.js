#!/usr/bin/env node

/**
 * 🚀 DEEPSEEK AI PROVIDER
 * ======================
 * DeepSeek API provider implementation
 * Uses OpenAI-compatible API interface
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 */

import { AIProvider } from './AIProvider.js';
import { parseModelJsonResponse } from '../utils/parseModelResponse.js';

export class DeepSeekProvider extends AIProvider {
    constructor(apiKey) {
        super('DeepSeek');
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.deepseek.com/v1';
        this.model = 'deepseek-chat'; // Main model
    }

    async isAvailable() {
        if (!this.apiKey) {
            return false;
        }
        
        try {
            // Test API connection with a simple request
            const response = await fetch(`${this.baseUrl}/models`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.ok;
        } catch (error) {
            console.error('⚠️ Failed to verify DeepSeek API:', error.message);
            return false;
        }
    }

    async generateText(prompt) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async generateJSON(prompt) {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that ALWAYS responds with valid JSON. Never include markdown code blocks or explanations, only pure JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000,
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return parseModelJsonResponse(content);
    }
}

export default DeepSeekProvider;
