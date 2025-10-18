// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// src/lib/api.ts
export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`http://localhost:4000${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined, // ✅ aquí
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return response.json();
}
