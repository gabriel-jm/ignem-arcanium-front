import '@/ui/view'
import { router } from 'lithen-router'
import { css, html, raw } from 'lithen-tag-functions'

type BreadcrumbsProps = Record<string, string>

export function breadcrumbs(props: BreadcrumbsProps) {
  const breadcrumbsStyles = css`
    a, span {
      color: var(--sub-font-color);
    }

    a {
      cursor: pointer;
    }

    a:hover {
      text-decoration: underline;
    }

    span {
      cursor: default;
    }

    span:not(.current) {
      margin: 0 16px;
    }
  `

  function onClick(path: string) {
    return () => router.goTo(path)
  }
  
  return html`
    <ignem-wrapper css="${breadcrumbsStyles}">
      ${Object.entries(props).map(([name, path]) => {
        if (path === 'current') {
          return raw`<span class="current">${name}</span>`
        }

        return html`
          <a on-click=${onClick(path)}>${name}</a>
          <span>/</span>
        `
      })}
    </ignem-wrapper>
  `
}
