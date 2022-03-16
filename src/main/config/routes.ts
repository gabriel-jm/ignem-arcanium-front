import { makeHomePage } from '@/main/factories/pages'
import { IgnemNotFoundPage, IgnemTorchesPage } from '@/ui/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage(),
  '/torches': new IgnemTorchesPage(),
  notFound: new IgnemNotFoundPage()
})
