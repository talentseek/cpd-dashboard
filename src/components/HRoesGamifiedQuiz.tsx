// /src/components/HRoesGamifiedQuiz.tsx
/* eslint-disable react/no-unescaped-entities */

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { Star, Award } from "lucide-react"
import { easyQuestions, mediumQuestions, hardQuestions, Level, Question } from "./QuizQuestions"
import QuizQuestion from "./QuizQuestion"
import QuizFeedback from "./QuizFeedback"
import QuizResults from "./QuizResults"

export default function HRoesGamifiedQuiz() {
  // State management
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showLevelUpCelebration, setShowLevelUpCelebration] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [quizData, setQuizData] = useState<Level[]>([]) // State to hold the randomly selected questions

  // Function to pick random questions
  const pickRandomQuestions = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  // Generate quiz data on the client side
  useEffect(() => {
    setIsClient(true)

    // Generate the quiz data with randomly selected questions
    const generatedQuizData: Level[] = [
      {
        id: 1,
        questions: pickRandomQuestions(easyQuestions, 3),
      },
      {
        id: 2,
        questions: pickRandomQuestions(mediumQuestions, 3),
      },
      {
        id: 3,
        questions: pickRandomQuestions(hardQuestions, 3),
      },
    ]

    setQuizData(generatedQuizData)
  }, [])

  // Get current question data
  const levelData: Level | undefined = quizData.find((level) => level.id === currentLevel)
  const currentQuestion = levelData?.questions[currentQuestionIndex]

  // Total questions count for progress calculation
  const totalQuestions = quizData.reduce((acc, level) => acc + level.questions.length, 0)
  const questionsCompleted = (currentLevel - 1) * 3 + currentQuestionIndex
  const progressPercentage = totalQuestions ? (questionsCompleted / totalQuestions) * 100 : 0

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (isAnswered || !currentQuestion) return

    setSelectedOption(optionId)
    setIsAnswered(true)

    const isAnswerCorrect = optionId === currentQuestion.correctOptionId
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 10)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }

    setShowFeedback(true)
  }

  // Handle moving to next question
  const handleNextQuestion = () => {
    setSelectedOption(null)
    setIsAnswered(false)
    setShowFeedback(false)

    // Check if we need to move to the next level or complete the quiz
    if (currentQuestionIndex === 2) {
      if (currentLevel === 3) {
        // Quiz completed
        setQuizCompleted(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      } else {
        // Level up
        setShowLevelUpCelebration(true)
        setTimeout(() => {
          setShowLevelUpCelebration(false)
          setCurrentLevel((prevLevel) => prevLevel + 1)
          setCurrentQuestionIndex(0)
        }, 2000)
      }
    } else {
      // Next question in current level
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  // Reset quiz
  const resetQuiz = () => {
    setCurrentLevel(1)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowFeedback(false)
    setQuizCompleted(false)

    // Regenerate quiz data for a new set of random questions
    const newQuizData: Level[] = [
      {
        id: 1,
        questions: pickRandomQuestions(easyQuestions, 3),
      },
      {
        id: 2,
        questions: pickRandomQuestions(mediumQuestions, 3),
      },
      {
        id: 3,
        questions: pickRandomQuestions(hardQuestions, 3),
      },
    ]
    setQuizData(newQuizData)
  }

  // Show a loading state until the quiz data is ready
  if (!isClient || quizData.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-[#f5f5f5] rounded-xl shadow-lg text-center">
        <p className="text-lg text-gray-600">Loading quiz...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-[#f5f5f5] rounded-xl shadow-lg">
      {isClient && showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
      )}

      {/* Header with logo and progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#4b4b4b]">HRoes Worker Protection Quiz</h2>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            <span className="font-bold">{score} points</span>
          </div>
        </div>

        {!quizCompleted && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-[#58cc02] h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              Level {currentLevel}: Question {currentQuestionIndex + 1}/3
            </div>
          </>
        )}
      </div>

      {/* Level Up Celebration */}
      {showLevelUpCelebration && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-white p-8 rounded-xl text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-[#58cc02]" />
            <h3 className="text-2xl font-bold mb-2">Level {currentLevel} Complete!</h3>
            <p className="mb-4">You've earned {score} points so far. Keep going!</p>
            <div className="text-lg font-bold text-[#58cc02]">Level {currentLevel + 1} Unlocked!</div>
          </div>
        </motion.div>
      )}

      {/* Quiz Content */}
      {!quizCompleted && currentQuestion ? (
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={`${currentLevel}-${currentQuestionIndex}`}
            question={currentQuestion}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            onOptionSelect={handleOptionSelect}
          />
          {showFeedback && (
            <QuizFeedback
              isCorrect={isCorrect}
              question={currentQuestion}
              onNext={handleNextQuestion}
            />
          )}
        </AnimatePresence>
      ) : (
        <QuizResults score={score} onReset={resetQuiz} />
      )}
    </div>
  )
}