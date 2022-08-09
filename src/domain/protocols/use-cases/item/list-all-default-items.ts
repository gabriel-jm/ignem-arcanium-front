export interface Item {
  id: string
  name: string
  type: string
  description: string
  rarity: string
  weight: number
}

export type ListAllDefaultItemsResult = Item[]

export interface ListAllDefaultItems {
  listAll(): Promise<ListAllDefaultItemsResult>
}
