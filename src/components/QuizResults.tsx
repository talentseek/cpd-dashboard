// /src/components/QuizResults.tsx

import { motion } from "framer-motion"
import Link from "next/link"

interface QuizResultsProps {
  score: number
  onReset: () => void
}

export default function QuizResults({ score, onReset }: QuizResultsProps) {
  const getFeedbackMessage = () => {
    const percentage = (score / 90) * 100

    if (percentage < 25) {
      return "Looks like you need some help! You definitely require the CPD E-Learning to ensure you’re compliant with UK legislation on sexual harassment. In just a few hours, from anywhere, for only £35 per employee, you can be fully prepared."
    } else if (percentage < 50) {
      return "You’ve got some basics down, but there’s room to grow! Consider the CPD E-Learning to ensure full compliance with UK legislation on sexual harassment—in just a few hours, for only £35 per employee."
    } else if (percentage < 75) {
      return "Nice work! You have a good grasp of the fundamentals, but you may still benefit from the CPD E-Learning to ensure full compliance with UK legislation on sexual harassment. It’s just £35 per employee and takes a few hours."
    } else {
      return "Fantastic job! You’re well-versed in the Worker Protection Act, but even experts can benefit from a refresher. Check out our CPD E-Learning for £35 per employee to stay fully compliant."
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg p-8 shadow-md text-center"
    >
      <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
      <div className="mb-6">
        <div className="text-5xl font-bold text-[#58cc02] mb-2">{score}/90</div>
        <div className="text-gray-600">points</div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg">{getFeedbackMessage()}</p>
      </div>

      <div className="space-y-4">
        <Link
          href="https://cal.com/hroes/worker-protection-training"
          className="block w-full bg-[#58cc02] hover:bg-[#46a302] text-white font-bold py-3 px-6 rounded-lg transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Consultation
        </Link>

        <button
          onClick={onReset}
          className="block w-full border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  )
}