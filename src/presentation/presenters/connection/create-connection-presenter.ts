import { CreateConnection } from '@/domain/protocols/use-cases/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'

export class CreateConnectionPresenter implements Presenter {
  constructor(private readonly createConnection: CreateConnection) {}
  
  async handle() {
    await this.createConnection.create()

    return successResponse(null)
  }
}
