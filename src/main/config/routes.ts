import { auth } from '@/main/decorators'
import {
  makeCreateAccountPage,
  makeHomePage,
  makeIntroductionPage,
  makeLoginPage,
  makeTorchesPage
} from '@/main/factories/pages'
import { makeCharactersPage } from '@/main/factories/pages/characters-page-factory'
import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeIntroductionPage,
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  '/home': auth(makeHomePage),
  '/characters': auth(makeCharactersPage),
  '/torches': auth(makeTorchesPage),
  notFound: () => new IgnemNotFoundPage()
})
