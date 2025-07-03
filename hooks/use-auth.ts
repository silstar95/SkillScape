"use client"

import { useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuthContext } from "@/components/providers/auth-provider"

interface SignUpData {
  name: string
  school: string
  userType: string
  grade?: string
  role?: string
  studentCount?: string
}

export function useAuth() {
  const { user, loading } = useAuthContext()
  const [authLoading, setAuthLoading] = useState(false)

  const signUp = async (email: string, password: string, userData: SignUpData) => {
    setAuthLoading(true)
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: userData.name,
      })

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name: userData.name,
        email: email,
        school: userData.school,
        userType: userData.userType,
        ...(userData.grade && { grade: userData.grade }),
        ...(userData.role && { role: userData.role }),
        ...(userData.studentCount && { studentCount: userData.studentCount }),
        createdAt: new Date().toISOString(),
        onboardingCompleted: true,
      })

      return firebaseUser
    } finally {
      setAuthLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true)
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password)
      // In a real app, you'd fetch the user's profile data from Firestore here
      return { ...firebaseUser, userType: "student" } // Mock data
    } finally {
      setAuthLoading(false)
    }
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  return {
    user,
    loading: loading || authLoading,
    signUp,
    signIn,
    signOut,
  }
}
