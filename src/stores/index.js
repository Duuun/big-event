import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
export default pinia

export * from './modules/user' //接收所有user里的按需导出
