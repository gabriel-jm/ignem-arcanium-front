import { auth } from '@/main/decorators'
import {
  makeCreateAccountPage,
  makeIntroductionPage,
  makeLoginPage,
  makeTorchesPage
} from '@/main/factories/pages'
import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeIntroductionPage,
  '/torches': auth(makeTorchesPage),
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  notFound: () => new IgnemNotFoundPage()
})
