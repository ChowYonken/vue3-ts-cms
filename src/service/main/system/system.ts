import request from '@/service'

import type { IDataType } from '../../types'

// 获取列表数据
export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除
export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url: url
  })
}

// 新建
export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑
export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url: url,
    data: editData
  })
}
