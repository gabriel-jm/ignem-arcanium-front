import { FindAllTorchRegistriesResult } from '@/domain/use-cases'

export type FindAllTorchRegistriesServiceResult = FindAllTorchRegistriesResult

export interface FindAllTorchRegistriesService {
  findAll(): Promise<FindAllTorchRegistriesServiceResult[]>
}
