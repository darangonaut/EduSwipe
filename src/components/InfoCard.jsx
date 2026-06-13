export default function InfoCard({ title, content, image, emoji, topic, color }) {
  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-center px-6 py-10 text-white text-center overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Jemny gradient pre hlbku */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/30" />

      <div className="card-content relative z-10 flex flex-col items-center max-w-md">
        {topic && (
          <span className="mb-6 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wide">
            {topic}
          </span>
        )}
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full max-h-[38vh] object-cover rounded-3xl mb-8 shadow-2xl"
          />
        ) : emoji ? (
          <div className="w-32 h-32 mb-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-7xl shadow-lg">
            <span className="drop-shadow-md">{emoji}</span>
          </div>
        ) : null}

        <h2 className="text-4xl font-extrabold mb-5 tracking-tight drop-shadow-sm">{title}</h2>
        <p className="text-xl sm:text-2xl leading-relaxed text-white/95">{content}</p>
      </div>
    </div>
  )
}
