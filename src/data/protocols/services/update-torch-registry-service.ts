export interface UpdateTorchRegistryServiceParams {
  id: string
  torchCharge?: string | number
  isLit?: boolean
}

export interface UpdateTorchRegistryService {
  update(params: UpdateTorchRegistryServiceParams): Promise<void>
}
