<template>
  <div class="nav-header">
    <el-icon size="30px" @click="handleFoldClick" class="fold-menu">
      <template v-if="isFold"><Fold /></template>
      <template v-else><Expand /></template>
    </el-icon>
    <div class="content">
      <!-- 面包屑 -->
      <bread-crumb :bread-crumbs="breadCrumb" />
      <!-- 用户信息 -->
      <nav-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NavInfo from './user-info.vue'
import { pathMapBreadCrumb } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import BreadCrumb from '@/base-ui/breadCrumb'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    NavInfo,
    BreadCrumb
  },
  setup(props, { emit }) {
    // 是否显示图标
    const isFold = ref(false)

    // 获取面包屑的数据
    // 使用computed 当route改变 return的breadCrumb也改变
    const store = useStore()
    const userMenus = store.state.login.userMenus
    const breadCrumb = computed(() => {
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadCrumb(userMenus, currentPath)
    })

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick, breadCrumb }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
