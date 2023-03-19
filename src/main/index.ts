import '@/main/config/routes.js'
import { sharedStyles } from '@/ui/view/styles/index.js'

function init() {
  import('@/common/ui/index.js')
  import('@/ui/view/index.js')
  
  sharedStyles()
}

init()
