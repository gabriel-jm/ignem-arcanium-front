import { FindAllTorchRegistriesService, FindAllTorchRegistriesServiceResult } from '@/data/protocols'
import { ServiceError } from '@/infra/errors'
import { AddMessageListenerOnceStore, SendMessageStore } from '@/infra/protocols'

export class TorchRegistryService implements FindAllTorchRegistriesService {
  constructor(
    private readonly addMessageListenerOnceStore: AddMessageListenerOnceStore,
    private readonly sendMessageStore: SendMessageStore
  ) {}
  
  async findAll(): Promise<FindAllTorchRegistriesServiceResult[]> {
    return new Promise((resolve, reject) => {
      this.addMessageListenerOnceStore.once('find-all-torch-registries-response', payload => {
        if (payload.statusCode === 200) {
          resolve(payload.data as FindAllTorchRegistriesServiceResult[])
        }

        reject(new ServiceError(payload))
      })
  
      this.sendMessageStore.send({
        event: 'find-all-torch-registries'
      })
    })
  }
}
