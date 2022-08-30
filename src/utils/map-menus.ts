import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载main默认所有的routes
  // 声明一个数组allRoutes
  const allRoutes: RouteRecordRaw[] = []
  // 获取main文件夹所有的ts文件并保存到routeFiles
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 遍历这些文件并存进routeFiles
  routeFiles.keys().forEach((key) => {
    const r = key.split('.')[1]
    const route = require('../router/main' + r)
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  // 递归
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 如果mian的某个route与用户的菜单的路径相同 则添加进routes
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
          console.log(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}
