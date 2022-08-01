import '../../components/header/header'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles } from '@/ui/view/styles'
import { breadcrumbs } from '@/ui/view/components'

export class IgnemCreateCharacterPage extends IgnemElement {
  styling() {
    return css`
      ${containerStyles}
    `
  }
  
  render() {
    const breadcrumbProps = {
      Home: '/home',
      Characters: '/characters',
      'Create Character': 'current'
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1>Create Character</h1>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
