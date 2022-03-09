import { IgnemElement } from '@/presentation/view'

/**
 * @attr css
 */
export class IgnemWrapper extends IgnemElement {
  constructor() {
    super()
    this.removeAttribute('css')
  }

  styling() {
    return this.getAttribute('css') || ''
  }

  render() {
    return this.childNodes
  }
}

customElements.define('ignem-wrapper', IgnemWrapper)
