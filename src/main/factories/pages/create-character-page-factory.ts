import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeFetchHTTPClient } from '@/main/factories/clients'
import { makeCreateCharacterPresenter } from '@/main/factories/presenters'
import { successResponse } from '@/presentation/helpers'
import { ListAllDefaultItemsPresenter } from '@/item/application'
import { Presenter } from '@/presentation/protocols'
import { UiNotifier } from '@/common/ui/notifiers'
import { IgnemCreateCharacterPage } from '@/ui/view'
import { ItemsStore } from '@/item/ui/store/items-store'

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
