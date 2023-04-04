import { CreateCharacterParams } from '../create-character-presenter.js'

export type CreateCharacterServiceParams = CreateCharacterParams

export interface CreateCharacterServiceResult {
  id: string
}

export interface CreateCharacterService {
  create(params: CreateCharacterServiceParams): Promise<CreateCharacterServiceResult>
}
