import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';

import InputField from './components/InputField';
import QuestList from './components/QuestList';
import { Quest } from './model'

const App: React.FC = () => {
  // PROPERTIES
  const [quest, setQuest] = useState<string>("")
  const [quests, setQuests] = useState<Quest[]>([])
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([])

  // FUNCTIONS
  const handleQuest = (e: React.FormEvent) => {
    e.preventDefault()

    if (quest) {
      setQuests([
        ...quests,
        {
          id: Date.now(),
          quest: quest,
          isCompleted: false
        }
      ]) //: setQuests
      setQuest("")
    } //: if
  } //: handleQuest

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    
    if (!destination) { return }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return }

    let add,
      active = quests,
      complete = completedQuests

    if (source.droppableId === "questList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "questList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedQuests(complete)
    setQuests(active)
  } //: onDragEnd

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Journey of the Day</span>
        <InputField 
          quest={quest}
          setQuest={setQuest}
          handleQuest={handleQuest}
        />
        <QuestList
          quests={quests}
          setQuests={setQuests}
          completedQuests={completedQuests}
          setCompletedQuests={setCompletedQuests}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
