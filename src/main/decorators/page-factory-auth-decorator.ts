import { makeVerifyTokenPresenter } from '@/main/factories/presenters'
import { setAccountStorePresenters } from '@/main/factories/stores'

const verifyTokenPresenter = makeVerifyTokenPresenter()

export function auth(pageFactory: () => Element) {
  return async () => {
    const response = await verifyTokenPresenter.handle()

    if (!response.ok) return null

    setAccountStorePresenters()

    return pageFactory()
  }
}
