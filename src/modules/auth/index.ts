import AuthLogin from './views/Login.vue';
import AuthRegister from './views/Register.vue';

export default [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./views/Index.vue'),
    children: [
      { path: '/login', component: AuthLogin },
      { path: '/register', component: AuthRegister },
    ]
  },
]