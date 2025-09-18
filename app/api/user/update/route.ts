import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().optional(),
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
    const validatedData = updateUserSchema.parse(body)

    // Check if database is configured
    const isDatabaseConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')
    
    if (!isDatabaseConfigured) {
      return NextResponse.json(
        { error: "Database not configured. Profile updates are not available." },
        { status: 500 }
      )
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date(),
    }
    
    // Only update name if provided
    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name
    }
    
    // Update phone if provided (including empty string to clear it)
    if (validatedData.phone !== undefined) {
      updateData.phone = validatedData.phone || null
    }

    // Update user in database
    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
