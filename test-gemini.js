#!/usr/bin/env node

import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
config();

async function testGeminiAPI() {
    console.log('🧪 Testing Google Gemini API Key...');
    
    // Check both possible environment variable names
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
        console.error('❌ Neither GEMINI_API_KEY nor GOOGLE_AI_API_KEY found in environment variables');
        return;
    }
    
    console.log(`✅ API Key loaded (length: ${apiKey.length})`);
    console.log(`🔑 API Key starts with: ${apiKey.substring(0, 8)}...`);
    
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Try with current model names (including the new 2.5 model)
        const modelNames = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        
        for (const modelName of modelNames) {
            try {
                console.log(`🚀 Trying model: ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                
                const result = await model.generateContent('Say "Hello from Gemini!" in a JSON format with a message field.');
                const response = await result.response;
                const text = response.text();
                
                console.log(`✅ SUCCESS! Model ${modelName} is working:`);
                console.log('📝 Response:', text);
                break; // Exit loop on success
                
            } catch (modelError) {
                console.log(`❌ Model ${modelName} failed: ${modelError.message}`);
                continue;
            }
        }
        
    } catch (error) {
        console.error('❌ FAILED! Gemini API error:');
        console.error('Error details:', error.message);
        
        if (error.message.includes('API key not valid')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('1. Verify your API key is correct');
            console.log('2. Check if the API key has proper permissions');
            console.log('3. Make sure Generative AI API is enabled in your Google Cloud project');
            console.log('4. Try generating a new API key from Google AI Studio');
        }
    }
}

testGeminiAPI();