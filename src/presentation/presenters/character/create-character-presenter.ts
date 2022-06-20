import { CreateCharacter, CreateCharacterParams } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export type CreateCharacterPresenterParams = Omit<CreateCharacterParams, 'icon'>

export class CreateCharacterPresenter implements Presenter {
  constructor(private readonly createCharacter: CreateCharacter) {}
  
  async handle<T = any>(data: CreateCharacterPresenterParams): Promise<PresenterResult<T>> {
    const character = await this.createCharacter.create({
      ...data,
      icon: '/mage.svg'
    })

    return successResponse(character)
  }
}
