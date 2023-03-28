export interface SendMessageClientParams {
  event: string
  responseEvent: string
  errorMessage?: string
  headers?: Record<string, unknown>
  data?: any
}

export interface SendMessageClientResult<T> {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: T
}

export interface SendMessageClient {
  sendMessage<T = unknown>(params: SendMessageClientParams): Promise<SendMessageClientResult<T>>
}
