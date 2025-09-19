/**
 * Stub database implementation 
 * Database functionality has been removed from this project
 * This file provides mock implementations to satisfy imports during build
 */

// Mock Prisma client structure to satisfy TypeScript imports
export const db = {
  hotelBooking: {
    count: () => Promise.resolve(0),
    aggregate: () => Promise.resolve({ _sum: { totalAmount: 0 } }),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  },
  flightBooking: {
    count: () => Promise.resolve(0),
    aggregate: () => Promise.resolve({ _sum: { totalAmount: 0 } }),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  },
  payment: {
    count: () => Promise.resolve(0),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  },
  user: {
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    findUnique: () => Promise.resolve(null)
  },
  hotel: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({})
  },
  flight: {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve({})
  }
}

// Export default as well for compatibility
export default db