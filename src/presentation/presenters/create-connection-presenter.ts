import { CreateConnection } from '@/domain/use-cases'
import { Presenter } from '@/presentation/protocols'

export class CreateConnectionPresenter implements Presenter {
  constructor(private readonly createConnection: CreateConnection) {}
  
  async handle() {
    const itSucceeds = await this.createConnection.create()

    return {
      ok: itSucceeds,
      data: null,
      validationErrors: null
    }
  }
}
