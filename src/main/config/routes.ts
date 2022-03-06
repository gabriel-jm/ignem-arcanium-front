import { HomePage, NotFoundPage } from '@/presentation/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  '/': new HomePage(),
  notFound: new NotFoundPage()
})
