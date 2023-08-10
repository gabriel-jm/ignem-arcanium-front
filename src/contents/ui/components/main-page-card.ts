import { css, html } from 'lithen-fns'

interface MainPageCardProps {
  cover?: string
  title: string
}

export function mainPageCard({ title, cover }: MainPageCardProps) {
  const mainPageCardStyles = css`
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

    div {
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

    h3 {
      font-size: 1.8rem;
      text-shadow: 0 1px 2px var(--black-900);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `
  
  return html`
    <ignem-wrapper css="${mainPageCardStyles}">
      <div>
        <h3>${title}</h3>
      </div>
    </ignem-wrapper>
  `
}
