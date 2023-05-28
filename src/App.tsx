import React, { useState } from 'react';
import './App.css';

import InputField from './components/InputField';
import QuestList from './components/QuestList';
import { Quest } from './model'

const App: React.FC = () => {
  // PROPERTIES
  const [quest, setQuest] = useState<string>("")
  const [quests, setQuests] = useState<Quest[]>([])

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

  return (
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
      />
    </div>
  );
}

export default App;
