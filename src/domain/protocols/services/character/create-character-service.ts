import { CreateCharacterParams } from '@/domain/protocols/use-cases'

export type CreateCharacterServiceParams = CreateCharacterParams

export interface CreateCharacterServiceResult {
  id: string
}

export interface CreateCharacterService {
  create(params: CreateCharacterServiceParams): Promise<CreateCharacterServiceResult>
}
