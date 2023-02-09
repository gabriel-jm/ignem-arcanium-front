import { makeFindAllCharactersPresenter } from '@/main/factories/presenters'
import { DeleteCharacterPresenter } from '@/presentation/presenters/character/delete-character-presenter'
import { IgnemCharactersPage } from '@/ui/view'
import { makeFetchHTTPClient } from '../clients'

export function makeCharactersPage() {
  const findAllCharacters = makeFindAllCharactersPresenter()
  const deleteCharacter = new DeleteCharacterPresenter(makeFetchHTTPClient())

  return new IgnemCharactersPage({
    findAllCharacters,
    deleteCharacter
  })
}
