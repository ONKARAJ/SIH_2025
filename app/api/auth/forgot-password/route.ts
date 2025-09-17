import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, phone, step } = await request.json()

    if (step === "verify-email") {
      // Step 1: Check if email exists in database
      if (!email) {
        return NextResponse.json(
          { message: "Email is required" },
          { status: 400 }
        )
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (user) {
        return NextResponse.json({
          userExists: true,
          message: "Email found"
        })
      } else {
        return NextResponse.json(
          { 
            userExists: false,
            message: "Email not found in our records" 
          },
          { status: 404 }
        )
      }
    }

    if (step === "send-password") {
      // Step 2: Verify phone number and send password via SMS
      if (!email || !phone) {
        return NextResponse.json(
          { message: "Email and phone number are required" },
          { status: 400 }
        )
      }

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        )
      }

      // Check if phone matches user's phone number
      if (user.phone !== phone) {
        return NextResponse.json(
          { message: "Phone number doesn't match our records" },
          { status: 400 }
        )
      }

      // In a production environment, you would:
      // 1. Use a proper SMS service like Twilio, AWS SNS, or similar
      // 2. Never send the actual password - send a secure reset token instead
      // 3. Implement proper rate limiting
      // 4. Hash and store temporary tokens with expiration
      
      // For demonstration purposes, we'll simulate sending the password
      // In reality, you should never send plain text passwords
      const mockPassword = user.password || "demo123" // This is just for demo
      
      try {
        // Simulate SMS sending (replace with actual SMS service)
        const smsSuccess = await sendSMSPassword(phone, maskPassword(mockPassword))
        
        if (smsSuccess) {
          // Log the activity (in production, log to proper audit system)
          console.log(`Password recovery requested for user: ${user.email}, phone: ${maskPhone(phone)}`)
          
          return NextResponse.json({
            success: true,
            message: "Password sent successfully"
          })
        } else {
          return NextResponse.json(
            { message: "Failed to send SMS. Please try again." },
            { status: 500 }
          )
        }
      } catch (error) {
        console.error("SMS sending error:", error)
        return NextResponse.json(
          { message: "Failed to send SMS. Please try again." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { message: "Invalid step" },
      { status: 400 }
    )

  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Simulate SMS sending function
// In production, replace this with actual SMS service integration
async function sendSMSPassword(phone: string, password: string): Promise<boolean> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, we'll just log the message
    // In production, integrate with SMS providers like:
    // - Twilio: https://www.twilio.com/docs/sms
    // - AWS SNS: https://docs.aws.amazon.com/sns/latest/dg/sms_send.html
    // - Firebase Cloud Messaging
    // - MSG91, TextLocal, etc.
    
    const message = `Jharkhand Tourism: Your account password is: ${password}. For security, please change this password after logging in. Support: contact@jharkhnadtourism.com`
    
    console.log(`SMS sent to ${maskPhone(phone)}: ${message}`)
    
    // Simulate successful SMS delivery
    return true
    
  } catch (error) {
    console.error("Error sending SMS:", error)
    return false
  }
}

// Utility function to mask password for logging
function maskPassword(password: string): string {
  if (password.length <= 2) return "***"
  return password.substring(0, 2) + "***"
}

// Utility function to mask phone number for logging
function maskPhone(phone: string): string {
  if (phone.length <= 4) return "****"
  return "****" + phone.substring(phone.length - 4)
}

// Example integration with Twilio SMS service
// Uncomment and configure this if you want to use Twilio
/*
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromPhone = process.env.TWILIO_PHONE_NUMBER
const client = twilio(accountSid, authToken)

async function sendSMSPasswordWithTwilio(phone: string, password: string): Promise<boolean> {
  try {
    const message = `Jharkhand Tourism: Your password is: ${password}. Please change it after logging in.`
    
    await client.messages.create({
      body: message,
      from: fromPhone,
      to: phone
    })
    
    return true
  } catch (error) {
    console.error("Twilio SMS error:", error)
    return false
  }
}
*/