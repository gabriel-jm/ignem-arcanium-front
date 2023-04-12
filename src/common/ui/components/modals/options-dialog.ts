import { ElementRef, css, html } from 'lithen-fns'

export interface OptionsDialogProps {
  ref: ElementRef<DialogElement>
  options: Record<string, { onClick: Function }>
}

const optionsDialogStyles = css`
  dialog {
    position: absolute;
    top: 75%;
    left: calc(25% - 60px);
    background-color: var(--primary-bright);
    padding: 10px 0px;
    color: var(--font-color);
    border: 0;
    border-radius: 4px;
    direction: rtl;
    transition: all 200ms ease;
    box-shadow: 3px 2px 2px var(--primary);
  }

  dialog div {
    min-width: 120px;
    padding: 8px 16px;
    direction: ltr;
    cursor: pointer;
    transition: all 200ms ease-out;
  }

  dialog div:hover {
    background-color: var(--secondary);
  }
`

export function optionsDialog({ ref, options }: OptionsDialogProps) {
  return html`
    <ignem-wrapper css="${optionsDialogStyles}">
      <dialog
        tabindex="0"
        ref=${ref}
        on-blur=${() => ref.el?.close()}
      >
        ${Object
          .entries(options)
          .map(([key, value]) => html`
            <div on-click=${value.onClick}>
              ${key}
            </div>
          `)
        }
      </dialog>
    </ignem-wrapper>
  `
}
