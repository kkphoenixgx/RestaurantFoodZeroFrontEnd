import { apiGet, apiPost, apiPut, apiDelete } from './api';

import Category from '../types/Model/Category.ts';

export async function getCategory(id: number): Promise<Category> {
  return apiGet<Category>(`/categories/${id}`);
}

export async function listCategories(): Promise<Category[]> {
  return apiGet<Category[]>(`/categories`);
}

export async function createCategory(data: { name: string }): Promise<Category> {
  return apiPost<Category>(`/categories`, data);
}

export async function updateCategory(id: number, data: { name: string }): Promise<Category> {
  return apiPut<Category>(`/categories/${id}`, data);
}

export async function deleteCategory(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/categories/${id}`);
}
