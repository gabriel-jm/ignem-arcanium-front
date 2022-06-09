import { RemoteFindAllCharacters } from '@/domain/use-cases'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeCharacterService } from '@/main/factories/services'
import { FindAllCharactersPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemCharactersPage } from '@/ui/view'

export function makeCharactersPage() {
  const charactersService = makeCharacterService()
  const remoteFindAllCharacters = new RemoteFindAllCharacters(charactersService)
  
  const presenter = new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new FindAllCharactersPresenter(remoteFindAllCharacters)
  )

  return new IgnemCharactersPage(presenter)
}
