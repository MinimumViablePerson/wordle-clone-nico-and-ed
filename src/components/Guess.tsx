import LetterCell, { Status } from './LetterCell'

type Props = {
  guess: string
  word: string
}

type RunLogicPleaseReturn = {
  lettersInPlace: number[]
  lettersRightNotInPlace: number[]
}

export function runLogicPlease ({ guess, word }: Props): RunLogicPleaseReturn {
  // if current attempt - white
  let wordCopy = word
  const lettersInPlace: number[] = [] // green
  const lettersRightNotInPlace: number[] = [] // yellow

  // loop to check for place
  for (const index in guess.split('')) {
    const ind = Number(index)

    if (wordCopy[ind] === guess[ind]) {
      lettersInPlace.push(ind)
      wordCopy = wordCopy.replace(guess[ind], '_')
    }
  }

  // loop to check for without place
  for (const index in guess.split('')) {
    const ind = Number(index)

    if (wordCopy.includes(guess[ind]) && !lettersInPlace.includes(ind)) {
      lettersRightNotInPlace.push(ind)
      wordCopy = wordCopy.replace(guess[ind], '_')
    }
  }

  // rest is incorrect
  return { lettersInPlace, lettersRightNotInPlace }
}

const Guess = ({ guess, word,  }: Props) => {
  const { lettersInPlace, lettersRightNotInPlace } = runLogicPlease({
    guess,
    word
  })
  return (
    <li>
      {guess.split('').map((letter, index) => {
        let status: Status = 'incorrect'
        if (lettersInPlace.includes(index)) {
          status = 'correctWithPlace'
        } else if (lettersRightNotInPlace.includes(index)) {
          status = 'correctWithoutPlace'
        }

        return <LetterCell letter={letter} status={status} index={index} />
      })}
    </li>
  )
}

export default Guess
