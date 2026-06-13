export default function ProgressBar({ current, total, score = 0, onRestart }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex items-center gap-3">
        {onRestart && current > 0 && (
          <button
            onClick={onRestart}
            aria-label="Začít znovu"
            className="text-white/80 text-lg leading-none transition-transform hover:scale-110 active:scale-90"
          >
            ↺
          </button>
        )}
        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {score > 0 && (
          <span className="text-white text-sm font-semibold">⭐ {score}</span>
        )}
        <span className="text-white text-sm font-medium">
          {current + 1}/{total}
        </span>
      </div>
    </div>
  )
}
