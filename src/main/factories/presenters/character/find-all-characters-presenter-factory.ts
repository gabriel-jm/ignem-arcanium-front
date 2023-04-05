import { FindAllCharactersPresenter } from '@/character/application/find-all-characters-presenter.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { makeCharacterService } from '@/main/factories/services/index.js'

export function makeFindAllCharactersPresenter() {
  return new ErrorHandlingPresenterDecorator(
    new FindAllCharactersPresenter(makeCharacterService())
  )
}
