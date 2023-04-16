import i18next, { i18n as i18nType } from 'i18next'
import ptBrTranslations from './pt-br-translations.js'

const i18n = i18next as unknown as i18nType

export type TranslationKeys = keyof typeof ptBrTranslations['translation']

export { i18n }

export function initI18Next() {
  i18next.init({
    lng: 'en',
    resources: {
      pt: ptBrTranslations
    }
  })
}
