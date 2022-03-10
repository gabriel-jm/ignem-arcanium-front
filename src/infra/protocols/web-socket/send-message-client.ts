export interface SendMessageStoreParams {
  event: string
  headers?: Record<string, unknown>
  data?: any
}

export interface SendMessageClient {
  send(params: SendMessageStoreParams): void
}
