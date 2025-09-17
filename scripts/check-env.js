#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

console.log('🔍 Checking deployment readiness...\n');

// Required environment variables
const required = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

// Optional but recommended
const optional = [
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET'
];

let hasErrors = false;
let hasWarnings = false;

console.log('✅ Required Variables:');
required.forEach(envVar => {
  const value = process.env[envVar];
  if (!value) {
    console.log(`❌ ${envVar}: Not set`);
    hasErrors = true;
  } else {
    // Mask sensitive values
    const maskedValue = envVar.includes('SECRET') || envVar.includes('PASSWORD') 
      ? '*'.repeat(8) 
      : value.length > 50 
        ? value.substring(0, 20) + '...' 
        : value;
    console.log(`✅ ${envVar}: ${maskedValue}`);
  }
});

console.log('\n⚠️  Optional Variables:');
optional.forEach(envVar => {
  const value = process.env[envVar];
  if (!value) {
    console.log(`⚠️  ${envVar}: Not set`);
    hasWarnings = true;
  } else {
    const maskedValue = envVar.includes('SECRET') || envVar.includes('KEY')
      ? '*'.repeat(8)
      : value.length > 50 
        ? value.substring(0, 20) + '...'
        : value;
    console.log(`✅ ${envVar}: ${maskedValue}`);
  }
});

// Check DATABASE_URL format
console.log('\n🗄️  Database Check:');
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  if (dbUrl.startsWith('file:')) {
    console.log('✅ SQLite database detected (good for development/demo)');
  } else if (dbUrl.startsWith('postgresql://')) {
    console.log('✅ PostgreSQL database detected (recommended for production)');
  } else if (dbUrl.startsWith('mysql://')) {
    console.log('✅ MySQL database detected');
  } else {
    console.log('❌ Invalid DATABASE_URL format. Must start with file:, postgresql://, or mysql://');
    hasErrors = true;
  }
} else {
  console.log('❌ DATABASE_URL not set');
  hasErrors = true;
}

// Check NEXTAUTH_SECRET length
console.log('\n🔐 Security Check:');
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (nextAuthSecret) {
  if (nextAuthSecret.length >= 32) {
    console.log('✅ NEXTAUTH_SECRET is sufficiently long');
  } else {
    console.log('⚠️  NEXTAUTH_SECRET should be at least 32 characters long');
    hasWarnings = true;
  }
} else {
  console.log('❌ NEXTAUTH_SECRET not set');
  hasErrors = true;
}

// Check if .env files exist
console.log('\n📁 Environment Files:');
const envFiles = ['.env.local', '.env', '.env.production'];
envFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`⚠️  ${file} not found`);
  }
});

// Summary
console.log('\n📋 Summary:');
if (hasErrors) {
  console.log('❌ Deployment not ready - fix required variables above');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Deployment ready with warnings - some features may be limited');
  console.log('💡 For full functionality, set the optional variables above');
} else {
  console.log('✅ Deployment ready! All environment variables are configured');
}

console.log('\n📚 For detailed setup instructions, see DEPLOYMENT_GUIDE.md');