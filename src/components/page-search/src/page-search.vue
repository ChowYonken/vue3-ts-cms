<template>
  <div class="page-search">
    <ck-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="search">搜索</el-button>
        </div>
      </template>
    </ck-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CkForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    CkForm
  },
  setup(props) {
    // 通过配置文件的field来决定这些属性
    // formData的属性动态决定
    // 获取配置里的formItems
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    // 遍历 并将每个item里的field加入到formOriginData
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 监听重置按钮
    const handleResetClick = () => {
      console.log(formOriginData)

      formData.value = formOriginData
      console.log(formData.value)
    }

    return { formData, handleResetClick }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
