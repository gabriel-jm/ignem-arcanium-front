import { CreateCharacterService, CreateCharacterServiceParams, CreateCharacterServiceResult } from '@/character/application/protocols/create-character-service.js'
import { HTTPServiceError } from '@/common/infra/errors/index.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'
import {
  FindAllCharactersService,
  FindAllCharactersServiceResult
} from '@/domain/protocols/services/index.js'

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
