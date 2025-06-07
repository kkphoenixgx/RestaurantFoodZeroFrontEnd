import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Plate from '../types/Model/Plate';

export async function getPlate(id: number): Promise<Plate> {
  return apiGet<Plate>(`/plates/${id}`);
}

export async function listPlates(): Promise<Plate[]> {
  return apiGet<Plate[]>(`/plates`);
}

export async function getCategoriesByPlate(plateId: number): Promise<number[]> {
  return apiGet<number[]>(`/plates/${plateId}/categories`);
}

export async function getPlatesByCategory(categoryId: number): Promise<Plate[]> {
  return apiGet<Plate[]>(`/plates/category/${categoryId}`);
}

export async function createPlate(data: any): Promise<Plate> {
  return apiPost<Plate>(`/plates`, data);
}

export async function updatePlate(id: number, data: any): Promise<Plate> {
  return apiPut<Plate>(`/plates/${id}`, data);
}

export async function deletePlate(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/plates/${id}`);
}