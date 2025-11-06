#!/usr/bin/env node

import HyperionOrchestrator from '../core/HyperionOrchestrator.js';

console.log('🤖 MANUAL CONTENT GENERATION INITIATED...');

(async () => {
  try {
    // Create ensures an AI provider is created/selected before constructing the orchestrator
    const empire = await HyperionOrchestrator.create();

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
})();
