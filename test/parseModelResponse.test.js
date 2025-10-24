#!/usr/bin/env node

/**
 * Unit Tests for parseModelResponse utility
 */

import { parseModelJson } from '../src/core/utils/parseModelResponse.js';

class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('🧪 Running parseModelJson Tests\n');
        
        for (const { name, fn } of this.tests) {
            try {
                await fn();
                console.log(`✅ ${name}`);
                this.passed++;
            } catch (error) {
                console.error(`❌ ${name}`);
                console.error(`   Error: ${error.message}`);
                this.failed++;
            }
        }
        
        console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
        
        if (this.failed > 0) {
            process.exit(1);
        }
    }
}

const runner = new TestRunner();

// Test 1: Basic JSON parsing
runner.test('Should parse clean JSON', () => {
    const input = '{"message": "Hello", "status": "success"}';
    const result = parseModelJson(input);
    
    if (result.message !== "Hello" || result.status !== "success") {
        throw new Error('Failed to parse clean JSON correctly');
    }
});

// Test 2: JSON with markdown code fences
runner.test('Should parse JSON wrapped in markdown code fences', () => {
    const input = '```json\n{"message": "Hello from Gemini!", "code": 200}\n```';
    const result = parseModelJson(input);
    
    if (result.message !== "Hello from Gemini!" || result.code !== 200) {
        throw new Error('Failed to parse fenced JSON correctly');
    }
});

// Test 3: JSON with mixed fences and backticks
runner.test('Should parse JSON with various markdown formatting', () => {
    const input = '```\n{"data": {"items": [1, 2, 3]}, "success": true}\n```';
    const result = parseModelJson(input);
    
    if (!result.success || result.data.items.length !== 3) {
        throw new Error('Failed to parse mixed fence JSON correctly');
    }
});

// Test 4: JSON in response text with extra content
runner.test('Should extract JSON from text with surrounding content', () => {
    const input = 'Here is the response:\n\n```json\n{"result": "extracted", "valid": true}\n```\n\nThank you!';
    const result = parseModelJson(input);
    
    if (result.result !== "extracted" || !result.valid) {
        throw new Error('Failed to extract JSON from surrounding text');
    }
});

// Test 5: Array JSON
runner.test('Should parse JSON arrays', () => {
    const input = '```json\n[{"name": "Item1"}, {"name": "Item2"}]\n```';
    const result = parseModelJson(input);
    
    if (!Array.isArray(result) || result.length !== 2 || result[0].name !== "Item1") {
        throw new Error('Failed to parse JSON array correctly');
    }
});

// Test 6: Complex nested JSON
runner.test('Should parse complex nested JSON', () => {
    const input = `\`\`\`json
{
  "trends": ["AI", "ML", "Automation"],
  "targetAudience": {
    "primary": "CTOs",
    "secondary": "Tech Leaders"
  },
  "recommendedTopics": [
    {
      "title": "Enterprise AI Implementation",
      "priority": 1
    }
  ]
}
\`\`\``;
    
    const result = parseModelJson(input);
    
    if (!result.trends || result.trends.length !== 3 || 
        result.targetAudience.primary !== "CTOs" ||
        result.recommendedTopics[0].priority !== 1) {
        throw new Error('Failed to parse complex nested JSON correctly');
    }
});

// Test 7: JSON with escaped quotes
runner.test('Should handle JSON with escaped quotes', () => {
    const input = '```json\n{"message": "He said \\"Hello\\" to me", "escaped": true}\n```';
    const result = parseModelJson(input);
    
    if (result.message !== 'He said "Hello" to me' || !result.escaped) {
        throw new Error('Failed to handle escaped quotes correctly');
    }
});

// Test 8: Malformed JSON should throw error
runner.test('Should throw error for malformed JSON', () => {
    const input = '```json\n{"invalid": json here}\n```';
    
    try {
        parseModelJson(input);
        throw new Error('Should have thrown an error for malformed JSON');
    } catch (error) {
        if (!error.message.includes('Failed to parse model JSON response')) {
            throw new Error('Wrong error type thrown for malformed JSON');
        }
    }
});

// Test 9: Empty input should throw error
runner.test('Should throw error for empty input', () => {
    try {
        parseModelJson('');
        throw new Error('Should have thrown an error for empty input');
    } catch (error) {
        if (!error.message.includes('No text to parse')) {
            throw new Error('Wrong error type thrown for empty input');
        }
    }
});

// Test 10: JSON with single backticks
runner.test('Should parse JSON with single backticks', () => {
    const input = '`{"simple": "json", "backticks": 1}`';
    const result = parseModelJson(input);
    
    if (result.simple !== "json" || result.backticks !== 1) {
        throw new Error('Failed to parse single backtick JSON correctly');
    }
});

// Run all tests
runner.run().catch(console.error);