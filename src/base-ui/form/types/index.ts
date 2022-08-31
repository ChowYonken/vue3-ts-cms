type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  filed: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface IForm {
  labelWidth: string
  itemLayout: any
  colLayout: any
  formItems: IFormItem[]
}
