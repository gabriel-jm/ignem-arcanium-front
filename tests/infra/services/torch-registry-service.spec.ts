import { ServiceError } from '@/infra/errors'
import { TorchRegistryService } from '@/infra/services'
import { mockAddMessageListenerOnceClient, mockSendMessageClient } from '@/tests/helpers'

function makeSut(
  { statusCode, data }: { statusCode: number, data: unknown } = {
    statusCode: 200,
    data: []
  }
) {
  const addMessageListenerOnceClientSpy = mockAddMessageListenerOnceClient({
    event: 'find-all-torch-registries-response',
    headers: {},
    statusCode,
    data
  })
  const sendMessageClientSpy = mockSendMessageClient()
  const sut = new TorchRegistryService(
    addMessageListenerOnceClientSpy,
    sendMessageClientSpy
  )

  return {
    sut,
    addMessageListenerOnceClientSpy,
    sendMessageClientSpy
  }
}

describe('TorchRegistryService', () => {
  it('should call AddMessageListenerOnceClient with correct values', async () => {
    const { sut, addMessageListenerOnceClientSpy } = makeSut()

    await sut.findAll()

    expect(addMessageListenerOnceClientSpy.once).toHaveBeenCalledWith(
      'find-all-torch-registries-response',
      expect.any(Function)
    )
  })

  it('should call SendMessageClient with correct values', async () => {
    const { sut, sendMessageClientSpy } = makeSut()

    await sut.findAll()

    expect(sendMessageClientSpy.send).toHaveBeenCalledWith({
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
    const { sut, addMessageListenerOnceClientSpy } = makeSut({ statusCode: 400, data })

    const promise = sut.findAll()

    await expect(promise).rejects.toThrowError(new ServiceError(addMessageListenerOnceClientSpy.result))
  })

  it('should return the data from received message', async () => {
    const { sut, addMessageListenerOnceClientSpy } = makeSut()

    const response = await sut.findAll()

    expect(response).toEqual(addMessageListenerOnceClientSpy.result.data)
  })
})
