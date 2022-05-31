import { VerifyToken } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { Router } from '@/presentation/protocols/router'
import { SetAccountStore } from '@/ui/protocols/stores'

export class VerifyTokenPresenter implements Presenter {
  constructor(
    private readonly verifyToken: VerifyToken,
    private readonly setAccountStore: SetAccountStore,
    private readonly router: Router
  ) {}
  
  async handle() {
    try {
      const account = await this.verifyToken.verify()

      this.setAccountStore.account = {
        name: account.name
      }

      return successResponse(null)
    } catch(error) {
      this.router.navigate('/login')

      throw error
    }
  }
}
