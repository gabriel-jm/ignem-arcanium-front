import { makeFindAllCharactersPresenter } from '@/main/factories/presenters'
import { IgnemCharactersPage } from '@/ui/view'

export function makeCharactersPage() {
  const findAllCharactersPresenter = makeFindAllCharactersPresenter()

  return new IgnemCharactersPage(findAllCharactersPresenter)
}
