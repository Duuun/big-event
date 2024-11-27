<script setup>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import { ref, provide } from 'vue'

const isRegister = ref(true) // 控制登录和注册显示的状态
//切换登录状态
const toggleRegister = () => {
  isRegister.value = !isRegister.value
}

provide('isRegister', isRegister) // 提供状态
provide('toggleRegister', toggleRegister) // 提供切换方法
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <component :is="isRegister ? Login : Register" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
