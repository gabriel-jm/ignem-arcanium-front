import { ServiceError } from '@/infra/errors'
import { TorchRegistryService } from '@/infra/services'
import { mockAddMessageListenerOnceClient, mockSendMessageClient } from '@/tests/helpers'

function makeSut(
  { event, statusCode, data }: { event: string, statusCode: number, data: unknown } = {
    event: 'find-all-torch-registries-response',
    statusCode: 200,
    data: []
  }
) {
  const addMessageListenerOnceClientSpy = mockAddMessageListenerOnceClient({
    event,
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
  describe('findAll()', () => {
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
      const { sut, addMessageListenerOnceClientSpy } = makeSut({
        event: 'find-all-torch-registries-response',
        statusCode: 400,
        data
      })
  
      const promise = sut.findAll()
  
      await expect(promise).rejects.toThrowError(new ServiceError(addMessageListenerOnceClientSpy.result))
    })
  
    it('should return the data from received message', async () => {
      const { sut, addMessageListenerOnceClientSpy } = makeSut()
  
      const response = await sut.findAll()
  
      expect(response).toEqual(addMessageListenerOnceClientSpy.result.data)
    })
  })

  describe('create()', () => {
    const dummyCreateParams = {
      characterName: 'any_character_name',
      torchCount: 2,
      torchCharge: 2
    }

    it('should call AddMessageListenerOnceClient with correct values', async () => {
      const { sut, addMessageListenerOnceClientSpy } = makeSut({
        event: 'create-torch-registry-response',
        statusCode: 201,
        data: undefined
      })
  
      await sut.create(dummyCreateParams)
  
      expect(addMessageListenerOnceClientSpy.once).toHaveBeenCalledWith(
        'create-torch-registry-response',
        expect.any(Function)
      )
    })

    it('should call SendMessageClient with correct values', async () => {
      const { sut, sendMessageClientSpy } = makeSut({
        event: 'create-torch-registry-response',
        statusCode: 201,
        data: undefined
      })
  
      await sut.create(dummyCreateParams)
  
      expect(sendMessageClientSpy.send).toHaveBeenCalledWith({
        event: 'create-torch-registry',
        data: dummyCreateParams
      })
    })
  })
})
