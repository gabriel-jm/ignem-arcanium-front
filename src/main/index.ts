import { configRoutes } from '@/main/config/routes'
import { sharedStyles } from '@/ui/view'

function init() {
  import('@/ui/view')
  
  sharedStyles()
  configRoutes()
}

init()
