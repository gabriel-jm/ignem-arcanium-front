import { TranslationKeys, i18n } from '@/main/config/i18n.js'

export function t(translationKeys: TranslationKeys | TranslationKeys[]) {
  const keys = Array.isArray(translationKeys) ? translationKeys : [translationKeys]
  const translation = getTranslation(keys)

  if (!translation) {
    console.error(`No translation found for "${keys}"`)
  }

  const textNode = new Text(translation)

  i18n.on('languageChanged', () => {
    textNode.data = getTranslation(keys)
  })

  return textNode
}

function getTranslation(keys: string[]) {
  return keys.map(key => {
    return i18n.t(key) ?? key
  }).join(' ')

}
