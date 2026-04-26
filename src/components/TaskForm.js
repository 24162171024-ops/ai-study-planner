import { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ onAdd }) {
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/api/tasks', {
      subject, dueDate, priority
    });
    onAdd(data);
    setSubject(''); setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}