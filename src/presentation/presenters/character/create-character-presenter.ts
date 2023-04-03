import { CreateCharacter, CreateCharacterParams } from '@/domain/protocols/use-cases/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter, PresenterResult } from '@/common/application/protocols/index.js'

export type CreateCharacterPresenterParams = Omit<CreateCharacterParams, 'icon'>

export class CreateCharacterPresenter implements Presenter {
  constructor(private readonly createCharacter: CreateCharacter) {}
  
  async handle<T = any>(data: CreateCharacterPresenterParams): Promise<PresenterResult<T>> {
    const character = await this.createCharacter.create({
      ...data,
      icon: '/mage.svg',
      characterPoints: 0,
    })

    return successResponse(character)
  }
}
