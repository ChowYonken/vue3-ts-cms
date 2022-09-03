import type { App } from 'vue'
import { formatUtcString } from '@/utils/data-format'

export default function registerProperties(app: App) {
  // 在app中添加一些属性 就可以在全局调用这些属性
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
