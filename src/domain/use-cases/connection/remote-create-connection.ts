import { CreateConnectionService } from '@/domain/protocols/services/index.js'
import { CreateConnection } from '@/domain/protocols/use-cases/index.js'

export class RemoteCreateConnection implements CreateConnection {
  constructor(private readonly createConnectionService: CreateConnectionService) {}
  
  async create() {
    await this.createConnectionService.create()

    return true
  }
}
