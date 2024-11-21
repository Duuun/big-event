import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token，在pinia中获取
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }

    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // TODO 3. 处理业务失败，给错误提示
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误特殊情况：token过期，或权限不足 => 跳转到登录页
    if (err.response?.status === 401) {
      // 清除token
      const userStore = useUserStore()
      userStore.removeToken()
      // 跳转登录页
      return router.push('/login')
    }

    // 错误默认情况：直接给提示
    ElMessage.error(err.response.data.message || '服务异常')

    return Promise.reject(err)
  },
)

export default instance
export { baseURL }