import { Status } from './LetterCell'
import './styles.css'

type Props = {
  onClickKey: (key: string) => void
  guesses: string[]
  word: string
}

type ClassNames =
  | 'LetterCell_incorrect'
  | 'LetterCell_correctWithPlace'
  | 'LetterCell_correctWithoutPlace'
  | 'LetterCell_unsubmitted'

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

const Keyboard = ({ onClickKey, guesses, word }: Props): JSX.Element => {
  const getLetterColor = (letter: string): Status => {
    let status: Status = 'unsubmitted'

    for (const guess of guesses) {
      for (const index in guess.split('')) {
        const char = guess[index]
        if (char !== letter) continue
        if (char === word[index]) return 'correctWithPlace'
        if (!word.includes(char)) return 'incorrect'
        if (word.includes(char)) status = 'correctWithoutPlace'
      }
    }

    return status
  }

  const color: { [key in Status]: ClassNames } = {
    incorrect: 'LetterCell_incorrect',
    correctWithPlace: 'LetterCell_correctWithPlace',
    correctWithoutPlace: 'LetterCell_correctWithoutPlace',
    unsubmitted: 'LetterCell_unsubmitted'
  }

  return (
    <div className='Keyboard'>
      {rows.map((row, i) => (
        <div key={i}>
          {row.map((key, j) => (
            <button
              key={j}
              onClick={() => onClickKey(key)}
              className={`Keyboard_key ${color[getLetterColor(key)]}`}
              // style={{ backgroundColor: color[getLetterColor(key)] }}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
      <div>
        <button onClick={() => onClickKey('enter')} className='Keyboard_key'>
          🍌
        </button>
        <button
          onClick={() => onClickKey('backspace')}
          className='Keyboard_key'
        >
          ⬅
        </button>
      </div>
    </div>
  )
}

export default Keyboard
