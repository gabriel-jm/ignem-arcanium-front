import { CreateConnection } from '@/domain/use-cases'
import { Controller } from '@/presentation/protocols'

export class CreateConnectionController implements Controller {
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
