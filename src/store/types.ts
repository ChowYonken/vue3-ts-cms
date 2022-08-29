import { ILoginState } from './login/types'

export interface IRootState {
  counter: number
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
