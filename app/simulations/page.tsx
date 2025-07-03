"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Clock, ArrowRight, Star } from "lucide-react"

export default function SimulationsPage() {
  // Mock simulations data
  const simulations = [
    {
      id: 1,
      title: "Brand Manager for Celebrity",
      description: "Create marketing campaigns and manage brand partnerships for a rising celebrity",
      category: "Marketing",
      duration: "45 min",
      difficulty: "Beginner",
      completed: false,
      unlocked: true,
    },
    {
      id: 2,
      title: "Superconductor Engineer",
      description: "Design materials for next-generation levitating transportation systems",
      category: "Engineering",
      duration: "60 min",
      difficulty: "Intermediate",
      completed: false,
      unlocked: true,
    },
    {
      id: 3,
      title: "Healthcare Administrator",
      description: "Manage hospital operations and optimize patient care systems",
      category: "Healthcare",
      duration: "50 min",
      difficulty: "Beginner",
      completed: true,
      unlocked: true,
    },
    {
      id: 4,
      title: "Financial Analyst",
      description: "Analyze market trends and make investment recommendations",
      category: "Finance",
      duration: "55 min",
      difficulty: "Advanced",
      completed: false,
      unlocked: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Future City</h1>
          <p className="text-gray-600 mt-1">
            Complete simulations to unlock new buildings and expand your career exploration city
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* City Building Placeholder */}
        <Card className="mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Building className="mr-2 h-6 w-6" />
              Your Career City
            </CardTitle>
            <CardDescription className="text-green-100">
              Complete simulations to unlock new buildings and customize your futuristic career city
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/20 rounded-lg p-6 text-center">
              <p className="text-lg mb-2">🏗️ City Builder Coming Soon!</p>
              <p className="text-sm opacity-90">
                Your completed simulations will unlock hospitals, tech centers, and more buildings to place in your city
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Simulations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((simulation) => (
            <Card
              key={simulation.id}
              className={`hover:shadow-lg transition-all duration-200 ${
                !simulation.unlocked ? "opacity-60" : ""
              } ${simulation.completed ? "border-green-200 bg-green-50" : ""}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={simulation.completed ? "default" : "secondary"}>{simulation.category}</Badge>
                  {simulation.completed && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <CardTitle className="text-lg">{simulation.title}</CardTitle>
                <CardDescription>{simulation.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {simulation.duration}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {simulation.difficulty}
                    </Badge>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!simulation.unlocked}
                    variant={simulation.completed ? "outline" : "default"}
                  >
                    {simulation.completed ? "Replay Simulation" : simulation.unlocked ? "Start Simulation" : "Locked"}
                    {simulation.unlocked && <ArrowRight className="ml-2 h-3 w-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
