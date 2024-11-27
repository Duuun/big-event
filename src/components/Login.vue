<script setup>
import { reactive, ref, watch, inject } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

import { useUserStore } from '@/stores'

import { userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const isRegister = inject('isRegister') // 消费状态
const toggleRegister = inject('toggleRegister') // 消费方法

// 切换到注册
const goToRegister = () => {
  toggleRegister()
}

const ruleFormRef = ref(null)

// 表单模型
const ruleForm = reactive({
  username: '',
  password: '',
  repassword: '',
})

// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
  ],
})

// 切换重置表单内容
watch(
  () => isRegister, // 使用函数形式监听 props.modelValue
  (newValue) => {
    console.log('modelValue 改变:', newValue)
    ruleForm.username = '' // 重置表单
    ruleForm.password = ''
    console.log('清空后表单数据:', ruleForm)
  },
)

const userStore = useUserStore()
const router = useRouter()
// 登录
const login = async () => {
  await ruleFormRef.value.validate()
  const res = await (await userLoginService(ruleForm)).data
  console.log('开始登录请求', res)
  userStore.setToken(res.token)
  ElMessage.success('登录成功')
  router.push('/')
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
        <h1>登录</h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          :prefix-icon="User"
          placeholder="请输入用户名"
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
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-form-item class="flex">
      <div class="flex">
        <el-checkbox type="checkbox" value="male">记住我</el-checkbox>
        <el-link type="primary" :underline="false">忘记密码?</el-link>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button class="button" size="large" type="primary" auto-insert-space @click="login"
        >登录</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-link type="info" :underline="false" @click="goToRegister"> 注册 → </el-link>
    </el-form-item>
    <p>
      仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息（如手机号、身份证等）！
    </p>
  </div>
</template>

<style lang="scss" scoped>
.contain {
  font-size: 14px;

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;

    a {
      color: #409eff;
    }
  }

  a {
    color: #a8abb2;
  }

  .button {
    width: 100%;
  }
}
</style>
