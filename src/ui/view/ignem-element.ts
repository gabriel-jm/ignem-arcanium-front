import { SuperElement } from 'lithen-super-element'

export class IgnemElement extends SuperElement {
  setAttributes(attributesRecord: Record<string, string | number | boolean>) {
    Object.entries(attributesRecord).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        value && this.setAttribute(key, '')
        return
      }

      this.setAttribute(key, String(value))
    })
  }
}
