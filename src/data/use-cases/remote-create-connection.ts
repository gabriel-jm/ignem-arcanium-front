import { CreateConnectionService } from '@/data/protocols'
import { CreateConnection } from '@/domain/use-cases'

export class RemoteCreateConnection implements CreateConnection {
  constructor(private readonly createConnectionService: CreateConnectionService) {}
  
  async create(): Promise<string> {
    const connectionId = await this.createConnectionService.create()

    return connectionId
  }
}
