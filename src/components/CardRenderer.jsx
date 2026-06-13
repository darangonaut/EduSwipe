import InfoCard from './InfoCard'
import QuizCard from './QuizCard'

export default function CardRenderer({ card, onAnswer }) {
  if (card.type === 'quiz') {
    return (
      <QuizCard
        question={card.question}
        options={card.options}
        answer={card.answer}
        explanation={card.explanation}
        color={card.color}
        onAnswer={onAnswer ? (isCorrect) => onAnswer(card.id, isCorrect) : undefined}
      />
    )
  }

  return (
    <InfoCard
      title={card.title}
      content={card.content}
      image={card.image}
      color={card.color}
    />
  )
}
