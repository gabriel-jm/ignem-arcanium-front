import { RemoteListAllDefaultItems } from '@/domain/use-cases'
import { ItemService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeFetchHTTPClient } from '@/main/factories/clients'
import { successResponse } from '@/presentation/helpers'
import { ListAllDefaultItemsPresenter } from '@/presentation/presenters'
import { Presenter } from '@/presentation/protocols'
import { UiNotifier } from '@/ui/notifiers'
import { ItemsStore } from '@/ui/stores'
import { IgnemCreateCharacterPage } from '@/ui/view'

export function makeCreateCharactersPage() {
  const itemsStore = new ItemsStore()

  const httpClient = makeFetchHTTPClient()
  const itemService = new ItemService(httpClient)
  const remoteListAllDefaultItems = new RemoteListAllDefaultItems(itemService)

  const listAllDefaultItemsPresenter = new ListAllDefaultItemsPresenter(
    remoteListAllDefaultItems,
    itemsStore
  )
  // TODO: create a validation only presenter
  const dummyPresenter: Presenter = {
    handle: (data) => Promise.resolve(successResponse(data))
  }

  const generalInfoPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    {
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
  )

  const attributesPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    Object.fromEntries(
      (['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])
        .map(attribute => [attribute, {
          type: 'number',
          required: true,
          valueInBetween: [0, 6]
        }])
    )
  )

  const equipmentPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    Object.fromEntries(
      (['rightHand', 'leftHand', 'armor', 'accessory1', 'accessory2'])
        .map(attribute => [attribute, { type: 'string' }])
    )
  )

  return new IgnemCreateCharacterPage({
    listItemsPresenter: new ErrorHandlingPresenterDecorator(
      new UiNotifier(),
      listAllDefaultItemsPresenter
    ),
    generalInfoPresenter,
    attributesPresenter,
    equipmentPresenter
  })
}
