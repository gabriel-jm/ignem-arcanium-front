import { CacheStore } from '@/domain/protocols/cache'
import {
  CreateCharacterService,
  CreateCharacterServiceParams,
  CreateCharacterServiceResult,
  FindAllCharactersService,
  FindAllCharactersServiceResult
} from '@/domain/protocols/services'
import { HTTPServiceError, UnauthorizedError } from '@/infra/errors'
import { HTTPClient } from '@/infra/protocols'

type Service = FindAllCharactersService & CreateCharacterService

export class CharacterService implements Service {
  constructor(
    private readonly httpClient: HTTPClient
  ) {}

  async findAll(): Promise<FindAllCharactersServiceResult[]> {
    const response = await this.httpClient.request<FindAllCharactersServiceResult[]>({
      method: 'get',
      path: '/characters'
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on searching characters')
    }

    return response.body
  }

  async create(params: CreateCharacterServiceParams) {
    const response = await this.httpClient.request<CreateCharacterServiceResult>({
      method: 'post',
      path: '/characters',
      body: params
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on creating the character')
    }

    return response.body
  }
}
