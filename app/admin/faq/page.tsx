"use client"

import React, { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  X,
  AlertCircle,
  Trash2,
  Eye,
  Mail,
  Calendar
} from "lucide-react"
import { toast } from "sonner"

interface SubmittedQuestion {
  id: number
  name: string
  email: string
  question: string
  category: string
  date: string
  status: 'pending' | 'answered' | 'rejected'
  answer?: string
}

export default function AdminFAQPage() {
  const [questions, setQuestions] = useState<SubmittedQuestion[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<SubmittedQuestion | null>(null)
  const [answer, setAnswer] = useState("")
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered' | 'rejected'>('all')

  useEffect(() => {
    // Load submitted questions from localStorage
    const storedQuestions = localStorage.getItem("jharkhand-faq-questions")
    if (storedQuestions) {
      try {
        const parsedQuestions = JSON.parse(storedQuestions)
        setQuestions(parsedQuestions.sort((a: SubmittedQuestion, b: SubmittedQuestion) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ))
      } catch (error) {
        console.error("Error parsing FAQ questions:", error)
        setQuestions([])
      }
    }
  }, [])

  const filteredQuestions = questions.filter(q => {
    if (filter === 'all') return true
    return q.status === filter
  })

  const handleAnswerQuestion = (questionId: number) => {
    if (!answer.trim()) {
      toast.error("Please provide an answer")
      return
    }

    const updatedQuestions = questions.map(q => 
      q.id === questionId 
        ? { ...q, status: 'answered' as const, answer: answer.trim() }
        : q
    )

    setQuestions(updatedQuestions)
    localStorage.setItem("jharkhand-faq-questions", JSON.stringify(updatedQuestions))
    
    setSelectedQuestion(null)
    setAnswer("")
    toast.success("Question answered successfully!")
  }

  const handleRejectQuestion = (questionId: number) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId 
        ? { ...q, status: 'rejected' as const }
        : q
    )

    setQuestions(updatedQuestions)
    localStorage.setItem("jharkhand-faq-questions", JSON.stringify(updatedQuestions))
    toast.success("Question rejected")
  }

  const handleDeleteQuestion = (questionId: number) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId)
    setQuestions(updatedQuestions)
    localStorage.setItem("jharkhand-faq-questions", JSON.stringify(updatedQuestions))
    toast.success("Question deleted")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'answered': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'answered': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <X className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const categoryLabels = {
    general: 'General Travel',
    destinations: 'Destinations & Attractions',
    cultural: 'Cultural Experiences',
    accommodation: 'Accommodation & Booking',
    transportation: 'Transportation',
    safety: 'Safety & Health'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">FAQ Management</h1>
            <p className="text-muted-foreground">
              Review and respond to user-submitted questions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{questions.length}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {questions.filter(q => q.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {questions.filter(q => q.status === 'answered').length}
                </div>
                <div className="text-sm text-muted-foreground">Answered</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {questions.filter(q => q.status === 'rejected').length}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 mb-8">
            {['all', 'pending', 'answered', 'rejected'].map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? 'default' : 'outline'}
                onClick={() => setFilter(filterOption as any)}
                className="capitalize"
              >
                {filterOption}
                {filterOption !== 'all' && (
                  <span className="ml-2 text-xs">
                    ({questions.filter(q => q.status === filterOption).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Questions Found</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? "No questions have been submitted yet." 
                    : `No ${filter} questions found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="border-border">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{question.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{question.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(question.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {categoryLabels[question.category as keyof typeof categoryLabels] || question.category}
                        </Badge>
                        <Badge className={getStatusColor(question.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(question.status)}
                            <span className="capitalize">{question.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Question:</h4>
                      <p className="text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                        {question.question}
                      </p>
                    </div>

                    {question.answer && (
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2">Answer:</h4>
                        <p className="text-muted-foreground leading-relaxed bg-green-50 p-3 rounded-lg border border-green-200">
                          {question.answer}
                        </p>
                      </div>
                    )}

                    {question.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedQuestion(question)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Answer Question
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectQuestion(question.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}

                    {question.status !== 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Answer Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Answer Question</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedQuestion(null)
                    setAnswer("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 overflow-y-auto">
              <div>
                <h4 className="font-medium text-foreground mb-2">Question from {selectedQuestion.name}:</h4>
                <p className="text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                  {selectedQuestion.question}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Answer *
                </label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Provide a helpful and detailed answer..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAnswerQuestion(selectedQuestion.id)}
                  disabled={!answer.trim()}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Answer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedQuestion(null)
                    setAnswer("")
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}