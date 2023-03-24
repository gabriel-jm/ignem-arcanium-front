import { homePage } from '@/common/ui/pages/home-page.js'
import { setAccountStorePresenters } from '@/main/factories/stores/index.js'

export function makeHomePage() {
  setAccountStorePresenters()

  return homePage()
}
