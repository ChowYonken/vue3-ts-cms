import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  counter: number
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
