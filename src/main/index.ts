import '@/main/config/routes.js'
import { sharedStyles } from '@/common/ui/styles/index.js'
import { initI18Next } from './config/i18n.js'

function init() {
  initI18Next()
  
  import('@/common/ui/index.js')
  import('@/common/ui/styles/index.js')
  
  sharedStyles()
}

init()
