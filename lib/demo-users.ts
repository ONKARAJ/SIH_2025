// Simple in-memory user storage for demo purposes when database is not configured
interface DemoUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

// In-memory storage (will reset when server restarts)
let demoUsers: DemoUser[] = []

export const demoUserStorage = {
  async findUserByEmail(email: string): Promise<DemoUser | null> {
    return demoUsers.find(user => user.email === email) || null
  },

  async createUser(userData: { name: string; email: string; password: string }): Promise<DemoUser> {
    const user: DemoUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date()
    }
    
    demoUsers.push(user)
    return user
  },

  async getAllUsers(): Promise<DemoUser[]> {
    return [...demoUsers]
  },

  async getUserCount(): Promise<number> {
    return demoUsers.length
  }
}
