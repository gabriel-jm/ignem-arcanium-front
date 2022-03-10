export interface CreateConnectionClientResult {
  connectionId: string
}

export interface CreateConnectionClient {
  create(): Promise<CreateConnectionClientResult>
}
