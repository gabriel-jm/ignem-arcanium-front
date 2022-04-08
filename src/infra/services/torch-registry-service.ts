import { CreateTorchRegistryServiceParams, FindAllTorchRegistriesService, FindAllTorchRegistriesServiceResult, UpdateTorchRegistryServiceParams } from '@/data/protocols'
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
          if (payload.statusCode < 400) {
            resolve(payload.data as FindAllTorchRegistriesServiceResult[])
          }

          reject(new ServiceError(payload, 'Internal error on searching for torch registries'))
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
            if (payload.statusCode < 400) {
              return resolve(payload.data.id)
            }
  
            reject(
              new ServiceError(
                payload,
                'Internal error on creating a torch registry'
              )
            )
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

  update(params: UpdateTorchRegistryServiceParams) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.addMessageListenerOnceClient.once(
          'update-torch-registry-response',
          payload => {
            if (payload.statusCode < 400) {
              resolve()
            }

            reject(
              new ServiceError(
                payload,
                'Internal error on update torch registry'
              )
            )
          }
        )

        await this.sendMessageClient.send({
          event: 'update-torch-registry',
          data: {
            id: params.id,
            ...params.torchCharge && { torchCharge: params.torchCharge },
            ...params.isLit && { isLit: params.isLit }
          }
        })
      } catch(error) {
        reject(error)
      }
    })
  }
}
