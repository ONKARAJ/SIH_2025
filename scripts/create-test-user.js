const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('testpassword123', 10)
    
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@jharkhnadtourism.com',
        name: 'Test User',
        phone: '9876543210',
        password: hashedPassword,
        isVerified: true
      }
    })
    
    console.log('Test user created successfully:')
    console.log('Email: test@jharkhnadtourism.com')
    console.log('Password: testpassword123')
    console.log('Phone: 9876543210')
    console.log('User ID:', user.id)
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Test user already exists!')
      
      // Update existing user
      const user = await prisma.user.update({
        where: { email: 'test@jharkhnadtourism.com' },
        data: {
          phone: '9876543210',
          password: hashedPassword
        }
      })
      console.log('Updated existing test user with new phone and password')
    } else {
      console.error('Error creating test user:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()