import { makeFetchHTTPClient } from '@/common/main/factories/clients/fetch-http-client-factory.js'
import { CreateContentPresenter } from '@/contents/application/create-content-presenter.js'
import { contentsPage } from '@/contents/ui/index.js'

export function makeContentPage() {
  const createContent = new CreateContentPresenter(makeFetchHTTPClient())

  return contentsPage({
    createContent
  })
}
