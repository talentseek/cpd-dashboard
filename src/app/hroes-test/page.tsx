import HRoesGamifiedQuiz from "@/components/HRoesGamifiedQuiz"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test Your Knowledge on the Worker Protection Act 2023
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
          How well do you understand the UK’s Worker Protection (Amendment of Equality Act 2010) Act 2023? Take our
          interactive quiz to find out and ensure your workplace is compliant!
        </p>

        <HRoesGamifiedQuiz />
      </div>
    </main>
  )
}