import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { CreateConnectionClient } from '../infra/protocols/index.js'

export class CreateConnectionPresenter implements Presenter {
  constructor(private readonly createConnectionClient: CreateConnectionClient) {}
  
  async handle() {
    await this.createConnectionClient.createConnection()

    return successResponse(null)
  }
}
