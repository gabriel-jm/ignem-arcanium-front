import { SelectedElement } from 'lithen-super-element'

export function lockButtonUntil(
  getButton: () => HTMLElement | SelectedElement<HTMLElement> | undefined,
  eventCallback: (e: Event) => void|Promise<void>
) {
  let isBtnBlocked = false

  return async (event: Event) => {
    event.preventDefault()

    if (isBtnBlocked) return

    const btn = getButton()

    isBtnBlocked = true
    btn?.setAttribute('disabled', '')

    await eventCallback(event)

    isBtnBlocked = false
    btn?.removeAttribute('disabled')
  }
}
