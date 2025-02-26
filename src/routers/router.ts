import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import các module routes
import authRoutes from '@/modules/auth'
import dashboardRoutes from '@/modules/dashboard'
// Gộp tất cả routes thành một mảng
const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...dashboardRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router