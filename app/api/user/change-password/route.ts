import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { z } from "zod"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
})

export async function PUT(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword } = changePasswordSchema.parse(body)

    // Check if database is configured
    const isDatabaseConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')
    
    if (!isDatabaseConfigured) {
      return NextResponse.json(
        { error: "Database not configured. Password change is not available." },
        { status: 500 }
      )
    }

    // Get current user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // If user doesn't have a password (OAuth user), they can't change password
    if (!user.password) {
      return NextResponse.json(
        { error: "Cannot change password for OAuth accounts. Please contact support." },
        { status: 400 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password in database
    await db.user.update({
      where: { email: session.user.email },
      data: { 
        password: hashedNewPassword,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      message: "Password changed successfully"
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Password change error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}