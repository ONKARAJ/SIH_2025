import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with deployment-friendly configuration
// Only create client if not in build process
export const db = globalForPrisma.prisma ?? (() => {
  // During build, avoid database connection
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found during build, skipping Prisma client initialization');
    return null as any; // Return null during build to avoid connection issues
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'minimal',
  });
})()

// Handle database connection gracefully during build
if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = db
}

// Graceful shutdown
process.on('beforeExit', async () => {
  if (db && typeof db.$disconnect === 'function') {
    await db.$disconnect();
  }
})
