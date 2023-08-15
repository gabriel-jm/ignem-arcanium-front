import { makeFetchHTTPClient } from '@/common/main/factories/clients/fetch-http-client-factory.js'
import { CreateContentPresenter } from '@/contents/application/create-content-presenter.js'
import { FindContentsPresenter } from '@/contents/application/find-contents-presenter.js'
import { createContentsPage } from '@/contents/ui/create-contents-page.js'
import { contentsPage } from '@/contents/ui/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'

export function makeContentPage() {
  const presenter = new ErrorHandlingPresenterDecorator(
    new FindContentsPresenter(makeFetchHTTPClient())
  )
  return contentsPage({ findAll: presenter })
}

export function makeCreateContentPage() {
  const createContent = new ErrorHandlingPresenterDecorator(
    new CreateContentPresenter(makeFetchHTTPClient())
  )
  return createContentsPage({ createContent })
}
