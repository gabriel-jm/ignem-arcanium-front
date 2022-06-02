import { setAccountStorePresenters } from '@/main/factories/stores'
import { IgnemHomePage } from '@/ui/view/pages/home'

export function makeHomePage() {
  setAccountStorePresenters()

  return new IgnemHomePage()
}
