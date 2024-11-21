<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const router = useRouter()
const route = useRoute()

const goList = () => {
  router.push('/list')
  console.log(route, router)
}

const userStore = useUserStore()
</script>

<template>
  <hr />
  <hr />
  <router-view></router-view>
  <hr />
  <hr />
  <div>
    我是app
    <el-button @click="$router.push('/home')">首页</el-button>
    <el-button @click="goList">列表页</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('test')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>

<style scoped></style>
