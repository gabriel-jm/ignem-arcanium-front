import { auth } from '@/account/main/decorators/page-factory-auth-decorator'
import { makeLoginPage } from '@/account/main/factories'
import { makeCreateAccountPage } from '@/account/main/factories/create-account-page-factory'
import {
  makeCharactersPage,
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
