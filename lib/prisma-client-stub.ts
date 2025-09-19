/**
 * Stub PrismaClient implementation
 * Database functionality has been removed from this project
 * This file provides mock PrismaClient to satisfy imports during build
 */

// Mock PrismaClient structure
export class PrismaClient {
  hotelBooking = {
    count: () => Promise.resolve(0),
    aggregate: () => Promise.resolve({ _sum: { totalAmount: 0 } }),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  }

  flightBooking = {
    count: () => Promise.resolve(0),
    aggregate: () => Promise.resolve({ _sum: { totalAmount: 0 } }),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  }

  payment = {
    count: () => Promise.resolve(0),
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({})
  }

  user = {
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({})
  }

  hotel = {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({})
  }

  flight = {
    findMany: () => Promise.resolve([]),
    findFirst: () => Promise.resolve(null),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({})
  }

  // Mock disconnect method
  $disconnect = () => Promise.resolve()
  
  // Mock transaction method
  $transaction = (fn: any) => Promise.resolve(fn)
}