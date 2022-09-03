<template>
  <div class="page-content">
    <ck-table
      :listData="dataList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
    >
      <!-- 标题 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 数据列表表格 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="small"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler">
          <el-link type="primary" icon="edit">编辑</el-link>
          <el-link type="danger" icon="delete">删除</el-link>
        </div>
      </template>
    </ck-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import CkTable from '@/base-ui/table'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      default: ''
    },
    contentTableConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CkTable
  },
  setup(props: any) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)
    return { dataList }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.handler .el-link {
  font-size: 12px;
  margin-right: 5px;
}
</style>
