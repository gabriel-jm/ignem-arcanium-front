import { CacheStore } from '@/domain/protocols/cache'
import { UnauthorizedError } from '@/infra/errors'
import { HTTPClient, HTTPRequest, HTTPResponse } from '@/infra/protocols'

export class FetchHTTPClient implements HTTPClient {
  constructor(
    private readonly baseURL: string,
    private readonly cacheStore: CacheStore
  ) {}
  
  async request<T = unknown>(params: HTTPRequest): Promise<HTTPResponse<T>> {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    const response = await fetch(`${this.baseURL}${params.path}`, {
      method: params.method.toUpperCase(),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        ...tokenData && { Authorization: `Bearer ${tokenData.token}` },
        ...params.headers
      },
      body: params.body ? JSON.stringify(params.body) : null
    })

    if (response.status === 401) {
      throw new UnauthorizedError()
    }

    const body = response.status !== 204
      ? await response.json()
      : null

    return {
      statusCode: response.status,
      body
    }
  }
}
