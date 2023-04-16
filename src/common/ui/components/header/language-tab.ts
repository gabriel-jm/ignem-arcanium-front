import { css, el } from 'lithen-fns'
import { selectField } from '../index.js'
import { formControlStyles } from '../../index.js'
import { t } from '../singles/translation.js'
import { i18n } from '@/main/config/i18n.js'

const languageTabStyles = css`
  ${formControlStyles}
`

export function languageTab() {
  return el/*html*/`
    <ignem-wrapper css="${languageTabStyles}">
      <h2>${t('Language')}</h2>

      <br />

      ${selectField({
        label: t('Select your language'),
        name: 'language',
        options: [
          'en-US',
          'pt-BR'
        ],
        onChange(event: Event) {
          const target = event.target as HTMLSelectElement

          i18n.changeLanguage(target.value)
        }
      })}
    </ignem-wrapper>
  `
}
