import React, { useRef } from 'react'

import './styles.css'

// INTERFACES
interface Props {
  quest: string
  setQuest: React.Dispatch<React.SetStateAction<string>>
  handleQuest: (e: React.FormEvent) => void
}

// BODY
const InputField: React.FC<Props> = ({quest, setQuest, handleQuest}: Props) => {
  // useRef Hook
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className='input'
      onSubmit={
        (e) => {
          handleQuest(e)
          // Shifts focus from the input box
          inputRef.current?.blur()
        }
      }>
      <input
        ref={inputRef}
        type='input'
        value={quest}
        onChange={(e) => setQuest(e.target.value)}
        placeholder='Enter a quest'
        className='input_box'
      />
      <button className='input_submit' type='submit'>Add</button>
    </form>
  )
}

export default InputField