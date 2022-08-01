export interface Item {
  id: string
  name: string
  type: string
  description: string
  rarity: string
}

export type ListAllInitialItemsResult = Item[]

export interface ListAllInitialItems {
  listAll(): Promise<ListAllInitialItemsResult>
}
