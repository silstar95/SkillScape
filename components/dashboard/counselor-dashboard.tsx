"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Upload, MessageSquare, TrendingUp, BookOpen, Target, Mail, FileText } from "lucide-react"

export function CounselorDashboard() {
  const { user } = useAuth()
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null)

  // Mock data - will be replaced with real data from Firebase
  const mockData = {
    classrooms: [
      {
        id: "1",
        name: "AP Psychology Class",
        studentCount: 24,
        activeStudents: 18,
        completedSimulations: 45,
      },
      {
        id: "2",
        name: "Career Exploration Group",
        studentCount: 15,
        activeStudents: 12,
        completedSimulations: 28,
      },
    ],
    students: [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.j@school.edu",
        grade: "11",
        simulationsCompleted: 3,
        lastActive: "2 hours ago",
        status: "active",
        insights: ["Technology", "Healthcare"],
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike.c@school.edu",
        grade: "12",
        simulationsCompleted: 5,
        lastActive: "1 day ago",
        status: "active",
        insights: ["Engineering", "Finance"],
      },
      {
        id: "3",
        name: "Emma Davis",
        email: "emma.d@school.edu",
        grade: "10",
        simulationsCompleted: 1,
        lastActive: "3 days ago",
        status: "inactive",
        insights: ["Arts", "Education"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || "Counselor"}!</h1>
              <p className="text-gray-600 mt-1">Manage your classrooms and track student progress</p>
            </div>
            <div className="flex space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Bulk Invite
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bulk Invite Students</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file with student email addresses to invite multiple students at once.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="csv-file">CSV File</Label>
                      <Input id="csv-file" type="file" accept=".csv" />
                    </div>
                    <Button className="w-full">Upload and Invite</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Classroom
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Classroom</DialogTitle>
                    <DialogDescription>Set up a new classroom to organize and track your students.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="classroom-name">Classroom Name</Label>
                      <Input id="classroom-name" placeholder="e.g., AP Psychology Class" />
                    </div>
                    <div>
                      <Label htmlFor="classroom-description">Description (Optional)</Label>
                      <Textarea id="classroom-description" placeholder="Brief description of the classroom..." />
                    </div>
                    <Button className="w-full">Create Classroom</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">39</div>
                  <p className="text-xs text-muted-foreground">Across all classrooms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30</div>
                  <p className="text-xs text-muted-foreground">Active in last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Simulations Completed</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Student Activity</CardTitle>
                <CardDescription>Latest simulation completions and student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.students.slice(0, 3).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">
                            Completed {student.simulationsCompleted} simulations • {student.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {student.insights.map((insight) => (
                          <Badge key={insight} variant="secondary" className="text-xs">
                            {insight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classrooms" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.classrooms.map((classroom) => (
                <Card key={classroom.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {classroom.name}
                      <Badge variant="outline">{classroom.studentCount} students</Badge>
                    </CardTitle>
                    <CardDescription>{classroom.activeStudents} active students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Simulations Completed:</span>
                        <span className="font-medium">{classroom.completedSimulations}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Users className="mr-2 h-3 w-3" />
                          Manage
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="mr-2 h-3 w-3" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage individual student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-blue-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-500">
                              Grade {student.grade} • {student.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={student.status === "active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold">{student.simulationsCompleted}</div>
                          <div className="text-xs text-gray-500">Simulations</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold">{student.lastActive}</div>
                          <div className="text-xs text-gray-500">Last Active</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold">{student.insights.length}</div>
                          <div className="text-xs text-gray-500">Career Areas</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {student.insights.map((insight) => (
                            <Badge key={insight} variant="secondary" className="text-xs">
                              {insight}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Mail className="mr-2 h-3 w-3" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-3 w-3" />
                            Suggest Simulation
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Student activity and participation rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Daily Active Users</span>
                      <span className="font-semibold">18/39</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Weekly Completion Rate</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Session Time</span>
                      <span className="font-semibold">24 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Simulations</CardTitle>
                  <CardDescription>Most completed simulations this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Brand Manager</span>
                      <Badge>15 completions</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Healthcare Admin</span>
                      <Badge>12 completions</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engineering Design</span>
                      <Badge>8 completions</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
