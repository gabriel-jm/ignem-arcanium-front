declare global {
  interface DialogElement extends HTMLElement {
    showModal(): void
    close(): void
  }
}

export {}
