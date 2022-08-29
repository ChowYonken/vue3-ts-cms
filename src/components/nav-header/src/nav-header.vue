<template>
  <div class="nav-header">
    <el-icon size="30px" @click="handleFoldClick">
      <template v-if="isFold"><Fold /></template>
      <template v-else><Expand /></template>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick }
  }
})
</script>

<style scoped></style>
