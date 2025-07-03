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
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function SignupForm() {
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") || "student"
  const router = useRouter()
  const { signUp } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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
        name: formData.name,
        school: formData.school,
        userType,
        ...(userType === "student"
          ? { grade: formData.grade }
          : { role: formData.role, studentCount: formData.studentCount }),
      })

      toast({
        title: "Account created successfully!",
        description: "Welcome to Future Quest. Redirecting to your dashboard...",
      })

      // Redirect based on user type
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            {userType === "student"
              ? "Thanks for sharing that information! Now, we just need a few more things from you before you can get started on your quest."
              : "Join Future Quest as an educator and help guide students on their career exploration journey."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
              />
            </div>

            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {userType !== "student" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="e.g., Counselor, Teacher, etc."
                    required
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  />
                </div>

                <div className="space-y-3">
                  <Label>How many students are you responsible for?</Label>
                  <RadioGroup
                    value={formData.studentCount}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, studentCount: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-25" id="0-25" />
                      <Label htmlFor="0-25">0-25</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="25-75" id="25-75" />
                      <Label htmlFor="25-75">25-75</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="75-150" id="75-150" />
                      <Label htmlFor="75-150">75-150</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="150+" id="150+" />
                      <Label htmlFor="150+">150+</Label>
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
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
