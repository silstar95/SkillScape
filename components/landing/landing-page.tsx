"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingQuiz } from "./onboarding-quiz"
import { Rocket, Target, Users, Zap } from "lucide-react"

export function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  if (showOnboarding) {
    return <OnboardingQuiz />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg hero-pattern min-h-screen flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Welcome to Future Quest
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore different career paths through immersive simulations and hands-on experiences. Discover your
            interests, build skills, and shape your future.
          </p>
          <div className="space-y-4">
            <p className="text-lg font-medium">Ready to discover your future?</p>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
              onClick={() => setShowOnboarding(true)}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Start Your Quest
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Future Quest?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Interactive Simulations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Experience real-world career scenarios through engaging, hands-on simulations that bring professions
                  to life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Personalized Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get AI-powered recommendations tailored to your interests, skills, and career aspirations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Educator Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Teachers and counselors can track student progress and provide guided career exploration support.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
