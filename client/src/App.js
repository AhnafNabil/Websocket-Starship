import React, { useState } from 'react';
import './App.css';

function App() {
  const [taskId, setTaskId] = useState('');
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTask(null);
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/api/get-task?id=${taskId}`);
      if (!response.ok) {
        throw new Error('Task not found');
      }
      const data = await response.json();
      setTask(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Task Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Enter Task ID"
          required
        />
        <button type="submit">Get Task Details</button>
      </form>
      {error && <p className="error">{error}</p>}
      {task && (
        <div className="task-details">
          <h2>{task.title}</h2>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;