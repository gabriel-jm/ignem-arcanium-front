import { NotFoundPage } from '@/presentation/view/pages/not-found'
import { router } from 'lithen-router'

const routes = () => router.defineRoutes({
  notFound: new NotFoundPage()
})

async function init() {
  routes()
  
  await import('@/presentation/view')
}

init()
