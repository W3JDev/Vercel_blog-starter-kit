#!/usr/bin/env node

/**
 * 🤖 AI PROVIDER ABSTRACTION
 * ==========================
 * Base class for AI providers to enable seamless switching between providers
 * 
 * @author Muhammad Nurunnabi (MN Jewel) - W3J LLC
 * @version 1.0.0
 */

export class AIProvider {
    constructor(name, config = {}) {
        this.name = name;
        this.config = config;
    }

    /**
     * Generate content from a text prompt
     * @param {string} prompt - The prompt to generate content from
     * @returns {Promise<string>} - The generated text
     */
    async generateText(prompt) {
        throw new Error('generateText must be implemented by provider');
    }

    /**
     * Generate structured JSON from a prompt
     * @param {string} prompt - The prompt to generate JSON from
     * @returns {Promise<object>} - The parsed JSON object
     */
    async generateJSON(prompt) {
        throw new Error('generateJSON must be implemented by provider');
    }

    /**
     * Check if the provider is available and properly configured
     * @returns {Promise<boolean>} - True if provider is available
     */
    async isAvailable() {
        throw new Error('isAvailable must be implemented by provider');
    }

    /**
     * Get the name of the provider
     * @returns {string} - Provider name
     */
    getName() {
        return this.name;
    }
}

export default AIProvider;
