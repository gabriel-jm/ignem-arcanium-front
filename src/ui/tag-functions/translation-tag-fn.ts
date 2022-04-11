import { TranslationStore } from '@/ui/stores'

type TranslationTagFnStrings = string | string[] | TemplateStringsArray

export function t(strings: TranslationTagFnStrings, ...values: any[]): Node {
  const stringsArray = [strings].flat()

  const translationCode = stringsArray.reduce((acc, str, index) => {
    return acc + str + (values[index] || '')
  }, '')

  const translationStore = new TranslationStore()

  const text = translationStore.translate(translationCode)
  const textNode = document.createTextNode(text)

  translationStore.onLanguageChange(() => {
    const translatedText = translationStore.translate(translationCode)
    textNode.textContent = translatedText
  })

  return textNode
}
