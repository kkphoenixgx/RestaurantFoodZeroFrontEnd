import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Tag from '../types/Model/Tag';

export async function getTag(id: number): Promise<Tag> {
  return apiGet<Tag>(`/tags/${id}`);
}

export async function listTags(): Promise<Tag[]> {
  return apiGet<Tag[]>(`/tags`);
}

export async function createTag(data: { name: string }): Promise<Tag> {
  return apiPost<Tag>(`/tags`, data);
}

export async function updateTag(id: number, data: { name: string }): Promise<Tag> {
  return apiPut<Tag>(`/tags/${id}`, data);
}

export async function deleteTag(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/tags/${id}`);
}