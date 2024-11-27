<script setup>
import { reactive, ref, watch, inject } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

import { userRegisterService } from '@/api/user'

const isRegister = inject('isRegister') // 消费状态
const toggleRegister = inject('toggleRegister') // 消费方法

// 切换到登录状态
const goToLogin = () => {
  toggleRegister()
}

const ruleFormRef = ref(null)

watch(
  () => isRegister,
  (newValue, oldValue) => {
    console.log('modelValue 变化:', oldValue, '->', newValue)
    // 清空表单数据
    ruleForm.username = ''
    ruleForm.password = ''
    ruleForm.repassword = ''
  },
)

// 注册前的预校验
const register = async () => {
  await ruleFormRef.value.validate()
  await userRegisterService(ruleForm)
  console.log('开始注册请求', ruleForm)
  ElMessage.success('注册成功')
  goToLogin()
}

// 表单模型
const ruleForm = reactive({
  username: '',
  password: '',
  repassword: '',
})

// 校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur',
    },
    {
      // 自定义校验规则
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          console.log(ruleForm.password)
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
</script>

<template>
  <div class="contain">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      :size="'large'"
      label-width="auto"
    >
      <el-form-item>
        <h1>注册</h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
          autocomplete="off"
          :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          v-model="ruleForm.repassword"
          placeholder="请再次输入密码"
          type="password"
          autocomplete="off"
          :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" auto-insert-space @click="register">
          注册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-link type="info" :underline="false" @click="goToLogin"> ← 返回 </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #a8abb2;
}

.contain {
  flex: 1;
  font-size: 14px;
}

.button {
  width: 100%;
}
</style>
