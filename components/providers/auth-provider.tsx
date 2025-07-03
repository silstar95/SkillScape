"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

interface AuthUser extends User {
  firstName?: string
  lastName?: string
  userType?: "student" | "counselor"
  school?: string
  grade?: string
  role?: string
  xp?: number
  level?: number
  badges?: string[]
  completedSimulations?: string[]
  currentStreak?: number
  totalHours?: number
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          const userData = userDoc.data()

          const enrichedUser: AuthUser = {
            ...firebaseUser,
            firstName: userData?.firstName || firebaseUser.displayName?.split(" ")[0] || "User",
            lastName: userData?.lastName || firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
            userType: userData?.userType || "student",
            school: userData?.school || "Not specified",
            grade: userData?.grade,
            role: userData?.role,
            xp: userData?.xp || 0,
            level: userData?.level || 1,
            badges: userData?.badges || [],
            completedSimulations: userData?.completedSimulations || [],
            currentStreak: userData?.currentStreak || 0,
            totalHours: userData?.totalHours || 0,
          }
          setUser(enrichedUser)
        } catch (error) {
          console.error("Error fetching user data:", error)
          setUser(firebaseUser as AuthUser)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
