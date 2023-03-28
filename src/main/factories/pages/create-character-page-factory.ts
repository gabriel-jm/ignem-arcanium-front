import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { makeFetchHTTPClient } from '@/main/factories/clients/index.js'
import { makeCreateCharacterPresenter } from '@/main/factories/presenters/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { ListAllDefaultItemsPresenter } from '@/item/application/index.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { UiNotifier } from '@/common/ui/components/notification/index.js'
import { ItemsStore } from '@/item/ui/store/items-store.js'
import { IgnemCreateCharacterPage } from '@/ui/view/pages/index.js'

export function makeCreateCharactersPage() {
  const listAllDefaultItemsPresenter = new ListAllDefaultItemsPresenter(
    makeFetchHTTPClient(),
    new ItemsStore()
  )
  // TODO: create a validation only presenter
  const dummyPresenter: Presenter = {
    handle: (data) => Promise.resolve(successResponse(data))
  }

  const generalInfoSchema = {
    name: {
      type: 'string',
      required: true
    },
    alignment: {
      type: 'string',
      required: true,
      // TODO: add oneOf validation
    },
    level: {
      type: 'number',
      required: true
    },
    gold: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string'
    }
  }

  const attributesSchema = Object.fromEntries(
    (['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])
      .map(attribute => [attribute, {
        type: 'number',
        required: true,
        valueInBetween: [0, 6]
      }])
  )
  const equipmentSchema = Object.fromEntries(
    (['rightHand', 'leftHand', 'armor', 'accessory1', 'accessory2'])
      .map(attribute => [attribute, { type: 'string' }])
  )

  const generalInfoPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    generalInfoSchema
  )

  const attributesPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    attributesSchema
  )

  const equipmentPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    equipmentSchema
  )

  return new IgnemCreateCharacterPage({
    listItemsPresenter: new ErrorHandlingPresenterDecorator(
      new UiNotifier(),
      listAllDefaultItemsPresenter
    ),
    generalInfoPresenter,
    attributesPresenter,
    equipmentPresenter,
    createCharacterPresenter: makeCreateCharacterPresenter()
  })
}
