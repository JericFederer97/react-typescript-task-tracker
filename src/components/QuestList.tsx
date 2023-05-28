import React from 'react'

import './styles.css'
import { Quest } from '../model'
import SingleQuest from './SingleQuest'
import { Droppable } from 'react-beautiful-dnd'

// INTERFACES
interface Props {
  quests: Quest[]
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>
  completedQuests: Quest[]
  setCompletedQuests: React.Dispatch<React.SetStateAction<Quest[]>>
}

// BODY
const QuestList: React.FC<Props> = ({quests, setQuests, completedQuests, setCompletedQuests}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='questList'>
        {(provided, snapshot) => (
          <div
            className={`quests ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="quests_heading">
              Active Quests
            </span>
            {
              quests.map((quest, index) => (
                <SingleQuest
                  index={index}
                  key={quest.id}
                  quest={quest}
                  quests={quests}
                  setQuests={setQuests}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='completedQuestList'>
        {(provided, snapshot) => (
          <div
            className={`quests completed ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="quests_heading">
              Completed Quests
            </span>
            {
              completedQuests.map((quest, index) => (
                <SingleQuest
                index={index}
                  key={quest.id}
                  quest={quest}
                  quests={completedQuests}
                  setQuests={setCompletedQuests}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
    // <div className='quests'>
    //   {
    //     quests.map((quest) => (
    //       <SingleQuest
    //         key={quest.id}
    //         quest={quest}
    //         quests={quests}
    //         setQuests={setQuests}
    //       />
    //     ))
    //   }
    // </div>
  )
}

export default QuestList