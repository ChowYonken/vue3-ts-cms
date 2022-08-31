<template>
  <div class="ck-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.type">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemLayout"
            >
              <!-- input表单 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
                ></el-input>
              </template>
              <!-- select表单 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- datepicker表单 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import type { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    // 表单Item的类型
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      dafault: '100px'
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // 24 / 6 = 4
        lg: 8, // 3
        md: 12, // 2
        sm: 24, // 1
        xs: 24 // 1
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 拷贝一份给formData 这时formData与user里的formData没有关联
    const formData = ref({ ...props.modelValue })
    // 我们要监听formData的改变，发生改变就使用emit把事件传出去告知user里的formData修改
    // 因为我们要监听formData里的属性值变化 所以要深度监听
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    return { formData }
  }
})
</script>

<style scoped>
.ck-form {
  padding-top: 22px;
}
</style>
