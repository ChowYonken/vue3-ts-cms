<template>
  <div class="ck-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import type { EChartsOption } from 'echarts'

import useEchart from '../hooks/useEchart'

const echartDivRef = ref<HTMLElement>()

// 定义props
const props = withDefaults(
  defineProps<{
    option: EChartsOption
    width?: string
    height?: string
  }>(),
  { width: '100%', height: '360px' }
)

onMounted(() => {
  // 在公共hooks里获取设置Echarts的ooption
  const { setOptions } = useEchart(echartDivRef.value!)
  setOptions(props.option)
})
</script>

<style scoped></style>
