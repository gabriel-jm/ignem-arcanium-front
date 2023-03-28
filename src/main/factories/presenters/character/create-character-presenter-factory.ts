import { RemoteCreateCharacter } from '@/domain/use-cases/index.js'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { makeCharacterService } from '@/main/factories/services/index.js'
import { CreateCharacterPresenter } from '@/presentation/presenters/index.js'
import { UiNotifier } from '@/common/ui/components/notification/index.js'

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
