export interface CreateTorchRegistryServiceParams {
  characterName: string
  torchCount: number
  torchCharge: number
}

export interface CreateTorchRegistryService {
  create(params: CreateTorchRegistryServiceParams): Promise<string>
}
