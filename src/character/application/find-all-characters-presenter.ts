import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { FindAllCharactersService } from './protocols/find-all-characters-service.js'

export class FindAllCharactersPresenter implements Presenter {
  constructor(
    private readonly findAllCharactersService: FindAllCharactersService
  ) {}
  
  async handle() {
    const characters = await this.findAllCharactersService.findAll()

    return successResponse(characters)
  }
}
