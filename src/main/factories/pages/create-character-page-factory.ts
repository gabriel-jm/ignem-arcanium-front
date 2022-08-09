import { RemoteListAllDefaultItems } from '@/domain/use-cases'
import { ItemService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeFetchHTTPClient } from '@/main/factories/clients'
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

  return new IgnemCreateCharacterPage(
    new ErrorHandlingPresenterDecorator(
      new UiNotifier(),
      listAllDefaultItemsPresenter
    )
  )
}
