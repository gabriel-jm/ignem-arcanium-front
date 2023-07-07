import { makeFetchHTTPClient } from '@/common/main/factories/clients/fetch-http-client-factory.js'
import { CreateContentPresenter } from '@/contents/application/create-content-presenter.js'
import { FindContentsPresenter } from '@/contents/application/find-contents-presenter.js'
import { createContentsPage } from '@/contents/ui/create-contents-page.js'
import { contentsPage } from '@/contents/ui/index.js'

export function makeContentPage() {
  return contentsPage({
    findAll: new FindContentsPresenter(makeFetchHTTPClient())
  })
}

export function makeCreateContentPage() {
  const createContent = new CreateContentPresenter(makeFetchHTTPClient())
  return createContentsPage({ createContent })
}
