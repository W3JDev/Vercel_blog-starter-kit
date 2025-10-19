#!/usr/bin/env node

/**
 * 🤖 CONTENT GENERATOR
 * Manual content generation script
 */

import HyperionOrchestrator from '../core/HyperionOrchestrator.js';

console.log('🤖 MANUAL CONTENT GENERATION INITIATED...');

const empire = new HyperionOrchestrator();

// Wait for initialization then generate content
setTimeout(async () => {
    try {
        console.log('🔥 Generating content...');
        const result = await empire.executeContentWorkflow({ manual: true });
        
        console.log('');
        console.log('✅ CONTENT GENERATION SUCCESSFUL!');
        console.log('📝 Title:', result.title);
        console.log('🔗 GitHub URL:', result.githubUrl);
        console.log('🌐 Live URL:', result.liveUrl);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Content generation failed:', error);
        process.exit(1);
    }
}, 3000);
