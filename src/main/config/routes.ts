import { makeHomePage, makeTorchesPage } from '@/main/factories/pages'
import { IgnemNotFoundPage, loginPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage(),
  '/torches': makeTorchesPage(),
  '/login': loginPage(),
  notFound: new IgnemNotFoundPage()
})
