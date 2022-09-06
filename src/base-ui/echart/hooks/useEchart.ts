import * as echarts from 'echarts'

// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)

// 封装一个公共的初始化，使用echarts的hooks
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 可在外面使用这个方法
  const updateSize = () => {
    echartInstance.resize()
  }

  // 监听浏览器的变化
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
