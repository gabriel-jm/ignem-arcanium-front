import { FindAllCharacters } from '@/domain/protocols/use-cases/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'

export class FindAllCharactersPresenter implements Presenter {
  constructor(
    private readonly findAllCharacters: FindAllCharacters
  ) {}
  
  async handle() {
    const characters = await this.findAllCharacters.findAll()

    return successResponse(characters)
  }
}
