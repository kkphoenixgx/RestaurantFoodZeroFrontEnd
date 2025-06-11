import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Plate from '../types/Model/Plate';
import type { IPlateApiResponse as PlateApiResponse } from '../types/IPlateApiResponse';

export function plateFromApi(data: PlateApiResponse): Plate {
  return new Plate(
    data._id,
    data._name,
    data._value,
    data._description,
    data._imagePath
  );
}

export async function getPlate(id: number): Promise<Plate> {
  const data = await apiGet<PlateApiResponse>(`/plates/${id}`);
  return plateFromApi(data);
}

export async function listPlates(): Promise<Plate[]> {
  const data = await apiGet<PlateApiResponse[]>(`/plates`);
  return data.map(plateFromApi);
}

export async function getCategoriesByPlate(plateId: number): Promise<number[]> {
  return apiGet<number[]>(`/plates/${plateId}/categories`);
}

export async function getPlatesByCategory(categoryId: number): Promise<Plate[]> {
  const data = await apiGet<PlateApiResponse[]>(`/plates/category/${categoryId}`);
  return data.map(plateFromApi);
}

export async function createPlate<T extends object>(data: T): Promise<Plate> {
  const res = await apiPost<PlateApiResponse>(`/plates`, data);
  return plateFromApi(res);
}

export async function updatePlate<T extends object>(id: number, data: T): Promise<Plate> {
  const res = await apiPut<PlateApiResponse>(`/plates/${id}`, data);
  return plateFromApi(res);
}

export async function deletePlate(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/plates/${id}`);
}