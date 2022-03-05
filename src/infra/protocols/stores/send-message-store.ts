export interface SendMessageStoreParams {
  event: string
  headers?: Record<string, unknown>
  data?: any
}

export interface SendMessageStore {
  send(params: SendMessageStoreParams): void
}
