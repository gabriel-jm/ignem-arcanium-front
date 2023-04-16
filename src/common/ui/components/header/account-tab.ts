import { AccountStore } from '@/account/ui/stores/account-store.js'
import { el } from 'lithen-fns'
import { t } from '../singles/translation.js'

export function accountTab() {
  const accountStore = new AccountStore()

  return el/*html*/`
    <div>
      <h2>${t('Account')}</h2>

      <br />

      <div>
        <span class="bold">${t('Name')}</span>
        <span>${accountStore.account?.name}</span>
      </div>
      <div>
        <span class="bold">E-Mail</span>
        <span>any@email.com</span>
      </div>
    </div>
  `
}
