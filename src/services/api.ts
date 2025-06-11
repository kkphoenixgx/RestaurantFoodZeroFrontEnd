const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Erro na requisição');
  }
  return res.json();
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  return handleResponse<T>(res);
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}` , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(res);
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}` , {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<T>(res);
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}` , {
    method: 'DELETE',
  });
  return handleResponse<T>(res);
}
