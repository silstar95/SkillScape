"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Lightbulb,
  Building,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function StudentDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Mock data - will be replaced with real data from Firebase
  const mockData = {
    simulationsCompleted: 2,
    hoursExperienced: 4.5,
    careersExplored: 3,
    recommendedSimulations: [
      {
        id: 1,
        title: "Brand Manager for Celebrity",
        description: "Create marketing campaigns and manage brand partnerships",
        category: "Marketing",
        duration: "45 min",
        difficulty: "Beginner",
      },
      {
        id: 2,
        title: "Superconductor Engineer",
        description: "Design materials for next-generation transportation",
        category: "Engineering",
        duration: "60 min",
        difficulty: "Intermediate",
      },
      {
        id: 3,
        title: "Healthcare Administrator",
        description: "Manage hospital operations and patient care systems",
        category: "Healthcare",
        duration: "50 min",
        difficulty: "Beginner",
      },
    ],
    insights: {
      industries: ["Technology", "Healthcare", "Creative Arts"],
      careers: ["Software Developer", "UX Designer", "Digital Marketing Manager"],
      colleges: ["MIT", "Stanford University", "UC Berkeley"],
      degrees: ["Computer Science", "Business Administration", "Digital Media"],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || "Student"}!</h1>
              <p className="text-gray-600 mt-1">Ready to continue your career exploration journey?</p>
            </div>
            <Button onClick={() => router.push("/simulations")}>
              <Building className="mr-2 h-4 w-4" />
              View All Simulations
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Future Quest</CardTitle>
            <CardDescription className="text-blue-100">
              Explore different career paths through immersive simulations and hands-on experiences. Discover your
              interests, build skills, and shape your future.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Simulations Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.simulationsCompleted}</div>
              <p className="text-xs text-muted-foreground">+1 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Experienced</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.hoursExperienced}</div>
              <p className="text-xs text-muted-foreground">Hands-on learning time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Careers Explored</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.careersExplored}</div>
              <p className="text-xs text-muted-foreground">Different career paths</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended Simulations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recommended Simulations
                </CardTitle>
                <CardDescription>Based on your interests and quiz responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.recommendedSimulations.map((simulation) => (
                  <div key={simulation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{simulation.title}</h3>
                      <Badge variant="secondary">{simulation.category}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{simulation.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {simulation.duration}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {simulation.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm">
                        Start Simulation
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/simulations")}>
                  View All Simulations
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Your Insights
                </CardTitle>
                <CardDescription>AI-powered recommendations based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Industries to Explore
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mockData.insights.industries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    Careers to Explore
                  </h4>
                  <div className="space-y-1">
                    {mockData.insights.careers.map((career) => (
                      <div key={career} className="text-sm text-gray-600">
                        • {career}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Colleges to Explore
                  </h4>
                  <div className="space-y-1">
                    {mockData.insights.colleges.map((college) => (
                      <div key={college} className="text-sm text-gray-600">
                        • {college}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Degree Options
                  </h4>
                  <div className="space-y-1">
                    {mockData.insights.degrees.map((degree) => (
                      <div key={degree} className="text-sm text-gray-600">
                        • {degree}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
