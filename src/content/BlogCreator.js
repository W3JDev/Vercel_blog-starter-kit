#!/usr/bin/env node

/**
 * 📝 BLOG POST CREATOR
 * Interactive blog post creation tool
 */

import HyperionOrchestrator from '../core/HyperionOrchestrator.js';

console.log('📝 BLOG POST CREATOR');
console.log('═══════════════════════════════════════');
console.log('');

async function createBlogPost() {
    try {
        // Create empire instance with proper API key loading
        const empire = await HyperionOrchestrator.create();

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
        
    } catch (error) {
        console.error('❌ Empire initialization failed:', error.message);
        process.exit(1);
    }
}

// Run the blog creation
createBlogPost().catch(console.error);
