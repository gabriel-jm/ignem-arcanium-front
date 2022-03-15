import { configRoutes } from '@/main/config/routes'
import { sharedStyles } from '@/ui/view'

async function init() {
  sharedStyles()
  configRoutes()

  await import('@/ui/view')
}

init()
