import { CacheStore } from '@/common/infra/protocols/index.js'
import { failureResponse, successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'

export class CheckTokenExistsPresenter implements Presenter {
  constructor(
    private readonly cacheStore: CacheStore
  ) {}
  
  handle() {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    if (tokenData?.token) {
      return Promise.resolve(successResponse(null))
    }

    return Promise.resolve(failureResponse(null))
  }
}
