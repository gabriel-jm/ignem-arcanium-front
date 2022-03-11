export interface CreateConnectionClientResult {
  connectionId: string
}

export interface CreateConnectionClient {
  createConnection(): Promise<CreateConnectionClientResult>
}
