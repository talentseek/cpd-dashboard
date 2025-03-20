// /src/components/QuizQuestion.tsx

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"
import { Option, Question } from "./QuizQuestions"

interface QuizQuestionProps {
  question: Question
  selectedOption: string | null
  isAnswered: boolean
  isCorrect: boolean
  onOptionSelect: (optionId: string) => void
}

export default function QuizQuestion({
  question,
  selectedOption,
  isAnswered,
  isCorrect,
  onOptionSelect,
}: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      {/* Question */}
      <h3 className="text-xl font-semibold mb-6">{question.text}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option: Option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedOption === option.id
                ? isCorrect
                  ? "border-[#58cc02] bg-[#e5ffd5] text-[#58cc02]"
                  : "border-[#ff4b4b] bg-[#ffeded] text-[#ff4b4b]"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mr-3">
                {option.id}
              </span>
              <span>{option.text}</span>
              {isAnswered && selectedOption === option.id && (
                <span className="ml-auto">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-[#58cc02]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#ff4b4b]" />
                  )}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}