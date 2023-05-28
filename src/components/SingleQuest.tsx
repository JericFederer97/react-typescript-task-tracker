import React, { useState, useRef, useEffect } from 'react'
import { RiEdit2Fill } from 'react-icons/ri'
import { AiFillDelete, AiFillCheckCircle } from 'react-icons/ai'

import './styles.css'
import { Quest } from '../model'
import { Draggable } from 'react-beautiful-dnd'

// TYPES
type Props = {
  index: number
  quest: Quest,
  quests: Quest[],
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>
}

// type Actions =
//   | { 
//     type: "add"
//     payload: string
//   }
//   | { 
//     type: "remove"
//     payload: number
//   }
//   | { 
//     type: "completed"
//     payload: number
//   }

// const questReducer = (state: Quest[], action: Actions) => {
//   switch (action.type) {
//     case "add":
//       return [
//         ...state,
//         { id: Date.now(), quest: action.payload, isCompleted: false }
//       ]

//     case "remove":
//       return state.filter((quest) => quest.id !== action.payload)

//     case "completed":
//       return state.map((quest) => 
//         quest.id !== action.payload
//         ? { ...quest, isCompleted: !quest.isCompleted }
//         : quest
//       )
//   }
// }

// BODY
const SingleQuest: React.FC<Props> = ({index, quest, quests, setQuests}: Props) => {
  // PROPERTIES
  const [edit, setEdit] = useState<boolean>(false)
  const [editQuest, setEditQuest] = useState<string>(quest.quest)
  const inputRef = useRef<HTMLInputElement>(null)

  // FUNCTIONS
  const handleCompleted = (id: number) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id
        ? { ...quest, isCompleted: !quest.isCompleted }
        : quest
      )
    )
  }

  const handleDelete = (id: number) => {
    setQuests(
      quests.filter((quest) =>
        quest.id !== id
      )
    )
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()

    setQuests(
      quests.map((quest) =>
        quest.id === id 
        ? {...quest, quest: editQuest}
        : quest
      )
    )

    setEdit(false)
  }

  // Upon clicking the edit button, puts the cursor automtically on the item to be editted
  useEffect(
    () => {
      inputRef.current?.focus()
    }, [edit]
  )

  return (
    <Draggable draggableId={quest.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single_quest ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, quest.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {
            edit
            ? (
              <input
                ref={inputRef}
                value={editQuest}
                onChange={(e) => (setEditQuest(e.target.value))}
                className='single_quest_text'
              />
            )
            : (
              quest.isCompleted
              ? (
                <s className="single_quest_text">{quest.quest}</s> 
              )
              : (
                <span className="single_quest_text">{quest.quest}</span>
              )
            )
          }
          <div>
            <span
              className="icon"
              onClick={() => 
                {
                  if (!edit && !quest.isCompleted) {
                    setEdit(!edit)
                  }
                }
              }
            >
              <RiEdit2Fill />
            </span>
            <span className="icon" onClick={()=>handleDelete(quest.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={()=>handleCompleted(quest.id)}>
              <AiFillCheckCircle />
            </span>
          </div>
        </form>
      )}
    </Draggable>
    
  )
}

export default SingleQuest