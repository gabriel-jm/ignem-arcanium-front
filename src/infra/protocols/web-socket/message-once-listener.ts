export interface MessageOnceListenerPayload<T> {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: T
}

export type MessageOnceListener<T> = (payload: MessageOnceListenerPayload<T>) => void
