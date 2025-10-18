// pages/index.tsx
import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const data = await apiFetch('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
      // redirigir al login si token inválido
    }
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiFetch('/tasks', { method: 'POST', body: { title },});
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main>
      <h1>Mis Tareas</h1>
      <form onSubmit={addTask}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nueva tarea" />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <strong>{t.title}</strong> — {t.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </main>
  );
  
}
