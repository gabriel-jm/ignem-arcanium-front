import { css, ElementRef, html } from 'lithen-fns'

export interface ConfirmDialogProps {
  ref: ElementRef<DialogElement>
  message: string
  onConfirm?(): Promise<void> | void
  onCancel?(): Promise<void> | void
}

export const confirmDialogStyles = css`
  .confirm-dialog {
    margin: auto;
    margin-top: 5%;
    border: 1px solid var(--container-border-color);
    border-radius: 5px;
    background-color: var(--bg-primary);
    box-shadow: 0 3px 5px #121212;
  }

  confirm-dialog::backdrop {
    background-color: #000;
  }

  .confirm-dialog[open] {
    animation: show-dialog 300ms ease-out;
  }

  .confirm-dialog p {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--font-color);
    padding: 30px 60px;
  }

  .confirm-dialog button {
    width: 50%;
    background-color: transparent;
    border: 0;
    border-top: 1px solid var(--container-border-color);
    font-size: 1rem;
    color: var(--font-color);
    cursor: pointer;
    padding: 14px 0;
  }

  .confirm-dialog button:first-of-type {
    border-right: 1px solid var(--container-border-color);
  }

  .confirm-dialog.close {
    animation: close-dialog 200ms ease-in;
  }

  @keyframes show-dialog {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes close-dialog {
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
`

export function confirmDialog(props: ConfirmDialogProps) {
  const { ref, message, onConfirm, onCancel } = props

  function onAnimationEnd(event: AnimationEventInit) {
    if (event.animationName === 'close-dialog') {
      ref.el?.close()
      ref.el?.classList.remove('close')
    }
  }

  function onConfirmDialog() {
    !ref.el?.classList.contains('close')
      && ref.el?.classList.add('close')

    onConfirm?.()
  }
  
  function onCancelDialog() {
    !ref.el?.classList.contains('close')
      && ref.el?.classList.add('close')

    onCancel?.()
  }

  return html`
    <dialog
      ref=${ref}
      class="confirm-dialog"
      on-animationend=${onAnimationEnd}
    >
      <p>${message}</p>
      <button on-click=${onConfirmDialog}>
        OK
      </button>
      <button on-click=${onCancelDialog}>
        Cancel
      </button>
    </dialog>
  `
}
