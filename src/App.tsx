import './App.css'

import Guess from './components/Guess'
import CurrentGuess from './components/CurrentGuess'
import Keyboard from './components/Keyboard'
import useWordle from './useWordle'
import YouDied from './components/YouDied'

function App () {
  const {
    message,
    guesses,
    hasWon,
    hasLost,
    word,
    currentAttempt,
    rows,
    performActionOnKey,
    reset
  } = useWordle()

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-header_header'>Wordle</h1>

        {message && <p>Message: {message}</p>}
        <ul>
          {rows.map((guess, guessIndex) => {
            if (guess) {
              return <Guess key={guessIndex} guess={guess} word={word} />
            }
            if (guessIndex === guesses.length) {
              return <CurrentGuess currentAttempt={currentAttempt} />
            }
            return <CurrentGuess currentAttempt={''} />
          })}
        </ul>
        {hasWon ? <p>You win! 🎉</p> : null}
        {hasLost ? <YouDied word={word} reset={reset} /> : null}
        <Keyboard
          onClickKey={performActionOnKey}
          word={word}
          guesses={guesses}
        />
      </header>
    </div>
  )
}

export default App
