import { CreateConnectionService } from '@/data/protocols'
import { CreateConnection } from '@/domain/use-cases'

export class RemoteCreateConnection implements CreateConnection {
  constructor(private readonly createConnectionService: CreateConnectionService) {}
  
  async create() {
    await this.createConnectionService.create()

    return true
  }
}
