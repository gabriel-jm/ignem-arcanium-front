import '@/common/ui/styles/index.js'
import { router } from '@/main/config/routes.js'
import { css, html, el } from 'lithen-fns'

type BreadcrumbsProps = Record<string, string>

export function breadcrumbs(props: BreadcrumbsProps) {
  const breadcrumbsStyles = css`
    span {
      color: var(--sub-font-color);
      cursor: default;
    }

    .link {
      cursor: pointer;
    }

    .link:hover {
      text-decoration: underline;
    }

    .slash {
      margin: 0 16px;
    }
  `

  function onClick(path: string) {
    return () => router.navigate(path)
  }
  
  return html`
    <ignem-wrapper css="${breadcrumbsStyles}">
      ${Object.entries(props).map(([name, path]) => {
        if (path === 'current') {
          return el/*html*/`<span class="current">${name}</span>`
        }

        return html`
          <span
            class="link"
            on-click=${onClick(path)}
          >
            ${name}
          </span>
          <span class="slash">/</span>
        `
      })}
    </ignem-wrapper>
  `
}
