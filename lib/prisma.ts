// Compatibility shim: re-export the unified db client as `prisma`
// Prefer importing from '@/lib/db' going forward.
import { db } from './db';
export const prisma = db;
