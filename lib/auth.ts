"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/lib/db"
import type { UserRole, UserSession } from "@/lib/types"

// Schemas for validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["farmer", "buyer", "agent"]),
  phone: z.string().min(10),
  address: z.string().min(5),
})

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    // Validate input
    loginSchema.parse({ email, password })

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        verified: true,
      },
    })

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Check password (in a real app, use bcrypt.compare)
    if (user.password !== password) {
      return { success: false, message: "Invalid email or password" }
    }

    // Create session
    const session: UserSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      verified: user.verified,
    }

    // Set session cookie
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }
    }
    return { success: false, message: "An error occurred during login" }
  }
}

export async function signup(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as UserRole
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string

  try {
    // Validate input
    signupSchema.parse({ name, email, password, role, phone, address })

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, message: "Email already in use" }
    }

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password, // In a real app, hash this password
        role,
        phone,
        address,
        verified: false,
      },
    })

    // Create session
    const session: UserSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      verified: user.verified,
    }

    // Set session cookie
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true, message: "Account created successfully" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }
    }
    return { success: false, message: "An error occurred during signup" }
  }
}

export async function logout() {
  cookies().delete("session")
}

export async function getUserSession(): Promise<UserSession | null> {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value) as UserSession
    return session
  } catch (error) {
    return null
  }
}

export async function requireAuth(roles?: UserRole[]) {
  const session = await getUserSession()

  if (!session) {
    redirect("/login")
  }

  if (roles && !roles.includes(session.role)) {
    redirect("/unauthorized")
  }

  return session
}

