
import { apiGet, apiPost, apiPut, apiDelete } from './api';
import Post from '../types/Model/Post';
import type { IPostApiResponse as PostApiResponse } from '../types/IPostApiResponse';

import { userFromApi } from "./user"
import { comentariesFromApi } from './comentaries';
import { tagsFromApi } from './tags';

export function postFromApi(data: PostApiResponse): Post {
  return new Post(
    data._id,
    new Date(data._date),
    data._description,
    userFromApi(data._user),
    tagsFromApi(data._tags),
    comentariesFromApi(data._comentaries)
  );
}

export async function getPost(id: number): Promise<Post> {
  const data = await apiGet<PostApiResponse>(`/post/${id}`);
  return postFromApi(data);
}

export async function listPosts(): Promise<Post[]> {
  const data = await apiGet<PostApiResponse[]>(`/post`);
  return data.map(postFromApi);
}

export async function createPost<T extends object>(data: T): Promise<Post> {
  const res = await apiPost<PostApiResponse>(`/post`, data);
  return postFromApi(res);
}

export async function updatePost<T extends object>(id: number, data: T): Promise<Post> {
  const res = await apiPut<PostApiResponse>(`/post/${id}`, data);
  return postFromApi(res);
}

export async function deletePost(id: number): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/post/${id}`);
}