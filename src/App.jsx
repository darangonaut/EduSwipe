import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'

import CardRenderer from './components/CardRenderer'
import ProgressBar from './components/ProgressBar'
import ResultCard from './components/ResultCard'
import lessons from './data/lessons.json'

const totalQuizzes = lessons.filter((c) => c.type === 'quiz').length
const STORAGE_KEY = 'eduswipe-progress'
const BEST_KEY = 'eduswipe-best'

const loadAnswered = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

const loadBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(loadAnswered)
  const [storedBest, setStoredBest] = useState(loadBest)
  const [attempt, setAttempt] = useState(0)

  // Perzistence pokroku do localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answered))
    } catch {
      /* storage nedostupny */
    }
  }, [answered])

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
  }

  // Zaznamenat odpoved jen jednou na kartu (idempotentni)
  const handleAnswer = (id, selected, isCorrect) => {
    setAnswered((prev) => (id in prev ? prev : { ...prev, [id]: { selected, correct: isCorrect } }))
  }

  // Reset: vycistit stav, smazat storage a remountovat Swiper
  const handleRetry = () => {
    setAnswered({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage nedostupny */
    }
    setStoredBest(loadBest()) // nacitat pripadny novy rekord z tohto behu
    setCurrentIndex(0)
    setAttempt((a) => a + 1)
  }

  const score = Object.values(answered).filter((a) => a.correct).length

  // Zapsat novy rekord do storage (bez setState v effectu)
  useEffect(() => {
    if (score > storedBest) {
      try {
        localStorage.setItem(BEST_KEY, String(score))
      } catch {
        /* storage nedostupny */
      }
    }
  }, [score, storedBest])

  // Zamknut posun dopredu na nezodpovedanom kvizu
  const currentCard = lessons[currentIndex]
  const locked = currentCard?.type === 'quiz' && !(currentCard.id in answered)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <ProgressBar current={currentIndex} total={lessons.length + 1} score={score} />

      {currentIndex === 0 && (
        <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center text-white/90 animate-bounce">
          <span className="text-3xl leading-none">⌃</span>
          <span className="text-sm font-medium">Posuň nahoru</span>
        </div>
      )}

      <Swiper
        key={attempt}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        keyboard={{ enabled: true }}
        allowSlideNext={!locked}
        modules={[Mousewheel, Keyboard]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {lessons.map((card) => (
          <SwiperSlide key={card.id}>
            <CardRenderer card={card} answered={answered[card.id]} onAnswer={handleAnswer} />
          </SwiperSlide>
        ))}

        <SwiperSlide key="result">
          <ResultCard score={score} total={totalQuizzes} best={storedBest} onRetry={handleRetry} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default App
