import { setAccountStorePresenters } from '@/account/main/factories/index.js'
import { homePage } from '@/common/ui/pages/home-page.js'

export function makeHomePage() {
  setAccountStorePresenters()

  return homePage()
}
