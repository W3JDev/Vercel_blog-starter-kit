#!/usr/bin/env node

/**
 * 🧪 AI PROVIDER TESTS
 * ====================
 * Tests for AI provider system with fallback logic
 */

import { AIProvider } from '../src/core/providers/AIProvider.js';
import { GeminiProvider } from '../src/core/providers/GeminiProvider.js';
import { GitHubModelProvider } from '../src/core/providers/GitHubModelProvider.js';
import { AIProviderFactory } from '../src/core/providers/AIProviderFactory.js';

// Test counter
let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log('✅', message);
        passed++;
    } else {
        console.log('❌', message);
        failed++;
    }
}

console.log('🧪 Running AI Provider Tests\n');

// Test 1: Base AIProvider throws errors for unimplemented methods
try {
    const baseProvider = new AIProvider('Test');
    let errorThrown = false;
    try {
        await baseProvider.generateText('test');
    } catch (e) {
        errorThrown = e.message.includes('generateText must be implemented');
    }
    assert(errorThrown, 'Base AIProvider.generateText throws error');
} catch (e) {
    console.log('❌ Base AIProvider test failed:', e.message);
    failed++;
}

// Test 2: Base AIProvider getName works
try {
    const baseProvider = new AIProvider('TestProvider');
    assert(baseProvider.getName() === 'TestProvider', 'Base AIProvider.getName returns correct name');
} catch (e) {
    console.log('❌ Base AIProvider.getName test failed:', e.message);
    failed++;
}

// Test 3: GeminiProvider initializes without key
try {
    const provider = new GeminiProvider(null);
    assert(provider.getName() === 'Gemini', 'GeminiProvider name is "Gemini"');
    assert(provider.client === null, 'GeminiProvider client is null without API key');
} catch (e) {
    console.log('❌ GeminiProvider initialization test failed:', e.message);
    failed++;
}

// Test 4: GeminiProvider.isAvailable returns false without key
try {
    const provider = new GeminiProvider(null);
    const available = await provider.isAvailable();
    assert(available === false, 'GeminiProvider.isAvailable returns false without API key');
} catch (e) {
    console.log('❌ GeminiProvider.isAvailable test failed:', e.message);
    failed++;
}

// Test 5: GitHubModelProvider initializes without token
try {
    const provider = new GitHubModelProvider(null);
    assert(provider.getName() === 'GitHub Models', 'GitHubModelProvider name is "GitHub Models"');
    assert(provider.client === null, 'GitHubModelProvider client is null without token');
} catch (e) {
    console.log('❌ GitHubModelProvider initialization test failed:', e.message);
    failed++;
}

// Test 6: GitHubModelProvider.isAvailable returns false without token
try {
    const provider = new GitHubModelProvider(null);
    const available = await provider.isAvailable();
    assert(available === false, 'GitHubModelProvider.isAvailable returns false without token');
} catch (e) {
    console.log('❌ GitHubModelProvider.isAvailable test failed:', e.message);
    failed++;
}

// Test 7: AIProviderFactory methods exist
try {
    assert(typeof AIProviderFactory.createProvider === 'function', 'AIProviderFactory.createProvider is a function');
    assert(typeof AIProviderFactory.getGeminiApiKey === 'function', 'AIProviderFactory.getGeminiApiKey is a function');
    assert(typeof AIProviderFactory.getGitHubToken === 'function', 'AIProviderFactory.getGitHubToken is a function');
} catch (e) {
    console.log('❌ AIProviderFactory methods test failed:', e.message);
    failed++;
}

// Test 8: AIProviderFactory.getGitHubToken returns null without env vars
try {
    const originalGithubToken = process.env.GITHUB_TOKEN;
    const originalBlogGithubToken = process.env.BLOG_GITHUB_TOKEN;
    
    delete process.env.GITHUB_TOKEN;
    delete process.env.BLOG_GITHUB_TOKEN;
    
    const token = AIProviderFactory.getGitHubToken();
    assert(token === null, 'AIProviderFactory.getGitHubToken returns null without env vars');
    
    // Restore
    if (originalGithubToken) process.env.GITHUB_TOKEN = originalGithubToken;
    if (originalBlogGithubToken) process.env.BLOG_GITHUB_TOKEN = originalBlogGithubToken;
} catch (e) {
    console.log('❌ AIProviderFactory.getGitHubToken test failed:', e.message);
    failed++;
}

// Test 9: AIProviderFactory.getGitHubToken finds GITHUB_TOKEN
try {
    const originalGithubToken = process.env.GITHUB_TOKEN;
    process.env.GITHUB_TOKEN = 'test_token_123';
    
    const token = AIProviderFactory.getGitHubToken();
    assert(token === 'test_token_123', 'AIProviderFactory.getGitHubToken finds GITHUB_TOKEN');
    
    // Restore
    if (originalGithubToken) {
        process.env.GITHUB_TOKEN = originalGithubToken;
    } else {
        delete process.env.GITHUB_TOKEN;
    }
} catch (e) {
    console.log('❌ AIProviderFactory.getGitHubToken GITHUB_TOKEN test failed:', e.message);
    failed++;
}

// Test 10: AIProviderFactory.createProvider throws error when no providers available
try {
    const originalGeminiKey = process.env.GEMINI_API_KEY;
    const originalGoogleAiKey = process.env.GOOGLE_AI_API_KEY;
    const originalGithubToken = process.env.GITHUB_TOKEN;
    const originalBlogGithubToken = process.env.BLOG_GITHUB_TOKEN;
    
    // Clear all env vars
    delete process.env.GEMINI_API_KEY;
    delete process.env.GOOGLE_AI_API_KEY;
    delete process.env.GITHUB_TOKEN;
    delete process.env.BLOG_GITHUB_TOKEN;
    
    let errorThrown = false;
    try {
        await AIProviderFactory.createProvider();
    } catch (e) {
        errorThrown = e.message.includes('No AI provider available');
    }
    
    assert(errorThrown, 'AIProviderFactory.createProvider throws error when no providers available');
    
    // Restore
    if (originalGeminiKey) process.env.GEMINI_API_KEY = originalGeminiKey;
    if (originalGoogleAiKey) process.env.GOOGLE_AI_API_KEY = originalGoogleAiKey;
    if (originalGithubToken) process.env.GITHUB_TOKEN = originalGithubToken;
    if (originalBlogGithubToken) process.env.BLOG_GITHUB_TOKEN = originalBlogGithubToken;
} catch (e) {
    console.log('❌ AIProviderFactory.createProvider error test failed:', e.message);
    failed++;
}

// Results
console.log('\n📊 Test Results:', passed, 'passed,', failed, 'failed');
process.exit(failed > 0 ? 1 : 0);
