import Card from './views/Card.vue'
import Home from './views/Home.vue'

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true }, 
    component: () => import('@/layouts/LayoutMain.vue'),
    children: [
      { name: 'DashboardHome', path: 'home', component: Home },
      { name: 'DashboardCard', path: 'card', component: Card },
    ]
  },
]