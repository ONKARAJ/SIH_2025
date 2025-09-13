'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, Star, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'festivals' | 'culture' | 'history' | 'traditions';
  points: number;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  achievements: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which is the most famous tribal festival celebrated in Jharkhand?",
    options: ["Sohrai", "Karma", "Tusu", "All of the above"],
    correct: 3,
    explanation: "All three - Sohrai, Karma, and Tusu - are major tribal festivals celebrated across Jharkhand with great enthusiasm.",
    difficulty: 'easy',
    category: 'festivals',
    points: 10
  },
  {
    id: 2,
    question: "During which season is the Karma festival typically celebrated?",
    options: ["Spring", "Summer", "Monsoon", "Winter"],
    correct: 2,
    explanation: "Karma festival is celebrated during the monsoon season (August-September) to worship the Karma tree and pray for prosperity.",
    difficulty: 'medium',
    category: 'festivals',
    points: 15
  },
  {
    id: 3,
    question: "What is the traditional dance form associated with Sohrai festival?",
    options: ["Jhumair", "Chhau", "Paika", "Domkach"],
    correct: 1,
    explanation: "Jhumair is the traditional dance form performed during Sohrai festival, celebrating the harvest and cattle worship.",
    difficulty: 'medium',
    category: 'culture',
    points: 15
  },
  {
    id: 4,
    question: "Which tribe is primarily associated with the Tusu festival?",
    options: ["Santhal", "Munda", "Oraon", "Kurukh"],
    correct: 1,
    explanation: "The Tusu festival is primarily celebrated by the Santhal tribe, marking the harvest season and honoring the Tusu deity.",
    difficulty: 'hard',
    category: 'traditions',
    points: 20
  },
  {
    id: 5,
    question: "What is the traditional musical instrument played during Karma festival?",
    options: ["Madal", "Dhol", "Mandar", "All of the above"],
    correct: 3,
    explanation: "All these instruments - Madal, Dhol, and Mandar - are traditional percussion instruments played during Karma festival celebrations.",
    difficulty: 'easy',
    category: 'culture',
    points: 10
  },
  {
    id: 6,
    question: "Which historical period saw the maximum cultural development in Jharkhand?",
    options: ["Mauryan Period", "Gupta Period", "Medieval Period", "Colonial Period"],
    correct: 2,
    explanation: "The Medieval Period saw significant cultural development in Jharkhand with the flourishing of tribal art, music, and festivals.",
    difficulty: 'hard',
    category: 'history',
    points: 20
  },
  {
    id: 7,
    question: "What is the significance of the Sal tree in Jharkhand's tribal culture?",
    options: ["Sacred worship", "Building material", "Medicine", "All of the above"],
    correct: 3,
    explanation: "The Sal tree holds multiple significances - it's sacred for worship, used as building material, and has medicinal properties in tribal culture.",
    difficulty: 'medium',
    category: 'traditions',
    points: 15
  },
  {
    id: 8,
    question: "During Sohrai festival, houses are decorated with which traditional art form?",
    options: ["Warli painting", "Madhubani", "Sohrai painting", "Gond art"],
    correct: 2,
    explanation: "Sohrai painting is the traditional art form used to decorate houses during Sohrai festival, featuring geometric patterns and natural motifs.",
    difficulty: 'easy',
    category: 'culture',
    points: 10
  }
];

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500'
};

const categoryEmojis = {
  festivals: '🎉',
  culture: '🎭',
  history: '📜',
  traditions: '🏺'
};

export default function CulturalQuiz({ onComplete }: { onComplete?: (result: QuizResult) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && startTime) {
      interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, startTime]);

  const startQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (value: string) => {
    if (!showAnswer) {
      setSelectedAnswer(value);
    }
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;

    const answerIndex = parseInt(selectedAnswer);
    const isCorrect = answerIndex === question.correct;
    
    setAnswers(prev => [...prev, answerIndex]);
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
      setCorrectAnswers(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    const achievements: string[] = [];
    
    // Determine achievements based on performance
    if (correctAnswers === quizQuestions.length) {
      achievements.push('Perfect Score!');
    }
    if (correctAnswers >= quizQuestions.length * 0.8) {
      achievements.push('Cultural Expert');
    }
    if (timeSpent < 120) {
      achievements.push('Speed Learner');
    }

    const result: QuizResult = {
      score,
      totalQuestions: quizQuestions.length,
      correctAnswers,
      timeSpent,
      achievements
    };

    onComplete?.(result);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowAnswer(false);
    setScore(0);
    setCorrectAnswers(0);
    setStartTime(null);
    setTimeSpent(0);
    setAnswers([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Cultural Knowledge Quiz
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Test your knowledge about Jharkhand's rich festivals and cultural traditions
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{quizQuestions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">10-20</div>
              <div className="text-sm text-muted-foreground">Points Each</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3-5</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Mixed</div>
              <div className="text-sm text-muted-foreground">Difficulty</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Quiz Categories:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryEmojis).map(([category, emoji]) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1">
                  <span>{emoji}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={startQuiz} size="lg" className="w-full">
            <Trophy className="h-5 w-5 mr-2" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    const grade = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Keep Learning';
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{percentage}%</div>
            <div className="text-xl text-muted-foreground">{grade}</div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}/{quizQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
              <div className="text-center p-4 bg-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round(score/timeSpent*60)}</div>
                <div className="text-sm text-muted-foreground">Points/Min</div>
              </div>
            </div>

            {/* Achievements */}
            {timeSpent > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold">Achievements Earned:</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {correctAnswers === quizQuestions.length && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Perfect Score!
                    </Badge>
                  )}
                  {correctAnswers >= quizQuestions.length * 0.8 && (
                    <Badge className="bg-blue-500 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Cultural Expert
                    </Badge>
                  )}
                  {timeSpent < 120 && (
                    <Badge className="bg-green-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Speed Learner
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={restartQuiz} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={() => window.location.reload()}>
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="flex items-center gap-1">
            <span>{categoryEmojis[question.category]}</span>
            {question.category}
          </Badge>
          <div className="flex items-center gap-4">
            <Badge className={`${difficultyColors[question.difficulty]} text-white`}>
              {question.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {formatTime(timeSpent)}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{question.points} points</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
          
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index.toString();
                const isCorrect = index === question.correct;
                const isWrong = showAnswer && isSelected && !isCorrect;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                      showAnswer
                        ? isCorrect
                          ? 'bg-green-50 border-green-300'
                          : isWrong
                          ? 'bg-red-50 border-red-300'
                          : 'bg-muted/30'
                        : isSelected
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      disabled={showAnswer}
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                    {showAnswer && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {showAnswer && isWrong && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {showAnswer && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Score: {score} points
          </div>
          <div>
            {!showAnswer ? (
              <Button 
                onClick={submitAnswer} 
                disabled={!selectedAnswer}
                className="px-8"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="px-8">
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Complete Quiz
                    <Trophy className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
