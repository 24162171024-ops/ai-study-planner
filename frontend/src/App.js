import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/api/tasks', {
      subject, dueDate, priority
    });
    setTasks([...tasks, data]);
    setSubject(''); setDueDate('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const getAISuggestion = async () => {
    setLoading(true);
    const { data } = await axios.post('http://localhost:5000/api/ai/suggest', { tasks });
    setSuggestion(data.suggestion);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>AI Study Planner</h1>

      <form onSubmit={addTask} className="form">
        <input value={subject} onChange={e => setSubject(e.target.value)}
          placeholder="Subject (e.g. Math, Physics)" required />
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="tasks">
        {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
        {tasks.map(task => (
          <div key={task._id} className={`task ${task.priority}`}>
            <div>
              <h3>{task.subject}</h3>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <span className="badge">{task.priority}</span>
            </div>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={getAISuggestion} className="ai-btn">
        {loading ? 'Getting suggestion...' : 'Get AI Study Suggestion'}
      </button>

      {suggestion && (
        <div className="suggestion">
          <h3>AI Suggestion</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default App;