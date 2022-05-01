import { FindAllTorchRegistriesResult } from '@/domain/protocols/use-cases'

export type FindAllTorchRegistriesServiceResult = FindAllTorchRegistriesResult

export interface FindAllTorchRegistriesService {
  findAll(): Promise<FindAllTorchRegistriesServiceResult[]>
}
