import { auth } from '@/account/main/decorators/page-factory-auth-decorator'
import { makeLoginPage } from '@/account/main/factories'
import { makeCreateAccountPage } from '@/account/main/factories/create-account-page-factory'
import { introPage } from '@/introduction'
import {
  makeCharactersPage,
  makeCreateCharactersPage,
  makeHomePage,
} from '@/main/factories/pages'
import { notFoundPage } from '@/not-found/not-found-page'
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
