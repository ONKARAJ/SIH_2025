#!/usr/bin/env node

/**
 * Cross-platform build script for Vercel deployment
 * Handles DATABASE_URL for Prisma generation during build
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting build process...');

// Set DATABASE_URL if not provided (needed for Prisma generate)
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not found, setting fallback for build...');
  process.env.DATABASE_URL = 'file:./dev.db';
}

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: { ...process.env }
  });

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