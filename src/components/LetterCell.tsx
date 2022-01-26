import './styles.css'

export type Status =
  | 'correctWithPlace'
  | 'correctWithoutPlace'
  | 'incorrect'
  | 'unsubmitted'

export interface Props {
  letter: string
  status: Status
  index?: number
}

const LetterCell = ({ letter = '', status, index = 0 }: Props) => {
  return (
    <span
      className={`LetterCell LetterCell_${status}`}
      style={{ animationDelay: 300 * index + 'ms' }}
    >
      {letter.toUpperCase()}
    </span>
  )
}

export default LetterCell
