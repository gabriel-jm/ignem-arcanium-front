import { IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'
import { ElementFactory } from 'lithen-router/build/routing/interfaces/route-definer'

export class IgnemRoot extends IgnemElement {
  constructor() {
    super()
    window.onload = () => this.init()
  }

  init() {
    router.onNavigate(this.reRender.bind(this))
    this.reRender()
  }

  reRender() {
    const firstElement = this.root.firstChild
    const componentFactory = router.matchRoute() as ElementFactory
    const component = componentFactory()

    firstElement?.remove()
    this.root.appendChild(component)
  }
}

customElements.define('ignem-root', IgnemRoot)
