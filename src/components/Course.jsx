import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'

import CardRenderer from './CardRenderer'
import ProgressBar from './ProgressBar'
import ResultCard from './ResultCard'

// Fisher–Yates zamíchání (nemutuje vstup)
const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Course({ course, onExit }) {
  const lessons = course.lessons
  const totalQuizzes = lessons.filter((c) => c.type === 'quiz').length
  const STORAGE_KEY = `eduswipe-progress-${course.id}`
  const BEST_KEY = `eduswipe-best-${course.id}`

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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(loadAnswered)
  const [storedBest, setStoredBest] = useState(loadBest)
  const [attempt, setAttempt] = useState(0)
  const [deck, setDeck] = useState(lessons)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answered))
    } catch {
      /* storage nedostupny */
    }
  }, [answered, STORAGE_KEY])

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
    const card = deck[swiper.activeIndex]
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', card?.color || '#7c3aed')
  }

  const handleAnswer = (id, selected, isCorrect) => {
    setAnswered((prev) => (id in prev ? prev : { ...prev, [id]: { selected, correct: isCorrect } }))
  }

  const handleRetry = () => {
    setAnswered({})
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage nedostupny */
    }
    setStoredBest(loadBest())
    setDeck(shuffle(lessons))
    setCurrentIndex(0)
    setAttempt((a) => a + 1)
  }

  const score = Object.values(answered).filter((a) => a.correct).length

  useEffect(() => {
    if (score > storedBest) {
      try {
        localStorage.setItem(BEST_KEY, String(score))
      } catch {
        /* storage nedostupny */
      }
    }
  }, [score, storedBest, BEST_KEY])

  const currentCard = deck[currentIndex]
  const locked = currentCard?.type === 'quiz' && !(currentCard.id in answered)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <ProgressBar
        current={currentIndex}
        total={lessons.length + 1}
        score={score}
        onRestart={handleRetry}
        onExit={onExit}
      />

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
        {deck.map((card) => (
          <SwiperSlide key={card.id}>
            <CardRenderer card={card} answered={answered[card.id]} onAnswer={handleAnswer} />
          </SwiperSlide>
        ))}

        <SwiperSlide key="result">
          <ResultCard
            score={score}
            total={totalQuizzes}
            best={storedBest}
            onRetry={handleRetry}
            onExit={onExit}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
