import { VerifyToken } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/presentation/protocols/stores'
import { router } from 'lithen-router'

export class VerifyTokenPresenter implements Presenter {
  constructor(
    private readonly verifyToken: VerifyToken,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle() {
    try {
      const account = await this.verifyToken.verify()

      this.setAccountStore.account = {
        name: account.name
      }

      return successResponse(null)
    } catch(error) {
      router.goTo('/login')

      throw error
    }
  }
}
