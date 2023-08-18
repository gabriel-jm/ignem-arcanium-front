import { css, ElementRef, html } from 'lithen-fns'
import { t } from '../singles/translation.js'
import { TranslationKeys } from '@/main/config/i18n.js'

export interface ConfirmDialogProps {
  ref: ElementRef<DialogElement>
  message: string
  onConfirm?(): Promise<void> | void
  onCancel?(): Promise<void> | void
  onBlur?(): Promise<void> | void
}

export const confirmDialogStyles = css`
  .confirm-dialog {
    margin: auto;
    margin-top: 5%;
    border: 1px solid var(--container-border-color);
    border-radius: 5px;
    background-color: var(--bg-primary);
    box-shadow: 0 3px 5px #121212;
    z-index: 10;
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
    animation: close-dialog 180ms ease-in;
  }

  @keyframes show-dialog {
    from {
      transform: translateY(-30px);
      opacity: 0;
      pointer-events: none;
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
  const { ref, message, onConfirm, onCancel, onBlur } = props

  function onAnimationEnd(event: AnimationEventInit) {
    if (event.animationName === 'close-dialog') {
      ref.el?.classList.remove('close')
      ref.el?.close()
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

  function onBlurDialog() {
    !ref.el?.classList.contains('close')
      && ref.el?.classList.add('close')

    onBlur?.()
  }

  return html`
    <dialog
      ref=${ref}
      tabindex="-1"
      class="confirm-dialog"
      on-animationend=${onAnimationEnd}
      on-blur=${onBlurDialog}
    >
      <p>${t(message as TranslationKeys)}</p>
      <button on-click=${onConfirmDialog}>
        OK
      </button>
      <button on-click=${onCancelDialog}>
        ${t('Cancel')}
      </button>
    </dialog>
  `
}
