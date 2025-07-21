import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input]);
    setInput('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task">
            {task}
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
