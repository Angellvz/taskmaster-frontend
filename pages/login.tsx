// pages/login.tsx
import { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(r => r.json());
      // guarda token
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
