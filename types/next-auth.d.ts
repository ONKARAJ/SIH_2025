import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      phone?: string
      avatar?: string
      provider?: string
      createdAt?: Date
      updatedAt?: Date
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    phone?: string
    avatar?: string
    createdAt?: Date
    updatedAt?: Date
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    phone?: string
    avatar?: string
    provider?: string
  }
}