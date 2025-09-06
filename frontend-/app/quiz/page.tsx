"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Leaf, CheckCircle, XCircle, Award, Share2, RotateCcw, ArrowRight } from "lucide-react"
import Link from "next/link"

const quizQuestions = [
  {
    id: 1,
    question: "How much CO₂ can be saved by buying one second-hand t-shirt instead of new?",
    options: [
      { id: "a", text: "0.5 kg", correct: false },
      { id: "b", text: "2.1 kg", correct: true },
      { id: "c", text: "5.2 kg", correct: false },
      { id: "d", text: "10.3 kg", correct: false },
    ],
    explanation:
      "Manufacturing a new cotton t-shirt produces approximately 2.1 kg of CO₂. By choosing second-hand, you prevent this emission entirely!",
    tip: "Always check thrift stores and online marketplaces before buying new clothing.",
  },
  {
    id: 2,
    question: "What percentage of clothing ends up in landfills within one year of purchase?",
    options: [
      { id: "a", text: "15%", correct: false },
      { id: "b", text: "35%", correct: false },
      { id: "c", text: "65%", correct: true },
      { id: "d", text: "85%", correct: false },
    ],
    explanation:
      "Approximately 65% of clothing is discarded within a year. Fast fashion contributes significantly to this waste problem.",
    tip: "Choose quality pieces that last longer and consider the cost-per-wear when shopping.",
  },
  {
    id: 3,
    question: "How many liters of water are needed to produce one pair of jeans?",
    options: [
      { id: "a", text: "500 liters", correct: false },
      { id: "b", text: "1,800 liters", correct: false },
      { id: "c", text: "7,600 liters", correct: true },
      { id: "d", text: "12,000 liters", correct: false },
    ],
    explanation:
      "It takes approximately 7,600 liters of water to produce one pair of jeans - that's enough drinking water for one person for 7 years!",
    tip: "Buying pre-owned jeans saves thousands of liters of water and reduces textile waste.",
  },
  {
    id: 4,
    question: "Which material has the lowest environmental impact when produced?",
    options: [
      { id: "a", text: "Conventional Cotton", correct: false },
      { id: "b", text: "Polyester", correct: false },
      { id: "c", text: "Organic Hemp", correct: true },
      { id: "d", text: "Nylon", correct: false },
    ],
    explanation:
      "Organic hemp requires minimal water, no pesticides, and actually improves soil health while growing. It's one of the most sustainable materials available.",
    tip: "Look for items made from sustainable materials like hemp, organic cotton, or recycled fibers.",
  },
  {
    id: 5,
    question: "How long does it take for synthetic clothing to decompose in landfills?",
    options: [
      { id: "a", text: "5-10 years", correct: false },
      { id: "b", text: "20-40 years", correct: false },
      { id: "c", text: "200+ years", correct: true },
      { id: "d", text: "It never decomposes", correct: false },
    ],
    explanation:
      "Synthetic materials like polyester can take 200+ years to decompose, releasing microplastics into the environment during the process.",
    tip: "Extend the life of synthetic clothing through proper care and consider natural fiber alternatives.",
  },
]

type QuizState = "start" | "quiz" | "results"

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleNextQuestion = () => {
    const question = quizQuestions[currentQuestion]
    const isCorrect = question.options.find((opt) => opt.id === selectedAnswer)?.correct || false

    setAnswers([...answers, selectedAnswer])
    if (isCorrect) {
      setScore(score + 1)
    }

    if (!showExplanation) {
      setShowExplanation(true)
      return
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowExplanation(false)
    } else {
      setQuizState("results")
    }
  }

  const resetQuiz = () => {
    setQuizState("start")
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setAnswers([])
    setShowExplanation(false)
    setScore(0)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80)
      return { title: "Eco Expert!", message: "You're a sustainability superstar!", level: "Expert" }
    if (percentage >= 60)
      return { title: "Eco Enthusiast!", message: "Great knowledge of sustainability!", level: "Enthusiast" }
    if (percentage >= 40) return { title: "Eco Learner!", message: "You're on the right track!", level: "Learner" }
    return { title: "Eco Beginner!", message: "Every expert was once a beginner!", level: "Beginner" }
  }

  const ecoPointsEarned = score * 10 + 25 // Base points + bonus for each correct answer

  if (quizState === "start") {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">EcoFinds</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/items" className="text-gray-600 hover:text-green-600 transition-colors">
                Browse Items
              </Link>
              <Link href="/quiz" className="text-green-600 font-medium">
                Eco Quiz
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/items">Browse Items</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sustainability Quiz</h1>
            <p className="text-xl text-gray-600 mb-8">
              Test your knowledge about sustainable fashion and environmental impact. Learn while you play and earn
              eco-points!
            </p>

            <Card className="border-green-100 mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">~3</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">75+</div>
                    <div className="text-sm text-gray-600">Eco Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Learn about environmental impact of fashion</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Discover sustainable shopping tips</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Earn eco-points for your knowledge</span>
              </div>
              <div className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Get personalized sustainability recommendations</span>
              </div>
            </div>

            <Button size="lg" onClick={() => setQuizState("quiz")} className="bg-green-600 hover:bg-green-700">
              Start Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (quizState === "results") {
    const scoreData = getScoreMessage()
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">EcoFinds</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/items" className="text-gray-600 hover:text-green-600 transition-colors">
                Browse Items
              </Link>
              <Link href="/quiz" className="text-green-600 font-medium">
                Eco Quiz
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/items">Browse Items</Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{scoreData.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{scoreData.message}</p>

            <Card className="border-green-100 mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {score}/{quizQuestions.length}
                    </div>
                    <div className="text-sm text-gray-600">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {((score / quizQuestions.length) * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-1">+{ecoPointsEarned}</div>
                    <div className="text-sm text-gray-600">Eco Points Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Your Sustainability Level: {scoreData.level}
                </CardTitle>
                <CardDescription>Personalized recommendations based on your quiz performance</CardDescription>
              </CardHeader>
              <CardContent className="text-left space-y-4">
                {score >= 4 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Keep up the great work!</h4>
                    <p className="text-sm text-green-700">
                      You have excellent knowledge about sustainability. Consider sharing your knowledge with friends
                      and family to multiply your impact.
                    </p>
                  </div>
                )}
                {score >= 2 && score < 4 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">You're on the right track!</h4>
                    <p className="text-sm text-blue-700">
                      Continue learning about sustainable practices. Check out our blog for more tips on eco-friendly
                      shopping.
                    </p>
                  </div>
                )}
                {score < 2 && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Great start!</h4>
                    <p className="text-sm text-yellow-700">
                      Every sustainability journey begins with learning. Explore our marketplace to see the impact of
                      second-hand shopping.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Actions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Browse our sustainable marketplace for eco-friendly finds</li>
                    <li>• Share this quiz with friends to spread awareness</li>
                    <li>• Track your environmental impact on your dashboard</li>
                    <li>• Join our community challenges for more eco-points</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/items">Shop Sustainably</Link>
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz state
  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">EcoFinds</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
            <Button variant="ghost" onClick={resetQuiz}>
              Exit Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showExplanation ? (
                <>
                  <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer py-2">
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <Button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Submit Answer
                  </Button>
                </>
              ) : (
                <>
                  {/* Show correct/incorrect feedback */}
                  <div className="space-y-4">
                    {question.options.map((option) => {
                      const isSelected = option.id === selectedAnswer
                      const isCorrect = option.correct
                      let bgColor = ""
                      let icon = null

                      if (isCorrect) {
                        bgColor = "bg-green-50 border-green-200"
                        icon = <CheckCircle className="h-5 w-5 text-green-600" />
                      } else if (isSelected && !isCorrect) {
                        bgColor = "bg-red-50 border-red-200"
                        icon = <XCircle className="h-5 w-5 text-red-600" />
                      } else {
                        bgColor = "bg-gray-50 border-gray-200"
                      }

                      return (
                        <div key={option.id} className={`p-3 rounded-lg border ${bgColor} flex items-center gap-3`}>
                          {icon}
                          <span className={isCorrect ? "font-medium" : ""}>{option.text}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Did you know?</h4>
                    <p className="text-sm text-blue-700 mb-3">{question.explanation}</p>
                    <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800 font-medium">💡 Eco Tip: {question.tip}</p>
                    </div>
                  </div>

                  <Button onClick={handleNextQuestion} className="w-full bg-green-600 hover:bg-green-700">
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
