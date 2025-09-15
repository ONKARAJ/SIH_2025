const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Environment check
const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.log('Please set the following environment variables:');
  console.log('DATABASE_URL: Your PostgreSQL connection string');
  process.exit(1);
}

console.log('🚀 Starting database migration...');

// Run Prisma commands
const commands = [
  'npx prisma generate',
  'npx prisma db push --accept-data-loss',
  'node scripts/seed-data.js'
];

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`\n⏳ Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`⚠️  Warning: ${stderr}`);
      }
      if (stdout) {
        console.log(stdout);
      }
      console.log(`✅ Completed: ${command}`);
      resolve();
    });
  });
}

async function migrate() {
  try {
    for (const command of commands) {
      await runCommand(command);
    }
    
    console.log('\n🎉 Database migration completed successfully!');
    console.log('\n📋 Migration Summary:');
    console.log('✅ Prisma client generated');
    console.log('✅ Database schema synchronized');
    console.log('✅ Sample data seeded');
    console.log('\nYour database is ready for production! 🚀');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
