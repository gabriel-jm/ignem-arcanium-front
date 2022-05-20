import { auth } from '@/main/decorators'
import {
  makeCreateAccountPage,
  makeHomePage,
  makeLoginPage,
  makeTorchesPage
} from '@/main/factories/pages'
import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage,
  '/torches': auth(makeTorchesPage),
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  notFound: () => new IgnemNotFoundPage()
})
