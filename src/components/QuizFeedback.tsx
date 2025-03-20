// /src/components/QuizFeedback.tsx

import { motion } from "framer-motion"
import { CheckCircle, XCircle, ChevronRight } from "lucide-react"
import { Question } from "./QuizQuestions"

interface QuizFeedbackProps {
  isCorrect: boolean
  question: Question
  onNext: () => void
}

export default function QuizFeedback({ isCorrect, question, onNext }: QuizFeedbackProps) {
  const correctOption = question.options.find((o) => o.id === question.correctOptionId)?.text

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className={`p-4 rounded-lg mb-6 ${
          isCorrect ? "bg-[#e5ffd5] text-[#58cc02]" : "bg-[#ffeded] text-[#ff4b4b]"
        }`}
      >
        <div className="flex items-center gap-2 font-bold mb-2">
          {isCorrect ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Great job! 🎉</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span>Oops, not quite!</span>
            </>
          )}
        </div>
        <p className="text-gray-700">
          {isCorrect
            ? question.explanation
            : `The correct answer is ${correctOption}. ${question.explanation}`}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#58cc02] hover:bg-[#46a302] text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </>
  )
}