import { CacheStore } from '@/domain/protocols/cache'
import { FindAllCharactersService, FindAllCharactersServiceResult } from '@/domain/protocols/services'
import { HTTPServiceError, UnauthorizedError } from '@/infra/errors'
import { HTTPClient } from '@/infra/protocols'

export class CharacterService implements FindAllCharactersService {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly httpClient: HTTPClient
  ) {}

  async findAll(): Promise<FindAllCharactersServiceResult[]> {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    const response = await this.httpClient.request<FindAllCharactersServiceResult[]>({
      method: 'get',
      path: '/characters',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData?.token ?? ''}`
      }
    })

    if (response.statusCode === 401) {
      throw new UnauthorizedError()
    }

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on searching characters')
    }

    return response.body
  }
}
