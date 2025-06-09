
import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Reservation from '../types/Model/Reservation';

export async function getReservation(id: number): Promise<Reservation> {
  return apiGet<Reservation>(`/reservation/${id}`);
}

export async function listReservations(): Promise<Reservation[]> {
  return apiGet<Reservation[]>(`/reservation`);
}

export async function createReservation<T extends object>(data: T): Promise<Reservation> {
  return apiPost<Reservation>(`/reservation`, data);
}

export async function updateReservation<T extends object>(id: number, data: T): Promise<Reservation> {
  return apiPut<Reservation>(`/reservation/${id}`, data);
}

export async function deleteReservation(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/reservation/${id}`);
}
