import { ServiceError } from '@/infra/errors'
import { TorchRegistryService } from '@/infra/services'
import { mockAddMessageListenerOnceStore, mockSendMessageStore } from '@/tests/helpers'

function makeSut(
  { statusCode, data }: { statusCode: number, data: unknown } = {
    statusCode: 200,
    data: []
  }
) {
  const addMessageListenerOnceStoreSpy = mockAddMessageListenerOnceStore({
    event: 'find-all-torch-registries-response',
    headers: {},
    statusCode,
    data
  })
  const sendMessageStoreSpy = mockSendMessageStore()
  const sut = new TorchRegistryService(
    addMessageListenerOnceStoreSpy,
    sendMessageStoreSpy
  )

  return {
    sut,
    addMessageListenerOnceStoreSpy,
    sendMessageStoreSpy
  }
}

describe('TorchRegistryService', () => {
  it('should call AddMessageListenerOnceStore with correct values', async () => {
    const { sut, addMessageListenerOnceStoreSpy } = makeSut()

    await sut.findAll()

    expect(addMessageListenerOnceStoreSpy.once).toHaveBeenCalledWith(
      'find-all-torch-registries-response',
      expect.any(Function)
    )
  })

  it('should call SendMessageStore with correct values', async () => {
    const { sut, sendMessageStoreSpy } = makeSut()

    await sut.findAll()

    expect(sendMessageStoreSpy.send).toHaveBeenCalledWith({
      event: 'find-all-torch-registries'
    })
  })

  it('should throw a ServiceError if statusCode is different than 200', async () => {
    const data = {
      error: {
        name: 'DatabaseError',
        details: [
          'Some operation has not been succeeded, please try again later'
        ]
      }
    }
    const { sut, addMessageListenerOnceStoreSpy } = makeSut({ statusCode: 400, data })

    const promise = sut.findAll()

    await expect(promise).rejects.toThrowError(new ServiceError(addMessageListenerOnceStoreSpy.result))
  })

  it('should return the data from received message', async () => {
    const { sut, addMessageListenerOnceStoreSpy } = makeSut()

    const response = await sut.findAll()

    expect(response).toEqual(addMessageListenerOnceStoreSpy.result.data)
  })
})
