import { CreateTorchRegistryServiceParams, FindAllTorchRegistriesService, FindAllTorchRegistriesServiceResult } from '@/data/protocols'
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

  async create(params: CreateTorchRegistryServiceParams) {
    const promise = new Promise(async (resolve, reject) => {
      await this.addMessageListenerOnceClient.once(
        'create-torch-registry-response',
        payload => {
          console.log(payload)

          if (payload.statusCode === 201) {
            return resolve(payload.data)
          }

          reject(new ServiceError(payload))
        }
      )
    })

    await this.sendMessageClient.send({
      event: 'create-torch-registry',
      data: {
        characterName: params.characterName,
        torchCount: params.torchCount,
        torchCharge: params.torchCharge
      }
    })

    return promise
  }
}
