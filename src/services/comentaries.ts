
import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Comentary from '../types/Model/Comentary';

import type { IComentaryApiResponse as ComentaryApiResponse } from '../types/IComentaryApiResponse';

export function comentaryFromApi (data: ComentaryApiResponse): Comentary {
  return new Comentary(
    data._id,
    new Date(data._date),
    data._description,
    data._post_id,
    data._user_id
  );
}
export function comentariesFromApi(comentaries : ComentaryApiResponse[]) :Comentary[] {
  let comentariesResponseCollection :Comentary[] = [];
  
  comentaries.forEach(coment => 
    comentariesResponseCollection.push(comentaryFromApi(coment))
  )

  return comentariesResponseCollection;
}

export async function getOne(id: number): Promise<Comentary> {
  const data = await apiGet<ComentaryApiResponse>(`/comentaries/${id}`);
  return comentaryFromApi(data);
}

export async function getAll(): Promise<Comentary[]> {
  const data = await apiGet<ComentaryApiResponse[]>(`/comentaries`);
  return data.map(comentaryFromApi);
}

export async function getComentariesFromAPost(postId: number): Promise<Comentary[]> {
  const data = await apiGet<ComentaryApiResponse[]>(`/comentaries/post/${postId}`);
  return data.map(comentaryFromApi);
}

export async function getComentariesFromUser(userId: number): Promise<Comentary[]> {
  const data = await apiGet<ComentaryApiResponse[]>(`/comentaries/user/${userId}`);
  return data.map(comentaryFromApi);
}

export async function postComentary<T extends object>(data: T): Promise<Comentary> {
  const res = await apiPost<ComentaryApiResponse>(`/comentaries`, data);
  return comentaryFromApi(res);
}

export async function updateComentary<T extends object>(id: number, data: T): Promise<Comentary> {
  const res = await apiPut<ComentaryApiResponse>(`/comentaries/${id}`, data);
  return comentaryFromApi(res);
}

export async function deleteComentary(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/comentaries/${id}`);
}
