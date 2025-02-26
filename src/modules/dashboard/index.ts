import Card from './views/Card.vue'
import Home from './views/Home.vue'

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./views/Index.vue'),
    children: [
      { path: '/card', component: Card },
      { path: '/home', component: Home },
    ]
  },
]