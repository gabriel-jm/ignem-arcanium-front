export interface CreateTorchRegistryParams {
  characterName: string
  torchCount: number
  torchCharge: number
}

export interface CreateTorchRegistry {
  create(params: CreateTorchRegistryParams): Promise<string>
}