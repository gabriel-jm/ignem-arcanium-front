import { makeFindAllCharactersPresenter } from '@/main/factories/presenters/index.js'
import { DeleteCharacterPresenter } from '@/presentation/presenters/character/delete-character-presenter.js'
import { IgnemCharactersPage } from '@/ui/view/pages/index.js'
import { makeFetchHTTPClient } from '../clients/index.js'

export function makeCharactersPage() {
  const findAllCharacters = makeFindAllCharactersPresenter()
  const deleteCharacter = new DeleteCharacterPresenter(makeFetchHTTPClient())

  return new IgnemCharactersPage({
    findAllCharacters,
    deleteCharacter
  })
}
