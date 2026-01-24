import { useState } from 'react'

export default function QuizCard({ question, options, answer, explanation, color, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
    setShowExplanation(true)
    if (onAnswer) {
      onAnswer(index === answer)
    }
  }

  const getButtonStyle = (index) => {
    if (selected === null) {
      return 'bg-white/20 hover:bg-white/30'
    }
    if (index === answer) {
      return 'bg-green-500'
    }
    if (index === selected && index !== answer) {
      return 'bg-red-500'
    }
    return 'bg-white/20 opacity-50'
  }

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-8 text-white"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{question}</h2>

      <div className="w-full max-w-md space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full py-4 px-6 rounded-xl text-lg font-medium transition-all ${getButtonStyle(index)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mt-8 p-4 bg-white/20 rounded-xl max-w-md">
          <p className="text-center">{explanation}</p>
        </div>
      )}
    </div>
  )
}
