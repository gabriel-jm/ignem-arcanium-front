import { NotFoundPage } from '@/presentation/view'
import { router } from 'lithen-router'

export const configRoutes = () => router.defineRoutes({
  notFound: new NotFoundPage()
})
