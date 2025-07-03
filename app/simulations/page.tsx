"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  Clock,
  ArrowRight,
  Star,
  Lock,
  Zap,
  Trophy,
  Sparkles,
  MapPin,
  Settings,
  Eye,
  Play,
  Palette,
} from "lucide-react"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function SimulationsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null)
  const [cityView, setCityView] = useState<"grid" | "city">("city")

  // Mock simulations data
  const simulations = [
    {
      id: 1,
      title: "Brand Manager for Celebrity",
      description: "Create marketing campaigns and manage brand partnerships for a rising celebrity",
      category: "Marketing",
      duration: "45 min",
      difficulty: "Beginner",
      xpReward: 200,
      completed: false,
      unlocked: true,
      buildingUnlocked: "Marketing Agency",
      buildingEmoji: "🏢",
      interests: ["creative", "business"],
    },
    {
      id: 2,
      title: "Superconductor Engineer",
      description: "Design materials for next-generation levitating transportation systems",
      category: "Engineering",
      duration: "60 min",
      difficulty: "Intermediate",
      xpReward: 300,
      completed: false,
      unlocked: true,
      buildingUnlocked: "Research Lab",
      buildingEmoji: "🔬",
      interests: ["technology", "science"],
    },
    {
      id: 3,
      title: "Healthcare Administrator",
      description: "Manage hospital operations and optimize patient care systems",
      category: "Healthcare",
      duration: "50 min",
      difficulty: "Beginner",
      xpReward: 250,
      completed: true,
      unlocked: true,
      buildingUnlocked: "Hospital",
      buildingEmoji: "🏥",
      interests: ["healthcare", "management"],
    },
    {
      id: 4,
      title: "Financial Analyst",
      description: "Analyze market trends and make investment recommendations",
      category: "Finance",
      duration: "55 min",
      difficulty: "Advanced",
      xpReward: 350,
      completed: false,
      unlocked: false,
      buildingUnlocked: "Financial District",
      buildingEmoji: "🏦",
      interests: ["finance", "analytics"],
    },
    {
      id: 5,
      title: "Software Developer",
      description: "Build applications and solve complex programming challenges",
      category: "Technology",
      duration: "70 min",
      difficulty: "Intermediate",
      xpReward: 400,
      completed: false,
      unlocked: true,
      buildingUnlocked: "Tech Campus",
      buildingEmoji: "💻",
      interests: ["technology", "programming"],
    },
    {
      id: 6,
      title: "Environmental Scientist",
      description: "Research climate solutions and sustainable technologies",
      category: "Science",
      duration: "65 min",
      difficulty: "Advanced",
      xpReward: 380,
      completed: false,
      unlocked: false,
      buildingUnlocked: "Green Research Center",
      buildingEmoji: "🌱",
      interests: ["science", "environment"],
    },
  ]

  // Mock user interests (would come from onboarding quiz)
  const userInterests = ["technology", "healthcare", "creative"]

  // Filter simulations based on user interests
  const relevantSimulations = simulations.filter((sim) =>
    sim.interests.some((interest) => userInterests.includes(interest)),
  )

  const unlockedBuildings = simulations.filter((sim) => sim.completed)
  const availableBuildings = simulations.filter((sim) => sim.unlocked && !sim.completed)

  const cityProgress = {
    buildingsUnlocked: unlockedBuildings.length,
    totalBuildings: relevantSimulations.length,
    cityLevel: Math.floor(unlockedBuildings.length / 2) + 1,
  }

  // Mock city layout (3x3 grid)
  const cityGrid = Array(9).fill(null)
  // Place unlocked buildings
  unlockedBuildings.forEach((building, index) => {
    if (index < 9) {
      cityGrid[index] = building
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <DashboardHeader
        title="🏙️ Your Future City"
        subtitle="Build your personalized career city by completing simulations"
        showBackButton={true}
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={cityView} onValueChange={(value) => setCityView(value as "grid" | "city")} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="city">
                <Building className="mr-2 h-4 w-4" />
                City View
              </TabsTrigger>
              <TabsTrigger value="grid">
                <Play className="mr-2 h-4 w-4" />
                Simulations
              </TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Customize
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                3D View
              </Button>
            </div>
          </div>

          {/* City Progress */}
          <Card className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Building className="mr-2 h-6 w-6" />
                Your Career City - Level {cityProgress.cityLevel}
              </CardTitle>
              <CardDescription className="text-green-100">
                Complete simulations to unlock new buildings and customize your futuristic career city
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">City Development Progress</h3>
                      <p className="text-sm opacity-90">
                        {cityProgress.buildingsUnlocked} of {cityProgress.totalBuildings} buildings unlocked
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {Math.round((cityProgress.buildingsUnlocked / cityProgress.totalBuildings) * 100)}%
                      </div>
                      <div className="text-xs opacity-80">Complete</div>
                    </div>
                  </div>
                  <Progress
                    value={(cityProgress.buildingsUnlocked / cityProgress.totalBuildings) * 100}
                    className="h-3 bg-white/20"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Building className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Buildings</div>
                    <div className="text-lg font-bold">{cityProgress.buildingsUnlocked}</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Completed</div>
                    <div className="text-lg font-bold">{simulations.filter((s) => s.completed).length}</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Zap className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Available</div>
                    <div className="text-lg font-bold">{availableBuildings.length}</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Sparkles className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">City Level</div>
                    <div className="text-lg font-bold">{cityProgress.cityLevel}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="city" className="space-y-6">
            {/* City Builder Interface */}
            <Card className="bg-gradient-to-br from-sky-100 to-blue-200 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Your Future City Layout
                </CardTitle>
                <CardDescription>Drag and drop buildings to customize your city layout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-200 to-blue-300 p-8 rounded-xl">
                  <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                    {cityGrid.map((building, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-xl border-2 border-dashed border-white/50 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                          building
                            ? "bg-white/90 backdrop-blur-sm shadow-lg border-solid border-white"
                            : "bg-white/20 hover:bg-white/30"
                        }`}
                        onClick={() => building && setSelectedBuilding(building)}
                      >
                        {building ? (
                          <div className="text-center">
                            <div className="text-4xl mb-2">{building.buildingEmoji}</div>
                            <div className="text-xs font-medium text-gray-700">{building.buildingUnlocked}</div>
                          </div>
                        ) : (
                          <div className="text-center text-white/70">
                            <Building className="h-8 w-8 mx-auto mb-2" />
                            <div className="text-xs">Empty Lot</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Buildings to Place */}
                {availableBuildings.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Available Buildings
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {availableBuildings.map((building) => (
                        <div
                          key={building.id}
                          className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-300"
                        >
                          <div className="text-3xl mb-2">{building.buildingEmoji}</div>
                          <div className="text-sm font-medium text-gray-700">{building.buildingUnlocked}</div>
                          <Badge variant="outline" className="mt-2 text-xs">
                            Complete Simulation
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grid" className="space-y-6">
            {/* Personalized Simulations */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Star className="mr-2 h-5 w-5" />
                  Recommended for You
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Based on your interests: {userInterests.join(", ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relevantSimulations.slice(0, 3).map((simulation) => (
                    <Card
                      key={simulation.id}
                      className={`hover:shadow-xl transition-all duration-300 border-0 shadow-lg ${
                        !simulation.unlocked ? "opacity-60" : ""
                      } ${
                        simulation.completed
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-white/80 backdrop-blur-sm"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start mb-3">
                          <Badge
                            variant={simulation.completed ? "default" : "secondary"}
                            className={simulation.completed ? "bg-green-600" : ""}
                          >
                            {simulation.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {simulation.completed && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            {!simulation.unlocked && <Lock className="h-4 w-4 text-gray-400" />}
                          </div>
                        </div>

                        <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/20"></div>
                          <span className="text-4xl relative z-10">{simulation.buildingEmoji}</span>
                          {simulation.completed && (
                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                              <Star className="h-3 w-3 text-white fill-current" />
                            </div>
                          )}
                        </div>

                        <CardTitle className="text-lg leading-tight">{simulation.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{simulation.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-3 text-gray-500">
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {simulation.duration}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {simulation.difficulty}
                              </Badge>
                            </div>
                            {simulation.unlocked && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                                +{simulation.xpReward} XP
                              </Badge>
                            )}
                          </div>

                          {simulation.unlocked && (
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded flex items-center">
                              <Building className="inline h-3 w-3 mr-1" />
                              Unlocks: {simulation.buildingUnlocked}
                            </div>
                          )}

                          <Button
                            className={`w-full ${
                              simulation.completed
                                ? "bg-green-600 hover:bg-green-700"
                                : simulation.unlocked
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                  : ""
                            }`}
                            disabled={!simulation.unlocked}
                            variant={simulation.completed ? "default" : simulation.unlocked ? "default" : "secondary"}
                          >
                            {simulation.completed ? (
                              <>
                                <Trophy className="mr-2 h-4 w-4" />
                                Replay Simulation
                              </>
                            ) : simulation.unlocked ? (
                              <>
                                Start Simulation
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Complete Prerequisites
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* All Available Simulations */}
            <Card>
              <CardHeader>
                <CardTitle>All Career Simulations</CardTitle>
                <CardDescription>Explore all available career paths and unlock new opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {simulations
                    .filter((sim) => !relevantSimulations.includes(sim))
                    .map((simulation) => (
                      <Card
                        key={simulation.id}
                        className={`hover:shadow-xl transition-all duration-300 border-0 shadow-lg opacity-50 ${
                          simulation.completed
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                            : "bg-white/80 backdrop-blur-sm"
                        }`}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="opacity-60">
                              {simulation.category}
                            </Badge>
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>

                          <div className="w-full h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                            <span className="text-4xl opacity-50">{simulation.buildingEmoji}</span>
                          </div>

                          <CardTitle className="text-lg leading-tight opacity-60">{simulation.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed opacity-60">
                            {simulation.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500 mb-2">Not matched to your interests</p>
                            <Button size="sm" variant="outline" disabled>
                              <Lock className="mr-2 h-3 w-3" />
                              Hidden
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
