#!/usr/bin/env node

/**
 * 📊 EMPIRE STATUS CHECKER
 * Displays current empire operational status
 */

import axios from 'axios';

const PORT = process.env.PORT || 3001;
const STATUS_URL = `http://localhost:${PORT}/empire/status`;

console.log('📊 CHECKING EMPIRE STATUS...');
console.log('');

try {
    const response = await axios.get(STATUS_URL);
    const status = response.data;
    
    console.log('🏛️ HYPERION EMPIRE STATUS');
    console.log('═══════════════════════════════════════');
    console.log(`Status: ${status.status}`);
    console.log(`Uptime: ${Math.floor(status.uptime / 60)} minutes`);
    console.log('');
    console.log('📊 METRICS:');
    console.log(`  Posts Generated: ${status.metrics.postsGenerated}`);
    console.log(`  Total Revenue: $${status.metrics.totalRevenue.toLocaleString()}`);
    console.log(`  Viral Posts: ${status.metrics.viralPosts}`);
    console.log(`  Conversion Rate: ${status.metrics.conversionRate}%`);
    console.log('');
    console.log('🎯 TARGETS:');
    console.log(`  Revenue per Post: $${status.config.revenueTargets.perPost.toLocaleString()}`);
    console.log(`  Monthly Target: $${status.config.revenueTargets.monthly.toLocaleString()}`);
    console.log(`  Viral Success Rate: ${status.config.revenueTargets.viral * 100}%`);
    console.log('');
    console.log('🤖 ACTIVE AGENTS:', status.agents.join(', '));
    console.log('');
    console.log('✅ Empire is operational!');
} catch (error) {
    console.error('❌ Empire is not running!');
    console.error('💡 Start the empire with: npm run empire:activate');
    process.exit(1);
}
