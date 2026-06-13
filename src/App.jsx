import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'

import CardRenderer from './components/CardRenderer'
import ProgressBar from './components/ProgressBar'
import ResultCard from './components/ResultCard'
import lessons from './data/lessons.json'

const totalQuizzes = lessons.filter((c) => c.type === 'quiz').length

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState({})
  const [attempt, setAttempt] = useState(0)

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
  }

  // Zaznamenat odpoved jen jednou na kartu (idempotentni)
  const handleAnswer = (id, isCorrect) => {
    setAnswered((prev) => (id in prev ? prev : { ...prev, [id]: isCorrect }))
  }

  // Reset: remount Swiperu (key) vrati na zacatek a vycisti stav karet
  const handleRetry = () => {
    setAnswered({})
    setCurrentIndex(0)
    setAttempt((a) => a + 1)
  }

  const score = Object.values(answered).filter(Boolean).length

  // Zamknut posun dopredu na nezodpovedanom kvizu
  const currentCard = lessons[currentIndex]
  const locked = currentCard?.type === 'quiz' && !(currentCard.id in answered)

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <ProgressBar current={currentIndex} total={lessons.length + 1} score={score} />

      <Swiper
        key={attempt}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        allowSlideNext={!locked}
        modules={[Mousewheel]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {lessons.map((card) => (
          <SwiperSlide key={card.id}>
            <CardRenderer card={card} onAnswer={handleAnswer} />
          </SwiperSlide>
        ))}

        <SwiperSlide key="result">
          <ResultCard score={score} total={totalQuizzes} onRetry={handleRetry} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default App
