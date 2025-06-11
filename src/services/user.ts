
import { apiGet, apiPost, apiPut, apiDelete } from './api';
import User from '../types/Model/User';
import type { IUserApiResponse as UserApiResponse } from '../types/UserApiResponse';


export function userFromApi(data: UserApiResponse): User {
  return new User(
    data._id,
    data._name,
    data._email,
    data._senha,
    data._userImagePath,
    data._phone,
    data._role
  );
}

export async function getUser(id: number): Promise<User> {
  const data = await apiGet<UserApiResponse>(`/user/${id}`);
  return userFromApi(data);
}

export async function listUsers(): Promise<User[]> {
  const data = await apiGet<UserApiResponse[]>(`/user`);
  return data.map(userFromApi);
}

export async function createUser<T extends object>(data: T): Promise<User> {
  const res = await apiPost<UserApiResponse>(`/user`, data);
  return userFromApi(res);
}

export async function updateUser<T extends object>(id: number, data: T): Promise<User> {
  const res = await apiPut<UserApiResponse>(`/user/${id}`, data);
  return userFromApi(res);
}

export async function deleteUser(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/user/${id}`);
}
