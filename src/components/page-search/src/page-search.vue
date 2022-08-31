<template>
  <div class="page-search">
    <ck-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  }
})
</script>

<style scoped></style>
