<template>
  <div class="login-panel">
    <!-- 标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 输入内容 -->
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <!-- 账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span><i class="iconfont icon-zhanghao"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <!-- 手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="iconfont icon-zhanghao"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <!-- 控制操作 -->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 提交登录操作 -->
    <el-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 属性定义
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 方法定义
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 账号登录操作
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 手机登录操作
        phoneRef.value?.loginAction()
      }
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }

  .iconfont {
    font-size: 14px;
  }
}
</style>
