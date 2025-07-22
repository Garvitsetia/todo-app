import React, { useState } from 'react';
import './App.css';

const themes = ['dual', 'gradient', 'favGradient','dark', 'blue', 'pastel', 'sunset', 'forest', 'ocean', 'peach', 'neon'];

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('dual');
  const [filter, setFilter] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className={`app ${theme}`}>
      <h1>📝 To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask} title="Add Task">➕</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('done')}>Done</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={`task ${task.completed ? 'completed' : ''}`}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)} title="Save">💾</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="action-buttons">
                  <button onClick={() => toggleComplete(index)} title="Mark as Done">✔️</button>
                  <button onClick={() => startEditing(index)} title="Edit">✏️</button>
                  <button onClick={() => deleteTask(index)} title="Delete">❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="theme-button-container">
        <button onClick={toggleTheme} title="Change Theme">🎨 Theme</button>
        <p>Total: {tasks.length} | Done: {tasks.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;

