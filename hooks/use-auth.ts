"use client"

import { useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuthContext } from "@/components/providers/auth-provider"

interface SignUpData {
  firstName: string
  lastName: string
  school: string
  userType: string
  grade?: string
  role?: string
  studentCount?: string
}

interface GoogleSignUpData {
  userType: string
  school: string
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
      // Check if email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length > 0) {
        throw new Error("An account with this email already exists. Please sign in instead.")
      }

      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      })

      // Store additional user data in Firestore with gamification fields
      await setDoc(doc(db, "users", firebaseUser.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        school: userData.school,
        userType: userData.userType,
        ...(userData.grade && { grade: userData.grade }),
        ...(userData.role && { role: userData.role }),
        ...(userData.studentCount && { studentCount: userData.studentCount }),

        // Gamification fields
        xp: 0,
        level: 1,
        badges: [],
        completedSimulations: [],
        currentStreak: 0,
        totalHours: 0,

        // Timestamps
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        onboardingCompleted: true,

        // Progress tracking
        simulationProgress: {},
        cityBuildings: [],
        achievements: [],

        // Preferences
        preferences: {
          notifications: true,
          emailUpdates: true,
          theme: "light",
        },
      })

      return firebaseUser
    } finally {
      setAuthLoading(false)
    }
  }

  const signUpWithGoogle = async (additionalData: GoogleSignUpData) => {
    setAuthLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const { user: firebaseUser } = await signInWithPopup(auth, provider)

      // Check if user already exists
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

      if (!userDoc.exists()) {
        // New user - create profile
        const [firstName, ...lastNameParts] = (firebaseUser.displayName || "").split(" ")
        const lastName = lastNameParts.join(" ")

        await setDoc(doc(db, "users", firebaseUser.uid), {
          firstName: firstName || "User",
          lastName: lastName || "",
          email: firebaseUser.email || "",
          school: additionalData.school,
          userType: additionalData.userType,
          ...(additionalData.grade && { grade: additionalData.grade }),
          ...(additionalData.role && { role: additionalData.role }),
          ...(additionalData.studentCount && { studentCount: additionalData.studentCount }),

          // Gamification fields
          xp: 0,
          level: 1,
          badges: [],
          completedSimulations: [],
          currentStreak: 0,
          totalHours: 0,

          // Timestamps
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          onboardingCompleted: true,

          // Progress tracking
          simulationProgress: {},
          cityBuildings: [],
          achievements: [],

          // Preferences
          preferences: {
            notifications: true,
            emailUpdates: true,
            theme: "light",
          },
        })
      }

      return firebaseUser
    } finally {
      setAuthLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true)
    try {
      // First try to sign in with Firebase Auth
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password)

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

      if (!userDoc.exists()) {
        // User exists in Firebase Auth but not in Firestore
        // This shouldn't happen in normal flow, but let's handle it gracefully
        console.warn("User exists in Firebase Auth but not in Firestore. Creating basic profile.")

        // Create a basic profile
        const [firstName, ...lastNameParts] = (firebaseUser.displayName || firebaseUser.email || "User").split(" ")
        const lastName = lastNameParts.join(" ")

        await setDoc(doc(db, "users", firebaseUser.uid), {
          firstName: firstName || "User",
          lastName: lastName || "",
          email: firebaseUser.email || "",
          school: "Not specified",
          userType: "student", // Default to student

          // Gamification fields
          xp: 0,
          level: 1,
          badges: [],
          completedSimulations: [],
          currentStreak: 0,
          totalHours: 0,

          // Timestamps
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          onboardingCompleted: false, // They'll need to complete onboarding

          // Progress tracking
          simulationProgress: {},
          cityBuildings: [],
          achievements: [],

          // Preferences
          preferences: {
            notifications: true,
            emailUpdates: true,
            theme: "light",
          },
        })
      } else {
        // Update last login time for existing users
        await setDoc(
          doc(db, "users", firebaseUser.uid),
          {
            lastLoginAt: new Date().toISOString(),
          },
          { merge: true },
        )
      }

      // Fetch user profile data
      const updatedUserDoc = await getDoc(doc(db, "users", firebaseUser.uid))
      const userData = updatedUserDoc.data()

      return { ...firebaseUser, ...userData }
    } catch (error: any) {
      // Handle specific Firebase Auth errors
      if (error.code === "auth/user-not-found") {
        throw new Error("No account found with this email. Please sign up first.")
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password. Please try again.")
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address format.")
      } else if (error.code === "auth/too-many-requests") {
        throw new Error("Too many failed attempts. Please try again later.")
      } else {
        throw new Error(error.message || "An error occurred during sign in.")
      }
    } finally {
      setAuthLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setAuthLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const { user: firebaseUser } = await signInWithPopup(auth, provider)

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

      if (!userDoc.exists()) {
        // User signed in with Google but doesn't have a profile
        // Redirect them to complete onboarding
        throw new Error("Please complete your profile setup first. Redirecting to onboarding...")
      }

      // Update last login time
      await setDoc(
        doc(db, "users", firebaseUser.uid),
        {
          lastLoginAt: new Date().toISOString(),
        },
        { merge: true },
      )

      // Fetch user profile data
      const userData = userDoc.data()
      return { ...firebaseUser, ...userData }
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
    signUpWithGoogle,
    signIn,
    signInWithGoogle,
    signOut,
  }
}
