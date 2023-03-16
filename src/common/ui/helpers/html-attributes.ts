export function toHtmlAttributes(record: Object) {
  const attributesText = Object.entries(record).reduce((acc, value) => {
    const [attrKey, attrValue] = value

    return acc + `${attrKey}="${attrValue}" `
  }, '')

  return attributesText.trim()
}
