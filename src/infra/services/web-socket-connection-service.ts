import { CreateConnectionService } from '@/data/protocols'
import { CreateConnectionClient } from '@/infra/protocols'

export class WebSocketConnectionService implements CreateConnectionService {
  constructor(private readonly createConnectionClient: CreateConnectionClient) {}

  async create(): Promise<string> {
    await this.createConnectionClient.create()

    return ''
  }
}
