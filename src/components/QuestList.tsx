import React from 'react'
import './styles.css'

import { Quest } from '../model'
import SingleQuest from './SingleQuest'

// INTERFACES
interface Props {
  quests: Quest[]
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>
}

// BODY
const QuestList: React.FC<Props> = ({quests, setQuests}: Props) => {
  return (
    <div className='quests'>
      {
        quests.map((quest) => (
          <SingleQuest
            key={quest.id}
            quest={quest}
            quests={quests}
            setQuests={setQuests}
          />
        ))
      }
    </div>
  )
}

export default QuestList