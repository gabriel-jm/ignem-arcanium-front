import { confirmDialog, confirmDialogStyles, trashIcon } from '@/common/ui/index.js'
import { css, html, ref } from 'lithen-fns'

interface MainPageCardProps {
  cover?: string
  title: string
  onConfirmDelete?(...args: unknown[]): Promise<void> | void
}

export function mainPageCard(props: MainPageCardProps) {
  const { title, cover, onConfirmDelete } = props

  const mainPageCardStyles = css`
    ${confirmDialogStyles}

    :host {
      display: block;
      background: url('${cover}');
      background-position: top;
      background-size: cover;
      border-radius: 4px;
      height: 140px;
      cursor: pointer;
      box-shadow: 0 1px 3px var(--black-800);
    }

    .gradient-layer {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: end;
      padding: 14px 24px;
      background: linear-gradient(
        150deg,
        transparent 40%,
        var(--black-800)
      );
    }

    .gradient-layer:hover .trash-icon {
      opacity: 1;
    }

    .trash-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 12px;
      color: var(--white-500);
      border-radius: 50px;
      transition:
        all 200ms 150ms ease-in-out,
        background 250ms ease-out
      ;
      opacity: 0;
    }

    .trash-icon:hover {
      color: var(--white-900);
    }

    .trash-icon:active {
      background-color: #aaa6;
    }

    .confirm-dialog {
      position: absolute;
      top: -25%;
      right: -60%;
    }

    h3 {
      font-size: 1.8rem;
      text-shadow: 0 1px 2px var(--black-900);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `

  const dialogRef = ref<HTMLDialogElement>()
  
  return html`
    <ignem-wrapper css="${mainPageCardStyles}">
      <div class="gradient-layer">
        <div on-click=${() => {
          dialogRef.el?.focus()
          dialogRef.el?.show()
        }}>
          ${trashIcon()}
        </div>
        <h3>${title}</h3>
        ${confirmDialog({
          ref: dialogRef,
          message: `Delete '${title}'?`,
          onConfirm: onConfirmDelete
        })}
      </div>
    </ignem-wrapper>
  `
}
