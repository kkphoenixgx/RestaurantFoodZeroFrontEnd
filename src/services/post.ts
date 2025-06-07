import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Post from '../types/Model/Post';

export async function getPost(id: number): Promise<Post> {
  return apiGet<Post>(`/post/${id}`);
}

export async function listPosts(): Promise<Post[]> {
  return apiGet<Post[]>(`/post`);
}

export async function createPost(data: any): Promise<Post> {
  return apiPost<Post>(`/post`, data);
}

export async function updatePost(id: number, data: any): Promise<Post> {
  return apiPut<Post>(`/post/${id}`, data);
}

export async function deletePost(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/post/${id}`);
}