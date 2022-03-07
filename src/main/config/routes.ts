import { HomePage, NotFoundPage, TorchesPage } from '@/presentation/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': new HomePage(),
  '/torches': new TorchesPage(),
  notFound: new NotFoundPage()
})
