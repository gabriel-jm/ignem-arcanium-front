import { CreateConnection } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'

export class CreateConnectionPresenter implements Presenter {
  constructor(private readonly createConnection: CreateConnection) {}
  
  async handle() {
    await this.createConnection.create()

    return successResponse(null)
  }
}
