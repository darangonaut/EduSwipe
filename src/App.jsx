import { useState } from 'react'

import Home from './components/Home'
import Course from './components/Course'

function App() {
  const [course, setCourse] = useState(null)

  if (!course) {
    return <Home onSelect={setCourse} />
  }

  return <Course course={course} onExit={() => setCourse(null)} />
}

export default App
