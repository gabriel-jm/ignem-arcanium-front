import { WsServiceError } from '@/infra/errors'
import { TorchRegistryService } from '@/infra/services'
import { mockReceivedMessageResult, mockSendMessageClient } from '@/tests/helpers'

function makeSut() {
  const sendMessageClientSpy = mockSendMessageClient()
  const sut = new TorchRegistryService(
    sendMessageClientSpy
  )

  return {
    sut,
    sendMessageClientSpy
  }
}

describe('TorchRegistryService', () => {
  describe('findAll()', () => {
    it('should call SendMessageClient with correct values', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
  
      await sut.findAll()
  
      expect(sendMessageClientSpy.sendMessage).toHaveBeenCalledWith({
        event: 'find-all-torch-registries',
        responseEvent: 'find-all-torch-registries-response',
        errorMessage: 'Internal error on searching for torch registries'
      })
    })
  
    it('should throw a ServiceError if SendMessageClient throws', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
      const serviceError = new WsServiceError(mockReceivedMessageResult(), 'Internal error')
      sendMessageClientSpy.sendMessage.mockImplementationOnce(() => {
        throw serviceError
      })
  
      const promise = sut.findAll()
  
      await expect(promise).rejects.toThrowError(serviceError)
    })
  
    it('should return the data from received message', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
  
      const response = await sut.findAll()
  
      expect(response).toEqual(sendMessageClientSpy.result.data)
    })
  })

  describe('create()', () => {
    const dummyCreateParams = {
      characterName: 'any_character_name',
      torchCount: 2,
      torchCharge: 2
    }

    it('should call SendMessageClient with correct values', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
  
      await sut.create(dummyCreateParams)
  
      expect(sendMessageClientSpy.sendMessage).toHaveBeenCalledWith({
        event: 'create-torch-registry',
        responseEvent: 'create-torch-registry-response',
        errorMessage: 'Internal error on creating a torch registry',
        data: {
          characterName: dummyCreateParams.characterName,
          torchCount: dummyCreateParams.torchCount,
          torchCharge: dummyCreateParams.torchCharge,
          isLit: false
        }
      })
    })

    it('should throw a ServiceError if SendMessageClient throws', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
      const serviceError = new WsServiceError(mockReceivedMessageResult(), 'Internal error')
      sendMessageClientSpy.sendMessage.mockImplementationOnce(() => {
        throw serviceError
      })
  
      const promise = sut.create(dummyCreateParams)
  
      await expect(promise).rejects.toThrowError(serviceError)
    })
  
    it('should return the data from received message', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
      sendMessageClientSpy.sendMessage.mockResolvedValueOnce(
        mockReceivedMessageResult({ id: 'any_id' })
      )
  
      const response = await sut.create(dummyCreateParams)
  
      expect(response).toBe('any_id')
    })
  })

  describe('update()', () => {
    const dummyUpdateParams = {
      id: 'any_id',
      torchCharge: 2,
      isLit: true
    }

    it('should call SendMessageClient with correct values', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
  
      await sut.update(dummyUpdateParams)
  
      expect(sendMessageClientSpy.sendMessage).toHaveBeenCalledWith({
        event: 'update-torch-registry',
        responseEvent: 'update-torch-registry-response',
        errorMessage: 'Internal error on update torch registry',
        data: {
          id: dummyUpdateParams.id,
          torchCharge: dummyUpdateParams.torchCharge,
          isLit: dummyUpdateParams.isLit
        }
      })
    })

    it('should throw a ServiceError if SendMessageClient throws', async () => {
      const { sut, sendMessageClientSpy } = makeSut()
      const serviceError = new WsServiceError(mockReceivedMessageResult(), 'Internal error')
      sendMessageClientSpy.sendMessage.mockImplementationOnce(() => {
        throw serviceError
      })
  
      const promise = sut.update(dummyUpdateParams)
  
      await expect(promise).rejects.toThrowError(serviceError)
    })
  })
})
