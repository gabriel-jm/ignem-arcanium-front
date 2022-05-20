import { VerifyToken } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { Router } from '@/presentation/protocols/router'

export class VerifyTokenPresenter implements Presenter {
  constructor(
    private readonly verifyToken: VerifyToken,
    private readonly router: Router
  ) {}
  
  async handle() {
    try {
      await this.verifyToken.verify()

      return successResponse(null)
    } catch(error) {
      this.router.navigate('/login')

      throw error
    }
  }
}
