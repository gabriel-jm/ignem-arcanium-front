import { makeLoginPage } from '@/account/main/factories'
import { auth } from '@/main/decorators'
import {
  makeCharactersPage,
  makeCreateAccountPage,
  makeCreateCharactersPage,
  makeHomePage,
  makeIntroductionPage,
  makeTorchesPage
} from '@/main/factories/pages'
import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeIntroductionPage,
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  '/home': auth(makeHomePage),
  '/characters': auth(makeCharactersPage),
  '/characters/create': auth(makeCreateCharactersPage),
  '/torches': auth(makeTorchesPage),
  notFound: () => new IgnemNotFoundPage()
})
