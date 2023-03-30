import { IgnemCharactersPage } from '@/character/ui/pages/index.js'
import { makeFetchHTTPClient } from '@/common/main/factories/clients/index.js'
import { makeFindAllCharactersPresenter } from '@/main/factories/presenters/index.js'
import { DeleteCharacterPresenter } from '@/presentation/presenters/character/delete-character-presenter.js'

export function makeCharactersPage() {
  const findAllCharacters = makeFindAllCharactersPresenter()
  const deleteCharacter = new DeleteCharacterPresenter(makeFetchHTTPClient())

  return new IgnemCharactersPage({
    findAllCharacters,
    deleteCharacter
  })
}
