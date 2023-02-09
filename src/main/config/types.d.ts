declare global {
  interface DialogElement extends HTMLElement {
    showModal(): void
    show(): void
    close(): void
  }
}

export {}
