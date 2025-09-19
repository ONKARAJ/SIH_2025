import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { demoUserStorage } from "@/lib/demo-users"

// Check if database is properly configured
const isDatabaseConfigured = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')

export const authOptions: NextAuthOptions = {
  adapter: isDatabaseConfigured ? PrismaAdapter(db) : undefined,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          let user
          
          if (isDatabaseConfigured) {
            // Use database
            user = await db.user.findUnique({
              where: {
                email: credentials.email
              }
            })
          } else {
            // Use demo storage
            user = await demoUserStorage.findUserByEmail(credentials.email)
          }

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar || null,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.avatar = user.avatar
      }
      if (account) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.avatar = token.avatar as string
        session.user.provider = token.provider as string
        
        // Fetch fresh user data from database if available
        if (isDatabaseConfigured && session.user.email) {
          try {
            const freshUser = await db.user.findUnique({
              where: { email: session.user.email },
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
                createdAt: true,
                updatedAt: true
              }
            })
            
            if (freshUser) {
              session.user.name = freshUser.name
              session.user.phone = freshUser.phone
              session.user.avatar = freshUser.avatar
              session.user.createdAt = freshUser.createdAt
              session.user.updatedAt = freshUser.updatedAt
            }
          } catch (error) {
            console.error("Error fetching fresh user data:", error)
          }
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log successful sign ins
      console.log(`User ${user.email} signed in with ${account?.provider}`)
    }
  },
  debug: process.env.NODE_ENV === "development"
}
