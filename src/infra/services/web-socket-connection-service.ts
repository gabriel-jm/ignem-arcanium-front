import { CreateConnectionService } from '@/data/protocols'
import { CreateConnectionClient } from '@/infra/protocols'

export class WebSocketConnectionService implements CreateConnectionService {
  constructor(private readonly createConnectionClient: CreateConnectionClient) {}

  async create(): Promise<string> {
    const connection = await this.createConnectionClient.createConnection()

    return connection.connectionId
  }
}
