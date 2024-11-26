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
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
