import React from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import { AiFillDelete, AiFillCheckCircle } from 'react-icons/ai'
import './styles.css'

import { Quest } from '../model'

// TYPES
type Props = {
  quest: Quest,
  quests: Quest[],
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>
}

// BODY
const SingleQuest: React.FC<Props> = ({quest, quests, setQuests}: Props) => {
  return (
    <form className='single_quest'>
      <span className="quest_single_test">{quest.quest}</span>
      <div>
        <span className="icon">
          <RiEdit2Fill />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span className="icon">
          <AiFillCheckCircle />
        </span>
      </div>
    </form>
  )
}

export default SingleQuest