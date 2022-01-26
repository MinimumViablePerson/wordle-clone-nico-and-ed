import './App.css'
import * as React from 'react'

import { answerWords } from './words'

const acceptedLetters = 'qwertyuiopasdfghjklzxcvbnm'

function getWordIsValid (attempt: string) {
  if (attempt.length < 5) return false

  // TODO: Get a proper validAttempts list
  // return validAttempts.includes(attempt);
  return true
}

function getRandomWord () {
  return answerWords[
    Math.floor(Math.random() * answerWords.length)
  ].toLowerCase()
}

const maxAllowedAttempts = 6

function useWordle () {
  const [word, setWord] = React.useState(getRandomWord())
  const [guesses, setGuesses] = React.useState<string[]>([])

  const [currentAttempt, setCurrentAttempt] = React.useState('')

  const [message, setMessage] = React.useState('')

  function submitAttempt (): void {
    if (currentAttempt.length < 5) {
      setMessage('Must be 5 letters!')
      return
    }
    if (getWordIsValid(currentAttempt)) {
      setGuesses([...guesses, currentAttempt])
      setCurrentAttempt('')
    } else {
      setMessage('Invalid attempt')
    }
  }

  function reset () {
    setWord(getRandomWord())
    setGuesses([])
    setCurrentAttempt('')
    setMessage('')
  }

  function addLetterToCurrentAttempt (letter: string) {
    if (currentAttempt.length === 5) return
    setCurrentAttempt(currentAttempt + letter)
  }

  function removeLetterInCurrentAttempt () {
    setMessage('')
    if (currentAttempt.length === 0) return // for fun yo i like pears

    setCurrentAttempt(currentAttempt.slice(0, -1))
  }

  const hasWon = word === guesses[guesses.length - 1]
  const hasLost = guesses.length === maxAllowedAttempts
  const isPlaying = !hasWon && !hasLost

  function performActionOnKey (key: string) {
    if (key === 'enter') submitAttempt()

    if (key === 'backspace') removeLetterInCurrentAttempt()

    if (acceptedLetters.includes(key)) addLetterToCurrentAttempt(key)
  }

  React.useEffect(() => {
    if (hasWon || hasLost) return

    const listener = (e: KeyboardEvent): void => {
      const key = e.key.toLowerCase()

      performActionOnKey(key)
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [guesses, currentAttempt, hasWon])

  const rows = React.useMemo(() => {
    const empty = Array(6 - guesses.length).fill(null)

    return [...guesses, ...empty]
  }, [guesses])

  return {
    message,
    guesses,
    isPlaying,
    hasWon,
    hasLost,
    word,
    rows,
    currentAttempt,
    performActionOnKey,
    reset
  }
}

export default useWordle
