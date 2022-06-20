import { RemoteCreateCharacter } from '@/domain/use-cases'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeCharacterService } from '@/main/factories/services'
import { CreateCharacterPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { validatorComposite } from '@/validation/composites'

const requiredNumber = {
  type: 'number',
  required: true
}

export function makeCreateCharacterPresenter() {
  const charactersService = makeCharacterService()
  const remoteCreateCharacter = new RemoteCreateCharacter(charactersService)

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new ValidationPresenterDecorator(
      new CreateCharacterPresenter(remoteCreateCharacter),
      validatorComposite({
        name: {
          type: 'string',
          required: true
        },
        level: requiredNumber,
        gold: requiredNumber,
        hp: requiredNumber,
        mp: requiredNumber,
        strength: requiredNumber,
        dexterity: requiredNumber,
        constitution: requiredNumber,
        intelligence: requiredNumber,
        wisdom: requiredNumber,
        charism: requiredNumber
      })
    )
  )
}
