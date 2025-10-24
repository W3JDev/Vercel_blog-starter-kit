#!/usr/bin/env node

/**
 * Blog Publishing Test - Verify Target Repository Configuration
 */

import { config } from 'dotenv';
config();

console.log('🎯 BLOG PUBLISHING CONFIGURATION TEST');
console.log('=====================================\n');

console.log('📋 Current Configuration:');
console.log('  BLOG_TARGET_OWNER:', process.env.BLOG_TARGET_OWNER || 'Not set (will use fallback)');
console.log('  BLOG_TARGET_REPO:', process.env.BLOG_TARGET_REPO || 'Not set (will use fallback)');
console.log('  BLOG_CONTENT_PATH:', process.env.BLOG_CONTENT_PATH || 'content/blog');

console.log('\n🏛️ Repository Target Analysis:');

// Simulate the loadRepositoryConfig logic
const targetOwner = process.env.BLOG_TARGET_OWNER;
const targetRepo = process.env.BLOG_TARGET_REPO;

if (targetOwner && targetRepo) {
    console.log(`✅ Using environment override: ${targetOwner}/${targetRepo}`);
} else {
    console.log('⚠️ Using fallback: W3JDev/v0-w3-j-llc-website');
}

const actualTarget = targetOwner && targetRepo ? `${targetOwner}/${targetRepo}` : 'W3JDev/v0-w3-j-llc-website';
const actualPath = process.env.BLOG_CONTENT_PATH || 'content/blog';

console.log('\n📝 Blog Publishing Details:');
console.log('  Target Repository:', actualTarget);
console.log('  Content Path:', actualPath);
console.log('  Full Path:', `${actualTarget}/${actualPath}/`);

console.log('\n🎯 Expected Blog File Path:');
const today = new Date().toISOString().split('T')[0];
const exampleFile = `${today}-ai-enterprise-automation.md`;
console.log(`  ${actualTarget}/${actualPath}/${exampleFile}`);

console.log('\n🌐 Expected Live URL:');
if (actualTarget === 'W3JDev/v0-w3-j-llc-website') {
    console.log('  https://w3jdev.com/blog/ai-enterprise-automation');
} else {
    console.log('  https://vercel-blog-starter-kit.vercel.app/blog/ai-enterprise-automation');
}

console.log('\n✅ Configuration Test Complete!');
console.log('\nTo publish to your main website, ensure:');
console.log('1. BLOG_TARGET_OWNER=W3JDev');
console.log('2. BLOG_TARGET_REPO=v0-w3-j-llc-website'); 
console.log('3. GitHub token has write access to v0-w3-j-llc-website');