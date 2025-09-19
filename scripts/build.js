#!/usr/bin/env node

/**
 * Cross-platform build script for Vercel deployment
 * Database functionality has been removed - only builds Next.js application
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting build process...');

try {
  // Build Next.js application
  console.log('🔨 Building Next.js application...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
