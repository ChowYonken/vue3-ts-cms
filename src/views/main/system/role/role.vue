<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content-config'
import { searchFormConfig } from './config/search-config'
import { modalConfig } from './config/modal-config'

import { usePageModal } from '@/hooks/usePageModal'

import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // PageModal处理的hook
    // 获取menuList
    // 回显数据
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallBack)

    // 获取菜单数据
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped></style>
