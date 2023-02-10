import { CheckTokenExists } from '@/domain/protocols/use-cases'
import { failureResponse, successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'

export class CheckTokenExistsPresenter implements Presenter {
  constructor(
    private readonly checkTokenExists: CheckTokenExists
  ) {}
  
  handle() {
    const hasToken = this.checkTokenExists.check()

    if (hasToken) {
      return Promise.resolve(successResponse(null))
    }

    return Promise.resolve(failureResponse(null))
  }
}
