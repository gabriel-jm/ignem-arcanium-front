const translationCodesMap: Record<string, Record<string, string>> = {
  torches: {
    'pt-br': 'Tochas',
    'en-us': 'Torches'
  }
}

export class TranslationStore {
  static #instance: TranslationStore
  #currentLanguage = 'en-us'
  #listeners: Array<() => void> = []
  
  constructor() {
    if (!TranslationStore.#instance) {
      TranslationStore.#instance = this
    }

    return TranslationStore.#instance
  }

  get language() {
    return this.#currentLanguage
  }

  set language(newLanguage: string) {
    this.#currentLanguage = newLanguage
    this.#listeners.forEach(listener => listener())
  }

  translate(translationCode: string) {
    if (!(translationCode in translationCodesMap)) {
      return translationCode
    }

    return translationCodesMap[translationCode][this.#currentLanguage]
  }

  onLanguageChange(listener: () => void) {
    this.#listeners.push(listener)
  }
}
