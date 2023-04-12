declare global {
  interface DialogElement extends HTMLElement {
    readonly open: boolean
    
    showModal(): void
    show(): void
    close(): void
  }
}

export {}
