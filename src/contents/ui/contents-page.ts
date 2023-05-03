import { Presenter } from '@/common/application/protocols/index.js'
import { t } from '@/common/ui/components/singles/translation.js'
import { breadcrumbs, containerStyles } from '@/common/ui/index.js'
import { router } from '@/main/config/routes.js'
import { css, html } from 'lithen-fns'

interface ContentPageProps {
  createContent: Presenter
}

export function contentsPage({}: ContentPageProps) {
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

        <h2 class="contents-title">
          ${t('Contents')}
        </h2>

        <div>
          <button on-click=${() => {
            router.navigate('/contents/create')
          }}>Add</button>
        </div>
      </section>
    </ignem-wrapper>
  `
}
