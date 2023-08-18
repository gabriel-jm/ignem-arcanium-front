import { makeFetchHTTPClient } from '@/common/main/factories/clients/fetch-http-client-factory.js'
import { CreateContentPresenter } from '@/contents/application/create-content-presenter.js'
import { DeleteContentPresenter } from '@/contents/application/delete-content-presenter.js'
import { FindContentsPresenter } from '@/contents/application/find-contents-presenter.js'
import { createContentsPage } from '@/contents/ui/create-contents-page.js'
import { contentsPage } from '@/contents/ui/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'

export function makeContentPage() {
  const fetchHTTPClient = makeFetchHTTPClient()
  const findAllPresenter = new ErrorHandlingPresenterDecorator(
    new FindContentsPresenter(fetchHTTPClient)
  )

  const deletePresenter = new ErrorHandlingPresenterDecorator(
    new DeleteContentPresenter(fetchHTTPClient)
  )
  return contentsPage({
    findAll: findAllPresenter,
    delete: deletePresenter
  })
}

export function makeCreateContentPage() {
  const createContent = new ErrorHandlingPresenterDecorator(
    new CreateContentPresenter(makeFetchHTTPClient())
  )
  return createContentsPage({ createContent })
}
