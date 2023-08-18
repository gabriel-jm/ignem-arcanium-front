export interface Content {
  id: string
  type: string
  icon?: string
  cover?: string
  title: string
  value: string
  properties: Record<string, unknown>
}
