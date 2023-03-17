import { configRoutes } from '@/main/config/routes.js'
import { sharedStyles } from '@/ui/view/styles/index.js'

function init() {
  import('@/ui/view/index.js')
  
  sharedStyles()
  configRoutes()
}

init()
