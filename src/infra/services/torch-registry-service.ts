import { FindAllTorchRegistriesService, FindAllTorchRegistriesServiceResult } from '@/data/protocols'
import { ServiceError } from '@/infra/errors'
import { AddMessageListenerOnceClient, SendMessageClient } from '@/infra/protocols'

export class TorchRegistryService implements FindAllTorchRegistriesService {
  constructor(
    private readonly addMessageListenerOnceClient: AddMessageListenerOnceClient,
    private readonly sendMessageClient: SendMessageClient
  ) {}
  
  findAll(): Promise<FindAllTorchRegistriesServiceResult[]> {
    return new Promise(async (resolve, reject) => {
      const responseEvent = 'find-all-torch-registries-response'

      this.addMessageListenerOnceClient.once(responseEvent, payload => {
        if (payload.statusCode === 200) {
          resolve(payload.data as FindAllTorchRegistriesServiceResult[])
        }

        reject(new ServiceError(payload))
      })
        .then(
          async () => await this.sendMessageClient.send({
            event: 'find-all-torch-registries'
          }),
          reject
        )
    })
  }
}
