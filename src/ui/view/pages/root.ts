import { IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'

type ElementFactory = () => Element | null

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
    const componentFactory = router.matchRoute() as ElementFactory
    const component = componentFactory()

    if (!component) return

    this.root.firstChild?.remove()
    this.root.appendChild(component)
  }
}

customElements.define('ignem-root', IgnemRoot)
