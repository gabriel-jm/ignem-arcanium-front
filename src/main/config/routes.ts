import { auth } from '@/account/main/decorators/page-factory-auth-decorator.js'
import { makeLoginPage } from '@/account/main/factories/index.js'
import { makeCreateAccountPage } from '@/account/main/factories/create-account-page-factory.js'
import { introPage } from '@/introduction/index.js'
import {
  makeCharactersPage,
  makeCreateCharactersPage,
  makeHomePage,
} from '@/main/factories/pages/index.js'
import { notFoundPage } from '@/not-found/not-found-page.js'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': introPage,
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  '/home': auth(makeHomePage),
  '/characters': auth(makeCharactersPage),
  '/characters/create': auth(makeCreateCharactersPage),
  notFound: notFoundPage
})
