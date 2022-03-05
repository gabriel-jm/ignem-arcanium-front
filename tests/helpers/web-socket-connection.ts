import { MessageOnceListenerPayload } from '@/infra/protocols'

export function mockSendMessageStore() {
  return {
    send: jest.fn()
  }
}

export function mockAddMessageListenerOnceStore(event: MessageOnceListenerPayload) {
  return {
    result: event,
    once: jest.fn((_eventName, listener) => {
      listener(event)
    })
  }
}
