import { useCallback, useEffect, useRef, useState } from 'react'

// Krátký tón jako zpětná vazba (sdílený AudioContext, lazy)
let audioCtx
const playTone = (correct) => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    audioCtx = audioCtx || new Ctx()
    if (audioCtx.state === 'suspended') audioCtx.resume()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.type = 'sine'
    osc.frequency.value = correct ? 880 : 200
    const t = audioCtx.currentTime
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    osc.start(t)
    osc.stop(t + 0.26)
  } catch {
    /* audio nedostupne */
  }
}

export default function QuizCard({ question, options, answer, explanation, emoji, topic, color, initialSelected = null, onAnswer }) {
  const [selected, setSelected] = useState(initialSelected)
  const rootRef = useRef(null)

  const handleSelect = useCallback((index) => {
    if (selected !== null) return
    const correct = index === answer
    setSelected(index)
    // Hapticka + zvukova odozva (jen kde je podporovana)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(correct ? 30 : [40, 30, 40])
    }
    playTone(correct)
    if (onAnswer) {
      onAnswer(index, correct)
    }
  }, [selected, answer, onAnswer])

  // Odpovidani klavesami 1..N, jen na aktivni karte
  useEffect(() => {
    const onKey = (e) => {
      if (selected !== null) return
      const slide = rootRef.current?.closest('.swiper-slide')
      if (!slide || !slide.classList.contains('swiper-slide-active')) return
      const n = Number(e.key)
      if (n >= 1 && n <= options.length) handleSelect(n - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, options.length, handleSelect])

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
      ref={rootRef}
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
              className={`flex w-full items-center gap-3 py-4 px-5 rounded-2xl text-xl font-semibold transition-all duration-200 ${getButtonStyle(index)}`}
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black/20 text-base font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-center">{option}</span>
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
