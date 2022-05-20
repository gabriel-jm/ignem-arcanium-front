import { HTTPClient, HTTPRequest, HTTPResponse } from '@/infra/protocols'

export class FetchHTTPClient implements HTTPClient {
  constructor(private readonly baseURL: string) {}
  
  async request<T = unknown>(params: HTTPRequest): Promise<HTTPResponse<T>> {
    const response = await fetch(`${this.baseURL}${params.path}`, {
      method: params.method.toUpperCase(),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...params.headers
      },
      body: params.body ? JSON.stringify(params.body) : null
    })

    const body = response.status !== 204
      ? await response.json()
      : null

    return {
      statusCode: response.status,
      body
    }
  }
}
