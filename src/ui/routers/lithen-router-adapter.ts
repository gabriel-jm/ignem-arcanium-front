import { Router } from '@/presentation/protocols/index.js'
import { router } from '@/main/config/routes.js'

export class LithenRouterAdapter implements Router {
  navigate(path: string): void {
    router.navigate(path)
  }
}
