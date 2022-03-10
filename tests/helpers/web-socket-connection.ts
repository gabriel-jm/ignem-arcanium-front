import { MessageOnceListenerPayload } from '@/infra/protocols'

export function mockSendMessageClient() {
  return {
    send: vi.fn()
  }
}

export function mockAddMessageListenerOnceClient(event: MessageOnceListenerPayload) {
  return {
    result: event,
    once: vi.fn((_eventName, listener) => {
      listener(event)
    })
  }
}

export function mockCreateConnectionService() {
  return {
    result: 'any_connection_id',
    create: vi.fn(() => Promise.resolve('any_connection_id'))
  }
}

export function mockCreateConnectionClient() {
  const result = {
    connectionId: 'any_connection_id'
  }
  
  return {
    result,
    create: vi.fn(() => Promise.resolve(result))
  }
}
