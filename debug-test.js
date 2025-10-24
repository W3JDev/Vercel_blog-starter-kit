import HyperionOrchestrator from './src/core/HyperionOrchestrator.js';

console.log('🧪 Testing HyperionOrchestrator with debug...');

try {
    const empire = await HyperionOrchestrator.create();
    console.log('✅ Empire created successfully!');
    
    // Let's see if we can get to the point where it tries to use the API
    console.log('Testing initializeAgents...');
    await empire.initializeAgents();
    console.log('✅ Agents initialized!');
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
}