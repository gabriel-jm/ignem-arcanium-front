import { CreateConnectionService } from '@/domain/protocols/services'
import { CreateConnectionClient } from '@/infra/protocols'

export class WebSocketConnectionService implements CreateConnectionService {
  constructor(private readonly createConnectionClient: CreateConnectionClient) {}

  async create() {
    await this.createConnectionClient.createConnection()
  }
}
