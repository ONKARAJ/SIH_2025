import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { demoUserStorage } from "@/lib/demo-users"
import { z } from "zod"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[+]?[0-9\s\-()]+$/, "Invalid phone number format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = signupSchema.parse(body)

    // Check if database is available
    const isDatabaseConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')
    
    if (isDatabaseConfigured) {
      // Use database
      const existingUser = await db.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: "Account already exists! Please sign in instead." },
          { status: 400 }
        )
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = await db.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
        }
      })
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        message: "Account created successfully! You can now sign in.",
        user: userWithoutPassword
      })
    } else {
      // Use demo storage
      const existingUser = await demoUserStorage.findUserByEmail(email)
      
      if (existingUser) {
        return NextResponse.json(
          { error: "Account already exists! Please sign in instead." },
          { status: 400 }
        )
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user in demo storage
      const user = await demoUserStorage.createUser({
        name,
        email,
        phone,
        password: hashedPassword
      })
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        message: "Account created successfully! You can now sign in. (Demo Mode)",
        user: userWithoutPassword
      })
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
