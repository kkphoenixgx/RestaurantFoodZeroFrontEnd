import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Comentary from '../types/Model/Comentary';

export async function getOne(id: number): Promise<Comentary> {
  return apiGet<Comentary>(`/comentaries/${id}`);
}

export async function getAll(): Promise<Comentary[]> {
  return apiGet<Comentary[]>(`/comentaries`);
}

export async function getComentariesFromAPost(postId: number): Promise<Comentary[]> {
  return apiGet<Comentary[]>(`/comentaries/post/${postId}`);
}

export async function getComentariesFromUser(userId: number): Promise<Comentary[]> {
  return apiGet<Comentary[]>(`/comentaries/user/${userId}`);
}

export async function postComentary(data: { date: string; description: string; postId: number; userId: number }): Promise<Comentary> {
  return apiPost<Comentary>(`/comentaries`, data);
}

export async function updateComentary(id: number, data: { date: string; description: string; postId: number; userId: number }): Promise<Comentary> {
  return apiPut<Comentary>(`/comentaries/${id}`, data);
}

export async function deleteComentary(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/comentaries/${id}`);
}
