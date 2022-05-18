export interface FindAllTorchRegistriesResult {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export interface FindAllTorchRegistries {
  findAll(): Promise<FindAllTorchRegistriesResult[]>
}
