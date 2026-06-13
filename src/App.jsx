import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'

import CardRenderer from './components/CardRenderer'
import ProgressBar from './components/ProgressBar'
import lessons from './data/lessons.json'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState({})

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
  }

  // Zaznamenat odpoved jen jednou na kartu (idempotentni)
  const handleAnswer = (id, isCorrect) => {
    setAnswered((prev) => (id in prev ? prev : { ...prev, [id]: isCorrect }))
  }

  const score = Object.values(answered).filter(Boolean).length

  // Zamknut posun dopredu na nezodpovedanom kvizu
  const currentCard = lessons[currentIndex]
  const locked = currentCard?.type === 'quiz' && !(currentCard.id in answered)

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <ProgressBar current={currentIndex} total={lessons.length} score={score} />

      <Swiper
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
      </Swiper>
    </div>
  )
}

export default App
