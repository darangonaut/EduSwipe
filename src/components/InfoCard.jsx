export default function InfoCard({ title, content, color }) {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-8 text-white"
      style={{ backgroundColor: color }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <p className="text-xl text-center leading-relaxed max-w-md">{content}</p>
    </div>
  )
}
