import { IgnemElement } from '@/presentation/view'
import { SuperElementRenderValues } from 'lithen-super-element'

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
    return Array.from(this.childNodes) as unknown as SuperElementRenderValues
  }
}

customElements.define('ignem-wrapper', IgnemWrapper)
