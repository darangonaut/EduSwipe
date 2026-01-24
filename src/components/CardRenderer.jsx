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
        onAnswer={onAnswer}
      />
    )
  }

  return (
    <InfoCard
      title={card.title}
      content={card.content}
      color={card.color}
    />
  )
}
