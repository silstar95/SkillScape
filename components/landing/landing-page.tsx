"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingQuiz } from "./onboarding-quiz"
import { Rocket, Users, Star, Globe, Brain, Trophy, ArrowRight, Sparkles, Building2, Gamepad2 } from "lucide-react"
import { LoginForm } from "../auth/login-form"
import { useSearchParams } from "next/navigation"

export function LandingPage() {
  const searchParams = useSearchParams()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [authMode, setAuthMode] = useState<"signup" | "login" | null>(null)

  // Check if redirected from login page
  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      setAuthMode("signup")
      setShowOnboarding(true)
    }
  }, [searchParams])

  if (showOnboarding && authMode === "signup") {
    return <OnboardingQuiz />
  }

  if (authMode === "login") {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 right-10 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium">The Future of Career Exploration</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              Future Quest
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200">
             Explore different career paths through{" "}
            <span className="text-yellow-400 font-semibold">immersive simulations</span> and hands-on experiences.
            <br />
            Discover your interests, build skills, and{" "}
            <span className="text-blue-400 font-semibold">shape your future</span> in a gamified world.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-sm text-gray-300">Students Exploring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-300">Career Simulations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">95%</div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-yellow-400 animate-bounce">🚀 Ready to discover your future?</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl border-0 group"
                onClick={() => {
                  setAuthMode("signup")
                  setShowOnboarding(true)
                }}
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                Start Your Quest
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                onClick={() => setAuthMode("login")}
              >
                <Users className="mr-3 h-5 w-5" />
                Already Have Account?
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Future Quest?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most advanced career exploration platform designed specifically for high school students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Interactive Simulations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Experience real-world career scenarios through engaging, hands-on simulations that bring professions
                  to life with 2D gamified environments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-pink-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">AI-Powered Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Get personalized recommendations tailored to your interests, skills, and career aspirations using
                  advanced AI technology.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-emerald-100">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Build Your Future City</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-600 leading-relaxed">
                  Unlock buildings and create your personalized career city as you complete simulations and explore
                  different professions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Earn Rewards</h3>
              <p className="text-sm text-gray-600">Collect XP, badges, and achievements</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Educator Support</h3>
              <p className="text-sm text-gray-600">Teachers track student progress</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <Globe className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Real-World Skills</h3>
              <p className="text-sm text-gray-600">Learn practical career skills</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <Star className="h-12 w-12 mx-auto text-purple-500 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Personalized Path</h3>
              <p className="text-sm text-gray-600">Customized learning journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulation Preview Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Experience Career Simulations</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Step into realistic career environments and make decisions that matter
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                <CardTitle>Brand Manager Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-200">
                  Manage celebrity brand partnerships, create marketing campaigns, and navigate client relationships in
                  this interactive simulation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">⚗️</span>
                </div>
                <CardTitle>Materials Engineer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-200">
                  Design superconductors for levitating trains, test materials, and solve engineering challenges in a
                  futuristic lab environment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🏥</span>
                </div>
                <CardTitle>Healthcare Administrator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-200">
                  Manage hospital operations, optimize patient care systems, and make critical decisions that impact
                  healthcare delivery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Shape Your Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students already exploring their career paths through Future Quest
          </p>
          <Button
            size="lg"
            className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={() => {
              setAuthMode("signup")
              setShowOnboarding(true)
            }}
          >
            <Rocket className="mr-3 h-6 w-6" />
            Begin Your Journey
            <Sparkles className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  )
}
