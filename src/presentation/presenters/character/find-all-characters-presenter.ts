import { FindAllCharacters } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'

export class FindAllCharactersPresenter implements Presenter {
  constructor(
    private readonly findAllCharacters: FindAllCharacters
  ) {}
  
  async handle() {
    const characters = await this.findAllCharacters.findAll()

    return successResponse(characters)
  }
}
