import { successResponse } from '@/common/application/helpers/presenter-results.js'
import { Presenter, PresenterResult } from '@/common/application/protocols/presenter.js'
import { HTTPServiceError } from '@/common/infra/errors/index.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'

interface ContentData {
  type: string
  icon?: string
  cover?: File
  title: string
  value: string
  properties: Record<string, unknown>
}

export class CreateContentPresenter implements Presenter {
  constructor(private readonly httpClient: HTTPClient) {}
  
  async handle<T = any>(data: ContentData): Promise<PresenterResult<T>> {
    const { cover, ...jsonData } = data

    const body = new FormData()
    body.append('data', JSON.stringify(jsonData))
    cover && body.append('cover', cover)
    
    const response = await this.httpClient.request({
      method: 'post',
      path: '/contents',
      body
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on creating content')
    }

    return successResponse(response.body)
  }
}
