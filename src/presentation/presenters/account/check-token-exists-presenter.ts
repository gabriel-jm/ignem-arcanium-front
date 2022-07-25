import { CheckTokenExists } from '@/domain/protocols/use-cases'
import { failureResponse, successResponse } from '@/presentation/helpers'
import { Presenter, Router } from '@/presentation/protocols'

export class CheckTokenExistsPresenter implements Presenter {
  constructor(
    private readonly checkTokenExists: CheckTokenExists,
    private readonly router: Router
  ) {}
  
  handle() {
    const hasToken = this.checkTokenExists.check()

    if (hasToken) {
      this.router.navigate('/home')

      return Promise.resolve(successResponse(null))
    }

    return Promise.resolve(failureResponse(null))
  }
}
