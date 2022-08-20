import { QueryServer } from '@mineaurion/api';
import { HeadersInit } from 'node-fetch';
import { singleton } from 'tsyringe';
import { http } from '../utils/helper.js';

@singleton()
export class ServerService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private url = process.env.API_SERVER_DOMAIN!;

  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  public getQueryServers(): Promise<QueryServer[]> {
    return http<QueryServer[]>(`${this.url}/query`, {
      headers: this.headers,
    });
  }
}
