import { makeCreateAccountPage, makeHomePage, makeTorchesPage } from '@/main/factories/pages'
import { IgnemLoginPage, IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage,
  '/torches': makeTorchesPage,
  '/login': () => new IgnemLoginPage(),
  '/create-account': makeCreateAccountPage,
  notFound: () => new IgnemNotFoundPage()
})
