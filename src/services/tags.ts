
import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Tag from '../types/Model/Tag';

export async function getTag(id: number): Promise<Tag> {
  return apiGet<Tag>(`/tags/${id}`);
}

export async function listTags(): Promise<Tag[]> {
  return apiGet<Tag[]>(`/tags`);
}

export async function createTag<T extends object>(data: T): Promise<Tag> {
  return apiPost<Tag>(`/tags`, data);
}

export async function updateTag<T extends object>(id: number, data: T): Promise<Tag> {
  return apiPut<Tag>(`/tags/${id}`, data);
}

export async function deleteTag(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/tags/${id}`);
}