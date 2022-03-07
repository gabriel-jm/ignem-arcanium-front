import { configRoutes } from '@/main/config/routes'
import { sharedStyles } from '@/presentation/view'

async function init() {
  sharedStyles()
  configRoutes()

  await import('@/presentation/view')
}

init()
