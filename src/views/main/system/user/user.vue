<template>
  <div class="user">
    <!-- 搜索框 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleSearchClick"
    />
    <!-- 搜索列表内容 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="small"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <!-- 添加弹窗 -->
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑: 编辑时不需要显示密码框
    const newCallBack = () => {
      const passWordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passWordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passWordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passWordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    // 因为网络请求的数据可能还没请求到，vuex没有数据，当请求到时，我们就用computed来重新获取vuex的数据
    const modalConfigRef = computed(() => {
      const store = useStore()
      // 找到item.field为department的item
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      // 将这个item映射为{ title: item.name, value: item.id }的格式
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    // 3.调用公共hook
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallBack, editCallBack)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleSearchClick,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
