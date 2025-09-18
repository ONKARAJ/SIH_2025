#!/usr/bin/env node

/**
 * Cross-platform postinstall script for Vercel deployment
 * Generates Prisma client with fallback DATABASE_URL if needed
 */

const { execSync } = require('child_process');

console.log('📦 Running postinstall: Generating Prisma client...');

// Set DATABASE_URL if not provided (needed for Prisma generate)
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not found, setting fallback for Prisma generation...');
  process.env.DATABASE_URL = 'file:./dev.db';
}

try {
  // Generate Prisma client
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('✅ Prisma client generated successfully!');
} catch (error) {
  console.warn('⚠️  Prisma generation failed, continuing build:', error.message);
  // Don't exit with error to allow build to continue
}