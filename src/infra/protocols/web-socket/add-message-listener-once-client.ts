export interface MessageOnceListenerPayload<T> {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: T
}

export type MessageOnceListener<T> = (payload: MessageOnceListenerPayload<T>) => void

export interface AddMessageListenerOnceClient {
  once<T = unknown>(
    eventName: string,
    listener: MessageOnceListener<T>
  ): Promise<void>
}
