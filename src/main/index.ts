import { configRoutes } from '@/main/config/routes'

async function init() {
  configRoutes()

  await import('@/presentation/view')
}

init()
