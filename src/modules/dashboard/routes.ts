import DashboardHome from "./views/DBHome.vue";
import DashboardCard from "./views/DBCard.vue";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () => import("@/layouts/LayoutMain.vue"),
    children: [
      { name: "DashboardHome", path: "home", component: DashboardHome },
      { name: "DashboardCard", path: "card", component: DashboardCard },
    ],
  },
];
