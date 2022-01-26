import { useEffect } from 'react'
import youDiedSrc from '../assets/audio/you-died.mp3'

type Props = {
  word: string
  reset: () => void
}

function YouDied ({ word, reset }: Props) {
  useEffect(() => {
    const youDiedSound = new Audio(youDiedSrc)
    youDiedSound.play()
  }, [])

  return (
    <div className='modal'>
      <span className='modal__text you-died'>You died</span>
      <span className='modal__text answer'>The word was "{word}"!</span>
      <button className='modal__reset' onClick={reset}>
        RESET?
      </button>
    </div>
  )
}

export default YouDied
