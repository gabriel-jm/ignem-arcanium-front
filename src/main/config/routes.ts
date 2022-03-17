import { makeHomePage, makeTorchesPage } from '@/main/factories/pages'
import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage(),
  '/torches': makeTorchesPage(),
  notFound: new IgnemNotFoundPage()
})
