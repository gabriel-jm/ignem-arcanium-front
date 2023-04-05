import { DeleteCharacterPresenter } from '@/character/application/delete-character-presenter.js'
import { FindAllCharactersPresenter } from '@/character/application/find-all-characters-presenter.js'
import { IgnemCharactersPage } from '@/character/ui/pages/index.js'
import { makeFetchHTTPClient } from '@/common/main/factories/clients/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { makeCharacterService } from '@/character/main/factories/services/index.js'

export function makeFindAllCharactersPresenter() {
  return new ErrorHandlingPresenterDecorator(
    new FindAllCharactersPresenter(makeCharacterService())
  )
}

export function makeCharactersPage() {
  const findAllCharacters = makeFindAllCharactersPresenter()
  const deleteCharacter = new DeleteCharacterPresenter(makeFetchHTTPClient())

  return new IgnemCharactersPage({
    findAllCharacters,
    deleteCharacter
  })
}
