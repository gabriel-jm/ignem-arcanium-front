import { RemoteFindAllCharacters } from '@/domain/use-cases'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeCharacterService } from '@/main/factories/services'
import { successResponse } from '@/presentation/helpers'
import { FindAllCharactersPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemCharactersPage } from '@/ui/view'

export function makeCharactersPage() {
  const charactersService = makeCharacterService()
  const remoteFindAllCharacters = new RemoteFindAllCharacters(charactersService)
  
  const presenter = new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    // new FindAllCharactersPresenter(remoteFindAllCharacters)
    {
      async handle() {
        return successResponse([{
          id: crypto.randomUUID(),
          name: 'Mage',
          icon: '/mage.svg',
          level: 1,
          gold: 100,
          hp: 10,
          mp: 10,
          strength: 1,
          dexterity: 2,
          constitution: 2,
          intelligence: 4,
          wisdom: 3,
          charism: 2
        }])
      }
    }
  )

  return new IgnemCharactersPage(presenter)
}
