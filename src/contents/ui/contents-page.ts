import { Presenter } from '@/common/application/protocols/index.js'
import { t } from '@/common/ui/components/singles/translation.js'
import { breadcrumbs, buttonStyles, confirmDialogStyles, containerStyles } from '@/common/ui/index.js'
import { router } from '@/main/config/routes.js'
import { css, html, shell, signal } from 'lithen-fns'
import { Content } from '../application/index.js'
import { mainPageCard } from './components/main-page-card.js'

interface ContentsPageProps {
  findAll: Presenter
  delete: Presenter
}

type ContentsSignal = {
  loading: boolean
  data: Content[]
}

const contentPageStyle = css`
  ${[containerStyles, buttonStyles, confirmDialogStyles]}

  .contents-title {
    font-size: 2rem;
    padding-top: 10px;
  }

  .pages-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 16px 0;
  }
`

export function contentsPage({ findAll }: ContentsPageProps) {
  const contents = signal<ContentsSignal>({
    loading: true,
    data: []
  })

  findAll.handle()
    .then(result => {
      if (result.ok) {
        contents.set({
          loading: false,
          data: result.data
        })
      }
    })

  function onConfirmDelete(itemId: string) {
    return async (event: Event) => {
      // const result = await deleteContent.handle({ id: itemId })

      // if (result.ok) {
      //   const target = event.target

      // }
      console.log(event.target, itemId)
    }
  }

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
          <button class="btn" on-click=${() => {
            router.navigate('/contents/create')
          }}>${t('Create')}</button>
        </div>

        ${shell(contents, ({ loading, data }) => {
          if (loading) {
            return html`
              <p>${t('Loading')}...</p>
            `
          }

          if (!data.length) {
            return html `
              <p>No contents found</p>
            `
          }

          return html`
            <ul class="pages-list">
              ${data.map(value => html`
                <li>
                  ${mainPageCard({
                    title: value.title,
                    cover: value.cover,
                    onConfirmDelete: onConfirmDelete(value.id)
                  })}
                </li>
              `)}
            </ul>
          `
        })}
      </section>
    </ignem-wrapper>
  `
}
