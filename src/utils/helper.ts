import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { logger } from '../main.js';

export const http = async <T>(
  request: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(request, init);
  if (!response.ok) {
    logger.error('Erreur fetching', request);
    throw response.statusText;
    // throw new Error('Http Error, response is not ok');
  }
  const body = await response.text();
  if (body) {
    return JSON.parse(body) as T;
  }
  return JSON.parse('{}');
};
