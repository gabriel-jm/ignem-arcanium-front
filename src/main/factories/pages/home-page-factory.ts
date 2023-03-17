import { setAccountStorePresenters } from '@/main/factories/stores/index.js'
import { IgnemHomePage } from '@/ui/view/pages/index.js'

export function makeHomePage() {
  setAccountStorePresenters()

  return new IgnemHomePage()
}
