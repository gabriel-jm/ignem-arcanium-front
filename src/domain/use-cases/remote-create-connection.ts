import { CreateConnectionService } from '@/domain/protocols/services'
import { CreateConnection } from '@/domain/protocols/use-cases'

export class RemoteCreateConnection implements CreateConnection {
  constructor(private readonly createConnectionService: CreateConnectionService) {}
  
  async create() {
    await this.createConnectionService.create()

    return true
  }
}
