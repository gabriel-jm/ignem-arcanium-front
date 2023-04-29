import { t } from '@/common/ui/components/singles/translation.js'
import { breadcrumbs, containerStyles } from '@/common/ui/index.js'
import { css, html } from 'lithen-fns'

export function contentsPage() {
  const contentPageStyle = css`
    ${[containerStyles]}

    .contents-title {
      font-size: 2rem;
      padding-top: 10px;
    }
  `

  return html`
    <ignem-wrapper css="${contentPageStyle}">
      <ignem-header />

      <section class="container">
        ${breadcrumbs({
          Home: '/home',
          Contents: 'current'
        })}

        <h2 class="contents-title">${t('Contents')}</h2>
      </section>
    </ignem-wrapper>
  `
}
