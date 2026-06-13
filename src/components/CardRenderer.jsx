import InfoCard from './InfoCard'
import QuizCard from './QuizCard'

export default function CardRenderer({ card, answered, onAnswer }) {
  if (card.type === 'quiz') {
    return (
      <QuizCard
        question={card.question}
        options={card.options}
        answer={card.answer}
        explanation={card.explanation}
        emoji={card.emoji}
        color={card.color}
        initialSelected={answered ? answered.selected : null}
        onAnswer={onAnswer ? (selected, isCorrect) => onAnswer(card.id, selected, isCorrect) : undefined}
      />
    )
  }

  return (
    <InfoCard
      title={card.title}
      content={card.content}
      image={card.image}
      emoji={card.emoji}
      color={card.color}
    />
  )
}
