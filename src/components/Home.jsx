import { useEffect, useState } from 'react'
import courses from '../data/courses.json'

const bestFor = (id) => {
  try {
    return Number(localStorage.getItem(`eduswipe-best-${id}`)) || 0
  } catch {
    return 0
  }
}

const quizCount = (course) => course.lessons.filter((c) => c.type === 'quiz').length

export default function Home({ onSelect }) {
  // Domovska obrazovka ma tmavy theme-color
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', '#171717')
  }, [])

  const [, setVersion] = useState(0)

  const resetAll = () => {
    if (!window.confirm('Opravdu vymazat veškerý pokrok a rekordy?')) return
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('eduswipe-'))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* storage nedostupny */
    }
    setVersion((v) => v + 1)
  }

  const totalQuizzes = courses.reduce((s, c) => s + quizCount(c), 0)
  const totalBest = courses.reduce((s, c) => s + bestFor(c.id), 0)
  const perfectCount = courses.filter((c) => quizCount(c) > 0 && bestFor(c.id) >= quizCount(c)).length

  return (
    <div className="h-screen w-screen overflow-y-auto bg-neutral-900 px-6 py-12 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-center text-4xl font-extrabold tracking-tight">EduSwipe</h1>
        <p className="mb-4 text-center text-white/70">Vyber si kurz a uč se swipováním 👆</p>
        <p className="mb-10 text-center text-sm text-white/60">
          ⭐ {totalBest}/{totalQuizzes} · 🏆 {perfectCount}/{courses.length} kurzů
        </p>

        <div className="space-y-4">
          {courses.map((course) => {
            const quizzes = course.lessons.filter((c) => c.type === 'quiz').length
            const best = bestFor(course.id)
            return (
              <button
                key={course.id}
                onClick={() => onSelect(course)}
                className="flex w-full items-center gap-4 rounded-2xl p-5 text-left shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                style={{ backgroundColor: course.color }}
              >
                <span className="text-4xl">{course.emoji}</span>
                <span className="flex-1">
                  <span className="block text-xl font-bold">{course.title}</span>
                  <span className="block text-sm text-white/85">
                    {course.lessons.length} karet · {quizzes} kvízů
                  </span>
                </span>
                {quizzes > 0 && best >= quizzes ? (
                  <span className="text-2xl" title="Perfektní">🏆</span>
                ) : best > 0 ? (
                  <span className="text-sm font-semibold">⭐ {best}/{quizzes}</span>
                ) : null}
              </button>
            )
          })}
        </div>

        {totalBest > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={resetAll}
              className="text-sm text-white/50 underline-offset-4 transition-colors hover:text-white/80 hover:underline"
            >
              Vymazat pokrok
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
