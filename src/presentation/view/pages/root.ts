import { IgnemElement } from '@/presentation/view'
import { router } from 'lithen-router'

class RootPage extends IgnemElement {
  constructor() {
    super()
    this.init()
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
