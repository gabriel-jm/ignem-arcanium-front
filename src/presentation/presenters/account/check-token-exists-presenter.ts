import { CheckTokenExists } from '@/domain/protocols/use-cases/index.js'
import { failureResponse, successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'

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
