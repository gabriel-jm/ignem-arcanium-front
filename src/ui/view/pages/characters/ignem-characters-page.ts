import '@/ui/view'
import './modal/ignem-character-modal'
import { Presenter } from '@/presentation/protocols'
import { containerStyles } from '@/ui/view'
import { breadcrumbs, loadingIcon } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { SuccessNotifier } from '@/ui/protocols'
import { IgnemCharacterModalElement } from './modal/ignem-character-modal'
import { characterCard, characterCardStyles } from './card/character-card'

interface Character {
  id: string
  name: string
  icon: string
  level: number
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charism: number
}

export class IgnemCharactersPage extends IgnemElement {
  #findAllCharactersPresenter: Presenter
  #createCharacterPresenter: Presenter
  #successNotifier: SuccessNotifier
  
  constructor(
    findAllCharactersPresenter: Presenter,
    createCharacterPresenter: Presenter,
    successNotifier: SuccessNotifier
  ) {
    super()
    this.#findAllCharactersPresenter = findAllCharactersPresenter
    this.#createCharacterPresenter = createCharacterPresenter
    this.#successNotifier = successNotifier

    this.applyRender()
    this.init()
  }

  async init() {
    const openCharacterModal = () => {
      const characterModal = this.select<IgnemCharacterModalElement>('ignem-character-modal')

      characterModal?.dialog.showModal()
    }

    const result = await this.#findAllCharactersPresenter.handle<Character[]>()

    this.select('.loading-icon')?.remove()

    if (result.ok) {
      const charactersList = result.data
        .map(characterCard)
        .concat(html`
          <button
            class="new-btn"
            on-click=${openCharacterModal}
          >
            &plus; New
          </button>
        `)       

      this.select('.characters-list')?.append(...charactersList)
    }
  }

  #onCharacterCreated = async (event: CustomEvent) => {
    const modal = event.target as IgnemCharacterModalElement
    const formData = event.detail

    const result = await this.#createCharacterPresenter.handle(formData)

    modal.setErrors(result.validationErrors)

    if (result.ok) {
      modal.dialog.close()
      modal.form.reset()
      this.select('.characters-list')?.insertBefore(
        characterCard(result.data),
        this.select('button')!
      )
      this.#successNotifier.notifySuccess(
        'Created',
        'Character created with success'
      )
    }
  }

  styling() {
    return css`
      ${[containerStyles, characterCardStyles]}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      .characters-list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .new-btn {
        min-height: 114px;
        min-width: 250px;
        max-width: 425px;
        width: 100%;
        flex-shrink: 0;
        border: 1px solid var(--container-border-color);
        background-color: transparent;
        color: var(--container-border-color);
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 250ms;
      }

      .new-btn:hover, .new-btn:focus {
        box-shadow: 0 0 1px 2px var(--container-border-color);
        color: var(--sub-font-color);
      }

      @media only screen and (max-width: 1024px) {
        .characters-list {
          justify-content: center;
        }
      }
    `
  }
  
  render() {
    const pathsRecord = {
      Home: '/home',
      Characters: 'current'
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(pathsRecord)}

        <h2 class="characters-title">Characters</h2>

        <div class="characters-list">
          ${loadingIcon()}
        </div>

        <ignem-character-modal on-character-created=${this.#onCharacterCreated} />
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)
