import request from '@/service'

import type { IDataType } from '../../types'

// 获取列表信息
export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
