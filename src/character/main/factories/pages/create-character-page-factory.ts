import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { makeFetchHTTPClient } from '@/common/main/factories/clients/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { ListAllDefaultItemsPresenter } from '@/item/application/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { ItemsStore } from '@/item/ui/store/items-store.js'
import { IgnemCreateCharacterPage } from '@/character/ui/pages/index.js'
import { makeCharacterService } from '@/character/main/factories/services/index.js'
import { CreateCharacterPresenter } from '@/character/application/create-character-presenter.js'

const requiredNumber = {
  type: 'number',
  required: true
}

const requiredAttributeNumber = {
  ...requiredNumber,
  valueInBetween: [1, 6]
}

export function makeCreateCharacterPresenter() {
  const charactersService = makeCharacterService()

  return new ErrorHandlingPresenterDecorator(
    new ValidationPresenterDecorator(
      new CreateCharacterPresenter(charactersService),
      {
        name: {
          type: 'string',
          required: true
        },
        level: requiredNumber,
        gold: requiredNumber,
        alignment: {
          type: 'string',
          required: true
          // TODO: add oneOf validation
        },
        description: {
          type: 'string'
        },
        strength: requiredAttributeNumber,
        dexterity: requiredAttributeNumber,
        constitution: requiredAttributeNumber,
        intelligence: requiredAttributeNumber,
        wisdom: requiredAttributeNumber,
        charisma: requiredAttributeNumber,
        // TODO: add object and array validation
        equipment: {
          type: 'object'
        },
        inventoryItems: {
          type: 'array'
        }
      }
    )
  )
}

export function makeCreateCharactersPage() {
  const listAllDefaultItemsPresenter = new ListAllDefaultItemsPresenter(
    makeFetchHTTPClient(),
    new ItemsStore()
  )
  // TODO: create a validation only presenter
  const dummyPresenter: Presenter = {
    handle: (data) => Promise.resolve(successResponse(data))
  }

  const generalInfoSchema = {
    name: {
      type: 'string',
      required: true
    },
    alignment: {
      type: 'string',
      required: true,
      // TODO: add oneOf validation
    },
    level: {
      type: 'number',
      required: true
    },
    gold: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string'
    }
  }

  const attributesSchema = Object.fromEntries(
    (['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'])
      .map(attribute => [attribute, {
        type: 'number',
        required: true,
        valueInBetween: [0, 6]
      }])
  )
  const equipmentSchema = Object.fromEntries(
    (['rightHand', 'leftHand', 'armor', 'accessory1', 'accessory2'])
      .map(attribute => [attribute, { type: 'string' }])
  )

  const generalInfoPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    generalInfoSchema
  )

  const attributesPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    attributesSchema
  )

  const equipmentPresenter = new ValidationPresenterDecorator(
    dummyPresenter,
    equipmentSchema
  )

  return new IgnemCreateCharacterPage({
    listItemsPresenter: new ErrorHandlingPresenterDecorator(
      listAllDefaultItemsPresenter
    ),
    generalInfoPresenter,
    attributesPresenter,
    equipmentPresenter,
    createCharacterPresenter: makeCreateCharacterPresenter()
  })
}
