import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IAnalysis } from './main/analysis/types'

export interface IRootState {
  counter: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysis
}

export type IStoreType = IRootState & IRootWithModule
