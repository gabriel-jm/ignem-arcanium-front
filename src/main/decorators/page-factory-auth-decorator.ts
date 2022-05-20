import { makeVerifyTokenPresenter } from '@/main/factories/presenters'

const verifyTokenPresenter = makeVerifyTokenPresenter()

export function auth(pageFactory: () => Element) {
  return async () => {
    const response = await verifyTokenPresenter.handle()

    if (!response.ok) return null

    return pageFactory()
  }
}
