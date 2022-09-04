<template>
  <div class="page-content">
    <ck-table
      :listData="dataList"
      :listCount="userCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
    >
      <!-- 标题 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate">新建用户</el-button>
      </template>
      <!-- 固定的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-link type="primary" icon="edit" v-if="isUpdate">编辑</el-link>
          <el-link
            type="danger"
            icon="delete"
            v-if="isDelete"
            @click="handleDeletePageClick(scope.row)"
            >删除</el-link
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ck-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import CkTable from '@/base-ui/table'

import { usePermission } from '@/hooks/usePermission'

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

    const selectionChange = (value: any) => {
      console.log(value)
    }

    // 0.获取用户按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 当属性发生改变 重新请求列表
    watch(pageInfo, () => getPageData())

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex里获取请求列表数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const userCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList?.filter(
      (item: any) => {
        // 一些公共的插槽
        // if (item?.slotName === 'status') return false
        if (item?.slotName === 'createAt') return false
        if (item?.slotName === 'updateAt') return false
        if (item?.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除/编辑/添加操作
    const handleDeletePageClick = (item: any) => {
      store.dispatch('system/deletePageAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    return {
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      pageInfo,
      dataList,
      userCount,
      getPageData,
      selectionChange,
      otherPropSlots,
      handleDeletePageClick
    }
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
