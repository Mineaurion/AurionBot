import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const http = async <T>(
  request: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(request, init);
  if (!response.ok) {
    console.error('Erreur fetching', request);
    throw response.statusText;
  }
  const body = await response.text();
  if (body) {
    return JSON.parse(body) as T;
  }
  return JSON.parse('{}');
};
