import { makeCreateCharacterPresenter, makeFindAllCharactersPresenter } from '@/main/factories/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemCharactersPage } from '@/ui/view'

export function makeCharactersPage() {
  const findAllCharactersPresenter = makeFindAllCharactersPresenter()
  const createCharacterPresenter = makeCreateCharacterPresenter()

  return new IgnemCharactersPage(
    findAllCharactersPresenter,
    createCharacterPresenter,
    new UiNotifier()
  )
}
