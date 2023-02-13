import { RemoteFindAllCharacters } from '@/domain/use-cases'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeCharacterService } from '@/main/factories/services'
import { FindAllCharactersPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/common/ui/notifiers'

export function makeFindAllCharactersPresenter() {
  const charactersService = makeCharacterService()
  const remoteFindAllCharacters = new RemoteFindAllCharacters(charactersService)

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new FindAllCharactersPresenter(remoteFindAllCharacters)
  )
}
