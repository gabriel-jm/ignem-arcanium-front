import { FetchHTTPClient } from '@/infra/clients'
import { AccountService } from '@/infra/services'

export function makeAccountService() {
  const httpClient = new FetchHTTPClient(import.meta.env.VITE_SERVER_URL)
  return new AccountService(httpClient)
}
