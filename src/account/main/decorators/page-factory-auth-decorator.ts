import { setAccountStorePresenters } from '@/main/factories/stores'
import { makeVerifyTokenPresenter } from '../factories/verify-token-presenter-factory'

export function auth(pageFactory: () => Element) {
  const verifyTokenPresenter = makeVerifyTokenPresenter()
  
  return async () => {
    const response = await verifyTokenPresenter.handle()

    if (!response.ok) return null

    setAccountStorePresenters()

    return pageFactory()
  }
}
