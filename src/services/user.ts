import { apiGet, apiPost, apiPut, apiDelete } from './api';
import User from '../types/Model/User';

export async function getUser(id: number): Promise<User> {
  return apiGet<User>(`/user/${id}`);
}

export async function listUsers(): Promise<User[]> {
  return apiGet<User[]>(`/user`);
}

export async function createUser(data: any): Promise<User> {
  return apiPost<User>(`/user`, data);
}

export async function updateUser(id: number, data: any): Promise<User> {
  return apiPut<User>(`/user/${id}`, data);
}

export async function deleteUser(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/user/${id}`);
}
