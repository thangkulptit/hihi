import { useAuthStore } from "@/modules/auth/store"
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login') // Nếu chưa đăng nhập, chuyển hướng đến login
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard/home') // Nếu đã đăng nhập, không cho vào login/register
  } else {
    next() // Tiếp tục bình thường
  }
}