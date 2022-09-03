<template>
  <div class="ck-table">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 数据列表插槽 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="showIndexColumn"
        align="center"
        type="selection"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showSelectColumn"
        label="序列"
        align="center"
        type="index"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- 作用域插槽 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 插槽默认值为下面 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 尾部插槽 -->
    <div class="footer">
      <slot name="footer">
        <!-- 分页器 -->
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="->, total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    // 表格数据
    listData: {
      type: Array,
      require: true
    },
    // 配置
    propList: {
      type: Array,
      require: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    return { selectionChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    // text-align: right;
  }
}
</style>
