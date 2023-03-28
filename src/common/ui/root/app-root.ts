import { router } from '@/main/config/routes.js'
import { IgnemElement } from '@/common/ui/ignem-element.js'

export class AppRoot extends IgnemElement {
  constructor() {
    super({ shadowRoot: false })
    window.onload = () => this.init()
  }

  init() {
    router.onNavigate(this.reRender.bind(this))
    this.reRender()
  }

  async reRender() {
    const routeData = router.matchRoute()
    const component = await routeData.value()

    if (!component) return

    this.replaceChildren(component)
  }
}

customElements.define('ignem-root', AppRoot)
