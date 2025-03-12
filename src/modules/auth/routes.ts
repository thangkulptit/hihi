export default [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/layouts/LayoutMain.vue'),
    meta: { requiresGuest: true }, // Chưa xác thực mới có thể
    children: [
      { 
        path: 'login',
        component: () => import('./views/Login.vue'),
        name: 'Login'
      },
      { 
        path: 'register',
        component: () => import('./views/Register.vue'),
        name: 'Register'
      },
    ]
  },
]