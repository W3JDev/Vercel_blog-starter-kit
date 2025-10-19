#!/usr/bin/env node

/**
 * 📝 BLOG POST CREATOR
 * Interactive blog post creation tool
 */

import HyperionOrchestrator from '../core/HyperionOrchestrator.js';

console.log('📝 BLOG POST CREATOR');
console.log('═══════════════════════════════════════');
console.log('');

const empire = new HyperionOrchestrator();

// Wait for initialization then create blog post
setTimeout(async () => {
    try {
        console.log('✨ Creating new blog post...');
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
}, 3000);
