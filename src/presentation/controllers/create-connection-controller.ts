import { CreateConnection } from '@/domain/use-cases'
import { Controller, ControllerResult } from '@/presentation/protocols'

export class CreateConnectionController implements Controller {
  constructor(private readonly createConnection: CreateConnection) {}
  
  async handle() {
    await this.createConnection.create()

    return {} as ControllerResult
  }
}
