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
      try {
        const responseEvent = 'find-all-torch-registries-response'

        await this.addMessageListenerOnceClient.once(responseEvent, payload => {
          if (payload.statusCode === 200) {
            resolve(payload.data as FindAllTorchRegistriesServiceResult[])
          }

          reject(new ServiceError(payload))
        })

        await this.sendMessageClient.send({
          event: 'find-all-torch-registries'
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async create(params: CreateTorchRegistryServiceParams): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.addMessageListenerOnceClient.once<Record<'id', string>>(
          'create-torch-registry-response',
          payload => {
            if (payload.statusCode === 201) {
              return resolve(payload.data.id)
            }
  
            reject(new ServiceError(payload))
          }
        )
  
        await this.sendMessageClient.send({
          event: 'create-torch-registry',
          data: {
            characterName: params.characterName,
            torchCount: params.torchCount,
            torchCharge: params.torchCharge,
            isLit: false
          }
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}
