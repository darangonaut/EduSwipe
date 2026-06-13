import { useState } from 'react'

export default function QuizCard({ question, options, answer, explanation, emoji, topic, color, initialSelected = null, onAnswer }) {
  const [selected, setSelected] = useState(initialSelected)

  const handleSelect = (index) => {
    if (selected !== null) return
    const correct = index === answer
    setSelected(index)
    // Hapticka odozva (jen kde je podporovana)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(correct ? 30 : [40, 30, 40])
    }
    if (onAnswer) {
      onAnswer(index, correct)
    }
  }

  const getButtonStyle = (index) => {
    if (selected === null) {
      return 'bg-white/20 hover:bg-white/30 hover:scale-[1.02] active:scale-95'
    }
    if (index === answer) {
      return 'bg-green-500 shadow-lg scale-[1.02]'
    }
    if (index === selected && index !== answer) {
      return 'bg-red-500'
    }
    return 'bg-white/20 opacity-40'
  }

  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-center px-6 py-10 text-white text-center overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Jemny gradient pre hlbku */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/30" />

      <div className="card-content relative z-10 flex flex-col items-center w-full max-w-md">
        {topic && (
          <span className="mb-5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wide">
            {topic}
          </span>
        )}
        {emoji && <div className="text-6xl mb-6 drop-shadow-md">{emoji}</div>}

        <h2 className="text-3xl font-extrabold mb-8 tracking-tight drop-shadow-sm">{question}</h2>

        <div className="w-full space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              className={`w-full py-5 px-6 rounded-2xl text-xl font-semibold transition-all duration-200 ${getButtonStyle(index)}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Oznámení výsledku pro čtečky obrazovky */}
        <p className="sr-only" role="status" aria-live="polite">
          {selected === null ? '' : selected === answer ? 'Správně!' : 'Špatně.'}
        </p>

        {selected === null ? (
          <p className="mt-8 text-sm text-white/70">Vyber odpověď a pokračuj dál 👆</p>
        ) : (
          <div className="mt-8 p-5 bg-white/20 backdrop-blur-sm rounded-2xl" role="status">
            <p className="text-lg leading-relaxed text-white/95">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
