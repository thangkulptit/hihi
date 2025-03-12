import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import các module routes
import authRoutes from '@/modules/auth/routes'
import dashboardRoutes from '@/modules/dashboard/routes'

import { authGuard } from './guard'
// Gộp tất cả routes thành một mảng
const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...dashboardRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard);

export default router