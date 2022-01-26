import LetterCell from './LetterCell'

type Props = {
  currentAttempt: string
}

function CurrentGuess ({ currentAttempt }: Props) {
  return (
    <li>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <LetterCell letter={currentAttempt[i]} status='unsubmitted' />
        ))}
    </li>
  )
}

export default CurrentGuess
