import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  counter: number
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
