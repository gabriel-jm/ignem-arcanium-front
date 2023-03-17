import { RemoteFindAllCharacters } from '@/domain/use-cases/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { makeCharacterService } from '@/main/factories/services/index.js'
import { FindAllCharactersPresenter } from '@/presentation/presenters/index.js'
import { UiNotifier } from '@/common/ui/notifiers/index.js'

export function makeFindAllCharactersPresenter() {
  const charactersService = makeCharacterService()
  const remoteFindAllCharacters = new RemoteFindAllCharacters(charactersService)

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new FindAllCharactersPresenter(remoteFindAllCharacters)
  )
}
