export default function ResultCard({ score, total, onRetry }) {
  const ratio = total > 0 ? score / total : 0
  const perfect = total > 0 && score === total

  let message = 'Zkus to znovu a zlepši se!'
  if (perfect) message = 'Perfektní! Všechno správně 🤩'
  else if (ratio >= 0.5) message = 'Skvělá práce!'

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-6 py-10 text-white text-center overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600">
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/30" />

      <div className="relative z-10 flex flex-col items-center max-w-md">
        <div className="text-7xl mb-6 drop-shadow-md">{perfect ? '🏆' : '🎉'}</div>

        <h2 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-sm">Hotovo!</h2>

        <p className="text-2xl mb-2">
          Získal jsi <span className="font-bold">{score}/{total}</span> ⭐
        </p>
        <p className="text-lg text-white/85 mb-10">{message}</p>

        <button
          onClick={onRetry}
          className="py-4 px-10 rounded-2xl bg-white text-violet-700 text-xl font-bold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Zkusit znovu
        </button>
      </div>
    </div>
  )
}
