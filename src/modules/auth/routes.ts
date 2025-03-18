export default [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/layouts/LayoutMain.vue"),
    meta: { requiresGuest: true }, // Chưa xác thực mới có thể
    children: [
      {
        path: "login",
        component: () => import("./views/AuthLogin.vue"),
        name: "Login",
      },
      {
        path: "register",
        component: () => import("./views/AuthRegister.vue"),
        name: "Register",
      },
    ],
  },
];
