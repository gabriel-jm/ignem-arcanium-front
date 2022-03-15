import { IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'

export class RootPage extends IgnemElement {
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
    const component = router.matchRoute() as HTMLElement

    firstElement
      ? this.root.replaceChild(component, firstElement)
      : this.root.appendChild(component)
  }
}

customElements.define('ignem-root', RootPage)
