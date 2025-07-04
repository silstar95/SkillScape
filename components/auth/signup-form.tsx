"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export function SignupForm() {
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") || "student"
  const router = useRouter()
  const { signUp, signUpWithGoogle } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    school: "",
    grade: "",
    role: "",
    studentCount: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        school: formData.school,
        userType,
        ...(userType === "student"
          ? { grade: formData.grade }
          : { role: formData.role, studentCount: formData.studentCount }),
      })

      toast({
        title: "🎉 Account created successfully!",
        description: "Welcome to Future Quest. Redirecting to your dashboard...",
      })

      router.push(userType === "student" ? "/dashboard/student" : "/dashboard/counselor")
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    try {
      await signUpWithGoogle({
        userType,
        school: formData.school || "Not specified",
        ...(userType === "student"
          ? { grade: formData.grade || "Not specified" }
          : { role: formData.role || "Educator", studentCount: formData.studentCount || "0-25" }),
      })

      toast({
        title: "🎉 Account created successfully!",
        description: "Welcome to Future Quest. Redirecting to your dashboard...",
      })

      router.push(userType === "student" ? "/dashboard/student" : "/dashboard/counselor")
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40"></div>
        <div className="absolute top-24 left-32 w-48 h-48 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-24 w-64 h-64 bg-indigo-100/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-24 w-56 h-56 bg-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-80 right-32 w-32 h-32 bg-pink-100/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-xl border-0 bg-white/95 backdrop-blur-sm ring-1 ring-gray-200/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Join Future Quest
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {userType === "student"
              ? "Thanks for sharing that information! Now, we just need a few more things from you before you can get started on your quest."
              : "🎓 Join Future Quest as an educator and help guide students on their career exploration journey."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Sign Up */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 text-base border-2 hover:bg-gray-50 transition-all duration-200 bg-white/90 backdrop-blur-sm"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {googleLoading ? "Creating account..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="border-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                type="text"
                required
                value={formData.school}
                onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                className="border-2 focus:border-blue-500 transition-colors"
              />
            </div>

            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}>
                  <SelectTrigger className="border-2 focus:border-blue-500">
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9th Grade (Freshman)</SelectItem>
                    <SelectItem value="10">10th Grade (Sophomore)</SelectItem>
                    <SelectItem value="11">11th Grade (Junior)</SelectItem>
                    <SelectItem value="12">12th Grade (Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {userType === "counselor" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="e.g., School Counselor, Career Advisor"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    className="border-2 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label>How many students are you responsible for?</Label>
                  <RadioGroup
                    value={formData.studentCount}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, studentCount: value }))}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-25" id="0-25" />
                      <Label htmlFor="0-25" className="text-sm">
                        0-25
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="25-75" id="25-75" />
                      <Label htmlFor="25-75" className="text-sm">
                        25-75
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="75-150" id="75-150" />
                      <Label htmlFor="75-150" className="text-sm">
                        75-150
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="150+" id="150+" />
                      <Label htmlFor="150+" className="text-sm">
                        150+
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Create Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="border-2 focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500">Must be at least 6 characters</p>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
