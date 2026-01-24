import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import 'swiper/css'

import CardRenderer from './components/CardRenderer'
import ProgressBar from './components/ProgressBar'
import lessons from './data/lessons.json'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <ProgressBar current={currentIndex} total={lessons.length} />

      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {lessons.map((card) => (
          <SwiperSlide key={card.id}>
            <CardRenderer card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default App
