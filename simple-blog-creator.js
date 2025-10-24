#!/usr/bin/env node

/**
 * 📝 BLOG POST CREATOR
 * Simple version that works with the fixed API key loading
 */

import HyperionOrchestrator from './src/core/HyperionOrchestrator.js';

console.log('📝 BLOG POST CREATOR');
console.log('═══════════════════════════════════════');
console.log('');

console.log('🚀 Initializing Hyperion Empire...');
const empire = await HyperionOrchestrator.create();

console.log('✨ Creating new blog post...');

try {
    const result = await empire.executeContentWorkflow({ 
        manual: true,
        featured: true 
    });

    console.log('');
    console.log('✅ BLOG POST CREATED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════');
    console.log(`📝 Title: ${result.title}`);
    console.log(`📁 File: ${result.fileName}`);
    console.log(`🔗 GitHub: ${result.githubUrl}`);
    console.log(`🌐 Live: ${result.liveUrl}`);
    console.log('');
    console.log('🚀 Post will be live after Vercel deployment');
    
    process.exit(0);
} catch (error) {
    console.error('❌ Blog creation failed:', error.message);
    process.exit(1);
}