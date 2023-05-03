/* eslint-disable @typescript-eslint/no-explicit-any */

import http from './AxiosService';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export default class BaseService {
  protected prefix = '';

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  protected async performRequest<T>(method: METHODS, url: string, data: any = {}, headers = {}): Promise<T> {
    const endPoint = this.prefix + (url ? `/${url}` : '');
    const options: any = {
      method,
      url: endPoint,
      data,
      headers,
    };

    options[method === METHODS.GET ? 'params' : 'data'] = data;
    const response = await http(options);

    return response.data;
  }
}
