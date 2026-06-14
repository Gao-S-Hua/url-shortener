import axios from 'axios';
import type { CreateUrlResponse, PaginatedResult, UrlRecord } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export async function createUrl(
  originalUrl: string,
): Promise<CreateUrlResponse> {
  const { data } = await api.post<CreateUrlResponse>('/urls', {
    originalUrl,
  });
  return data;
}

export async function getUrls(
  page: number,
  limit: number,
): Promise<PaginatedResult<UrlRecord>> {
  const { data } = await api.get<PaginatedResult<UrlRecord>>('/urls', {
    params: { page, limit },
  });
  return data;
}

export async function updateUrl(
  id: number,
  originalUrl: string,
): Promise<UrlRecord> {
  const { data } = await api.patch<UrlRecord>(`/urls/${id}`, {
    originalUrl,
  });
  return data;
}

export async function deleteUrl(id: number): Promise<void> {
  await api.delete(`/urls/${id}`);
}
