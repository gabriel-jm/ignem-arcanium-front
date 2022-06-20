import { AccountService } from '@/infra/services'
import { makeFetchHTTPClient } from '@/main/factories/clients'

export function makeAccountService() {
  const httpClient = makeFetchHTTPClient()
  return new AccountService(httpClient)
}
