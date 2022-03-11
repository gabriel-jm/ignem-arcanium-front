import { makeHomePage } from '@/main/factories/pages'
import { NotFoundPage, TorchesPage } from '@/presentation/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': makeHomePage(),
  '/torches': new TorchesPage(),
  notFound: new NotFoundPage()
})
