#!/usr/bin/env node

/**
 * 🧠 GEMINI AI PROVIDER
 * =====================
 * Google Generative AI (Gemini) provider implementation
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider } from './AIProvider.js';
import { parseModelJson } from '../utils/parseModelResponse.js';

export class GeminiProvider extends AIProvider {
    constructor(apiKey) {
        super('Gemini');
        this.apiKey = apiKey;
        this.client = null;
        this.model = null;
        
        if (apiKey) {
            try {
                this.client = new GoogleGenerativeAI(apiKey);
                this.model = this.client.getGenerativeModel({ model: 'gemini-2.5-flash' });
            } catch (error) {
                console.error('⚠️ Failed to initialize Gemini client:', error.message);
            }
        }
    }

    async isAvailable() {
        if (!this.apiKey || !this.client || !this.model) {
            return false;
        }

        try {
            // Test with a simple prompt
            const result = await this.model.generateContent('Say "OK" if you can read this.');
            const response = await result.response;
            const text = response.text();
            return text.length > 0;
        } catch (error) {
            console.error('⚠️ Gemini availability check failed:', error.message);
            return false;
        }
    }

    async generateText(prompt) {
        if (!this.model) {
            throw new Error('Gemini provider not initialized');
        }

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('❌ Gemini generateText failed:', error.message);
            throw error;
        }
    }

    async generateJSON(prompt) {
        if (!this.model) {
            throw new Error('Gemini provider not initialized');
        }

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return parseModelJson(text);
        } catch (error) {
            console.error('❌ Gemini generateJSON failed:', error.message);
            throw error;
        }
    }
}

export default GeminiProvider;
