import { Presenter } from '@/common/application/protocols/presenter.js'
import { t } from '@/common/ui/components/singles/translation.js'
import { CustomForm, UiNotifier, breadcrumbs, buttonStyles, containerStyles, formControlStyles, inputField, selectField, textAreaField } from '@/common/ui/index.js'
import { router } from '@/main/config/routes.js'
import { css, html } from 'lithen-fns'

interface CreateContentPageProps {
  createContent: Presenter
}

const createContentPageStyle = css`
  ${[containerStyles, buttonStyles, formControlStyles]}

  .contents-title {
    font-size: 2rem;
    padding-top: 10px;
  }
`

export function createContentsPage({ createContent }: CreateContentPageProps) {
  async function onFormSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as CustomForm
    const formValue = form.getData({
      title: 'string',
      type: 'string',
      value: 'string'
    })

    const result = await createContent.handle({
      ...formValue,
      properties: {}
    })

    form.setErrors(result.validationErrors)

    const notifier = new UiNotifier()
    notifier.notifySuccess('Success', 'Content Created')

    router.navigate('/contents')
  }

  return html`
    <ignem-wrapper css="${createContentPageStyle}">
      <ignem-header />
    
      <section class="container">
        ${breadcrumbs({
          Home: '/home',
          Contents: '/contents',
          'New Content': 'current'
        })}

        <h2>New Content</h2>

        <form is="ignem-form" on-submit=${onFormSubmit}>
          ${[
            inputField({
              name: 'title',
              label: 'Title'
            }),

            selectField({
              name: 'type',
              label: 'Type',
              options: [
                'MainPage',
                'Page',
                'Card'
              ]
            }),

            textAreaField({
              name: 'value',
              label: 'Content'
            }),

            html`
              <button class="btn">
                ${t('Create')}
              </button>
            `
          ]}
        </form>
      </section>
    </ignem-wrapper>
  `
}
