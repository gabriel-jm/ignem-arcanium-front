import { RemoteListAllDefaultItems } from '@/domain/use-cases'
import { ItemService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeFetchHTTPClient } from '@/main/factories/clients'
import { successResponse } from '@/presentation/helpers'
import { ListAllDefaultItemsPresenter } from '@/presentation/presenters'
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

  const generalInfoPresenter = new ValidationPresenterDecorator(
    { handle: (data) => Promise.resolve(successResponse(data)) },
    {
      name: {
        type: 'string',
        required: true
      },
      alignment: {
        type: 'string',
        required: true
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

  return new IgnemCreateCharacterPage({
    listItemsPresenter: new ErrorHandlingPresenterDecorator(
      new UiNotifier(),
      listAllDefaultItemsPresenter
    ),
    generalInfoPresenter
  })
}
