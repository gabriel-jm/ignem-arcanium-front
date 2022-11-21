import { RemoteCreateCharacter } from '@/domain/use-cases'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeCharacterService } from '@/main/factories/services'
import { CreateCharacterPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'

const requiredNumber = {
  type: 'number',
  required: true
}

const requiredAttributeNumber = {
  ...requiredNumber,
  valueInBetween: [1, 6]
}

export function makeCreateCharacterPresenter() {
  const charactersService = makeCharacterService()
  const remoteCreateCharacter = new RemoteCreateCharacter(charactersService)

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new ValidationPresenterDecorator(
      new CreateCharacterPresenter(remoteCreateCharacter),
      {
        name: {
          type: 'string',
          required: true
        },
        level: requiredNumber,
        gold: requiredNumber,
        alignment: {
          type: 'string',
          required: true
          // TODO: add oneOf validation
        },
        description: {
          type: 'string'
        },
        strength: requiredAttributeNumber,
        dexterity: requiredAttributeNumber,
        constitution: requiredAttributeNumber,
        intelligence: requiredAttributeNumber,
        wisdom: requiredAttributeNumber,
        charisma: requiredAttributeNumber,
        // TODO: add object and array validation
        equipment: {
          type: 'object'
        },
        inventoryItems: {
          type: 'array'
        }
      }
    )
  )
}
