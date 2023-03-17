import { Router } from '@/presentation/protocols/index.js'
import { router } from 'lithen-router'

export class LithenRouterAdapter implements Router {
  navigate(path: string): void {
    router.goTo(path)
  }
}
