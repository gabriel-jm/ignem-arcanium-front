import { CreateConnectionService } from '@/domain/protocols/services/index.js'
import { CreateConnectionClient } from '../protocols/index.js'

export class WebSocketConnectionService implements CreateConnectionService {
  constructor(private readonly createConnectionClient: CreateConnectionClient) {}

  async create() {
    await this.createConnectionClient.createConnection()
  }
}
