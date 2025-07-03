"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Lightbulb,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  Award,
  Sparkles,
  Play,
  Globe,
  Building,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export function StudentDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Mock data - will be replaced with real data from Firebase
  const mockData = {
    xp: 1250,
    level: 3,
    nextLevelXP: 1500,
    simulationsCompleted: 2,
    hoursExperienced: 4.5,
    careersExplored: 3,
    currentStreak: 5,
    badges: ["First Steps", "Explorer", "Dedicated Learner"],
    hasCompletedFirstSimulation: true, // This determines if insights show
    recommendedSimulations: [
      {
        id: 1,
        title: "Brand Manager for Celebrity",
        description: "Create marketing campaigns and manage brand partnerships",
        category: "Marketing",
        duration: "45 min",
        difficulty: "Beginner",
        xpReward: 200,
        unlocked: true,
      },
      {
        id: 2,
        title: "Superconductor Engineer",
        description: "Design materials for next-generation transportation",
        category: "Engineering",
        duration: "60 min",
        difficulty: "Intermediate",
        xpReward: 300,
        unlocked: true,
      },
      {
        id: 3,
        title: "Healthcare Administrator",
        description: "Manage hospital operations and patient care systems",
        category: "Healthcare",
        duration: "50 min",
        difficulty: "Beginner",
        xpReward: 250,
        unlocked: false,
      },
    ],
    insights: {
      industries: ["Technology", "Healthcare", "Creative Arts", "Finance"],
      careers: ["Software Developer", "UX Designer", "Digital Marketing Manager", "Data Analyst"],
      colleges: ["MIT", "Stanford University", "UC Berkeley", "Carnegie Mellon"],
      degrees: ["Computer Science", "Business Administration", "Digital Media", "Data Science"],
    },
  }

  const progressToNextLevel = ((mockData.xp % 500) / 500) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <DashboardHeader
        title={`Welcome back, ${user?.firstName || "Explorer"}! 🚀`}
        subtitle="Ready to continue your career exploration journey?"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with Level Progress */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Welcome to Future Quest
                </CardTitle>
                <CardDescription className="text-blue-100 mt-2">
                  Explore different career paths through immersive simulations and hands-on experiences. Discover your
                  interests, build skills, and shape your future.
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">Level {mockData.level}</div>
                <div className="text-sm opacity-90">{mockData.xp} XP</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {mockData.level + 1}</span>
                <span>
                  {mockData.xp}/{mockData.nextLevelXP} XP
                </span>
              </div>
              <Progress value={progressToNextLevel} className="h-3 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Progress Overview</h2>
            <p className="text-gray-600">Track your journey through career exploration</p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Continue Where You Left Off
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Simulations Completed</CardTitle>
              <BookOpen className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.simulationsCompleted}</div>
              <p className="text-xs opacity-80">Career experiences gained</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Hours Experienced</CardTitle>
              <Clock className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.hoursExperienced}</div>
              <p className="text-xs opacity-80">Hands-on learning time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Careers Explored</CardTitle>
              <Briefcase className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.careersExplored}</div>
              <p className="text-xs opacity-80">Different career paths</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total XP</CardTitle>
              <Zap className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.xp}</div>
              <p className="text-xs opacity-80">Experience points</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended Simulations */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                  Recommended Simulations
                </CardTitle>
                <CardDescription>Based on your interests and quiz responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.recommendedSimulations.map((simulation) => (
                  <div
                    key={simulation.id}
                    className={`border rounded-xl p-4 transition-all duration-200 ${
                      simulation.unlocked ? "hover:bg-gray-50 hover:shadow-md cursor-pointer" : "opacity-60 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{simulation.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{simulation.category}</Badge>
                        {simulation.unlocked && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            +{simulation.xpReward} XP
                          </Badge>
                        )}
                      </div>
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
                      <Button
                        size="sm"
                        disabled={!simulation.unlocked}
                        className={
                          simulation.unlocked
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            : ""
                        }
                      >
                        {simulation.unlocked ? "Start Simulation" : "Locked"}
                        {simulation.unlocked && <ArrowRight className="ml-2 h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full bg-transparent border-2 border-blue-200 hover:bg-blue-50"
                  onClick={() => router.push("/simulations")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  View Your Future City
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-600" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockData.badges.map((badge, index) => (
                    <div
                      key={badge}
                      className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                    >
                      <Award className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                      <p className="text-xs font-medium text-gray-700">{badge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights - Only show after first simulation */}
            {mockData.hasCompletedFirstSimulation ? (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Lightbulb className="mr-2 h-5 w-5 text-purple-600" />
                    Insights
                  </CardTitle>
                  <CardDescription>AI-generated insights based on your completed simulations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-sm">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Industries to Explore
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mockData.insights.industries.map((industry) => (
                        <Badge key={industry} variant="secondary" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-sm">
                      <Target className="mr-2 h-4 w-4" />
                      Careers to Explore
                    </h4>
                    <div className="space-y-1">
                      {mockData.insights.careers.slice(0, 4).map((career) => (
                        <div key={career} className="text-sm text-gray-600 flex items-center">
                          <Star className="mr-2 h-3 w-3 text-yellow-500" />
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-sm">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Colleges to Explore
                    </h4>
                    <div className="space-y-1">
                      {mockData.insights.colleges.slice(0, 4).map((college) => (
                        <div key={college} className="text-sm text-gray-600">
                          • {college}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-sm">
                      <Globe className="mr-2 h-4 w-4" />
                      Degree Options to Explore
                    </h4>
                    <div className="space-y-1">
                      {mockData.insights.degrees.slice(0, 4).map((degree) => (
                        <div key={degree} className="text-sm text-gray-600">
                          • {degree}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-600">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="text-gray-500 mb-4">
                    <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Complete your first simulation to unlock AI-powered insights!</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => router.push("/simulations")} className="bg-white">
                    Start First Simulation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
