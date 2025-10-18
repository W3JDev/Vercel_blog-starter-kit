#!/usr/bin/env node

/**
 * 🏛️ EMPIRE ACTIVATION SCRIPT
 * Activates the Hyperion Content Empire
 */

import HyperionOrchestrator from '../core/HyperionOrchestrator.js';

console.log('⚡ ACTIVATING HYPERION CONTENT EMPIRE...');
console.log('🏛️ BY JUPITER\'S LIGHTNING!');
console.log('');

const empire = new HyperionOrchestrator();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🏛️ EMPIRE SHUTTING DOWN GRACEFULLY...');
    console.log('✅ All neural agents deactivated');
    console.log('👑 BY JUPITER, THE EMPIRE WILL RETURN!');
    process.exit(0);
});

console.log('');
console.log('✨ Empire is now operational!');
console.log('📊 Dashboard: http://localhost:3001/empire/status');
console.log('🤖 Press Ctrl+C to shutdown');
