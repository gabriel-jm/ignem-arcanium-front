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
  '/torches': makeTorchesPage,
  '/login': makeLoginPage,
  '/create-account': makeCreateAccountPage,
  notFound: () => new IgnemNotFoundPage()
})
