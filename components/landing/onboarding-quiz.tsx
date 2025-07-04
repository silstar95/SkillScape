"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const QUIZ_STEPS = [
  {
    id: "user-type",
    title: "Welcome! Let's get started",
    question: "Are you a...?",
    type: "radio",
    options: [
      { value: "student", label: "Student" },
      { value: "counselor", label: "Counselor" },
      { value: "teacher", label: "Teacher" },
      { value: "parent", label: "Parent" },
    ],
  },
  {
    id: "enjoyed-subjects",
    title: "Tell us about your interests",
    question: "Select 2 classes/subjects that you have enjoyed in school:",
    type: "checkbox",
    maxSelections: 2,
    options: [
      { value: "math", label: "Mathematics" },
      { value: "science", label: "Science" },
      { value: "english", label: "English/Literature" },
      { value: "history", label: "History" },
      { value: "art", label: "Art" },
      { value: "music", label: "Music" },
      { value: "pe", label: "Physical Education" },
      { value: "computer", label: "Computer Science" },
      { value: "foreign-language", label: "Foreign Language" },
      { value: "business", label: "Business Studies" },
    ],
  },
  {
    id: "disliked-subjects",
    title: "Understanding your preferences",
    question: "Select 2 classes/subjects that you didn't enjoy in school:",
    type: "checkbox",
    maxSelections: 2,
    options: [
      { value: "math", label: "Mathematics" },
      { value: "science", label: "Science" },
      { value: "english", label: "English/Literature" },
      { value: "history", label: "Art" },
      { value: "music", label: "Music" },
      { value: "pe", label: "Physical Education" },
      { value: "computer", label: "Computer Science" },
      { value: "foreign-language", label: "Foreign Language" },
      { value: "business", label: "Business Studies" },
    ],
  },
  {
    id: "extracurriculars",
    title: "Your activities and hobbies",
    question: "Select three extracurriculars that interest you:",
    type: "checkbox",
    maxSelections: 3,
    options: [
      { value: "sports", label: "Sports Teams" },
      { value: "debate", label: "Debate Club" },
      { value: "drama", label: "Drama/Theater" },
      { value: "music-band", label: "Band/Orchestra" },
      { value: "student-gov", label: "Student Government" },
      { value: "volunteer", label: "Volunteer Work" },
      { value: "coding", label: "Coding/Programming" },
      { value: "photography", label: "Photography" },
      { value: "writing", label: "Creative Writing" },
      { value: "robotics", label: "Robotics Club" },
    ],
  },
  {
    id: "career-interests",
    title: "Career exploration",
    question: "Select two careers/fields you are most interested in:",
    type: "checkbox",
    maxSelections: 2,
    options: [
      { value: "healthcare", label: "Healthcare" },
      { value: "technology", label: "Technology" },
      { value: "business", label: "Business" },
      { value: "education", label: "Education" },
      { value: "arts", label: "Arts & Entertainment" },
      { value: "engineering", label: "Engineering" },
      { value: "law", label: "Law & Government" },
      { value: "science", label: "Science & Research" },
      { value: "finance", label: "Finance" },
      { value: "marketing", label: "Marketing & Communications" },
    ],
  },
  {
    id: "career-knowledge-1",
    title: "Your current knowledge",
    question: "", // Will be dynamically set
    type: "radio",
    options: [
      { value: "beginner", label: "Beginner - I know very little about this field" },
      { value: "some", label: "Some knowledge - I have basic understanding" },
      { value: "moderate", label: "Moderate - I have researched this field" },
      { value: "advanced", label: "Advanced - I have significant knowledge" },
    ],
  },
  {
    id: "career-knowledge-2",
    title: "Your current knowledge",
    question: "", // Will be dynamically set
    type: "radio",
    options: [
      { value: "beginner", label: "Beginner - I know very little about this field" },
      { value: "some", label: "Some knowledge - I have basic understanding" },
      { value: "moderate", label: "Moderate - I have researched this field" },
      { value: "advanced", label: "Advanced - I have significant knowledge" },
    ],
  },
  {
    id: "exploration-methods",
    title: "Your exploration journey",
    question:
      "How have you learned more about careers? Share the steps you have taken to explore careers/fields you are interested in:",
    type: "textarea",
    placeholder: "Tell us about any research, conversations, experiences, or other ways you've explored careers...",
  },
]

export function OnboardingQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const router = useRouter()

  const getCurrentQuestion = () => {
    const question = { ...QUIZ_STEPS[currentStep] }

    if (question.id === "career-knowledge-1") {
      const selectedCareers = answers["career-interests"] || []
      const firstCareer = selectedCareers[0]
      question.question = `How would you describe your knowledge about ${firstCareer} career you picked above?`
    } else if (question.id === "career-knowledge-2") {
      const selectedCareers = answers["career-interests"] || []
      const secondCareer = selectedCareers[1]
      question.question = `How would you describe your knowledge about ${secondCareer} career you picked above?`
    }

    return question
  }

  const currentQuestion = getCurrentQuestion()
  const isLastStep = currentStep === QUIZ_STEPS.length - 1

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep === 0 && answers["user-type"] !== "student") {
      // Redirect non-students to counselor signup
      router.push("/auth/signup?type=counselor")
      return
    }

    if (isLastStep) {
      // Store answers and redirect to student signup
      localStorage.setItem("onboardingAnswers", JSON.stringify(answers))
      router.push("/auth/signup?type=student")
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const canProceed = () => {
    const answer = answers[currentQuestion.id]
    if (!answer) return false

    if (currentQuestion.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0
    }

    if (currentQuestion.type === "textarea") {
      return answer.trim().length > 0
    }

    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-48 h-48 bg-indigo-100/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-100/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-2xl relative z-10 bg-white/95 backdrop-blur-sm shadow-xl border-0 ring-1 ring-gray-200/50">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {QUIZ_STEPS.length}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {currentQuestion.title}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestion.type === "radio" && (
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-base cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "checkbox" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option) => {
                const selectedItems = answers[currentQuestion.id] || []
                const isSelected = selectedItems.includes(option.value)
                const maxReached = selectedItems.length >= (currentQuestion.maxSelections || 3)

                return (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={isSelected}
                      disabled={!isSelected && maxReached}
                      onCheckedChange={(checked) => {
                        const current = answers[currentQuestion.id] || []
                        if (checked) {
                          handleAnswer(currentQuestion.id, [...current, option.value])
                        } else {
                          handleAnswer(
                            currentQuestion.id,
                            current.filter((item: string) => item !== option.value),
                          )
                        }
                      }}
                    />
                    <Label
                      htmlFor={option.value}
                      className={`text-base cursor-pointer ${!isSelected && maxReached ? "text-muted-foreground" : ""}`}
                    >
                      {option.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          )}

          {currentQuestion.type === "textarea" && (
            <Textarea
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              className="min-h-32"
            />
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLastStep ? "Complete Quiz" : "Next"}
              {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
