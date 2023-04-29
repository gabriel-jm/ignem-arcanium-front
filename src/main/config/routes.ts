import { auth } from '@/account/main/decorators/page-factory-auth-decorator.js'
import { makeLoginPage } from '@/account/main/factories/index.js'
import { makeCreateAccountPage } from '@/account/main/factories/create-account-page-factory.js'
import { LithenRouter } from 'lithen-router'
import { introPage, notFoundPage } from '@/common/ui/pages/index.js'
import { makeHomePage } from '@/common/main/factories/home-page-factory.js'
import { makeCharactersPage, makeCreateCharactersPage } from '@/character/main/factories/pages/index.js'
import { makeContentPage } from '@/contents/main/factories/index.js'

type ElementFactory = () => Node | null | Promise<Node | null>

export const router = new LithenRouter<ElementFactory>({
  '/': introPage,
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  '/home': auth(makeHomePage),
  '/contents': auth(makeContentPage),
  '/characters': auth(makeCharactersPage),
  '/characters/create': auth(makeCreateCharactersPage),
  notFound: notFoundPage
})
