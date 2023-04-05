import { setAccountStorePresenters } from '../factories/index.js'
import { makeVerifyTokenPresenter } from '../factories/verify-token-factories.js'

export function auth(pageFactory: () => Node) {
  const verifyTokenPresenter = makeVerifyTokenPresenter()
  
  return async () => {
    const response = await verifyTokenPresenter.handle()

    if (!response.ok) return null

    setAccountStorePresenters()

    return pageFactory()
  }
}
