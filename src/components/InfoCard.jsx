export default function InfoCard({ title, content, image, color }) {
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-8 text-white"
      style={{ backgroundColor: color }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full max-w-md max-h-[40vh] object-cover rounded-2xl mb-6 shadow-lg"
        />
      )}
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <p className="text-xl text-center leading-relaxed max-w-md">{content}</p>
    </div>
  )
}
