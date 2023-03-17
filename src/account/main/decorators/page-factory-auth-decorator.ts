import { setAccountStorePresenters } from '@/main/factories/stores/index.js'
import { makeVerifyTokenPresenter } from '../factories/verify-token-presenter-factory.js'

export function auth(pageFactory: () => Element) {
  const verifyTokenPresenter = makeVerifyTokenPresenter()
  
  return async () => {
    const response = await verifyTokenPresenter.handle()

    if (!response.ok) return null

    setAccountStorePresenters()

    return pageFactory()
  }
}
