import DashboardHome from "./views/home/DBHome.vue";
import DashboardCard from "./views/card/DBCard.vue";
import ShopList from "./views/shop/ShopList.vue";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () => import("@/layouts/LayoutMain.vue"),
    children: [
      { name: "DashboardHome", path: "home", component: DashboardHome, meta: { breadcrumb: "Trang chủ" } },
      { name: "DashboardCard", path: "card", component: DashboardCard, meta: { breadcrumb: "Thẻ cào" } },
      { name: "ShopList", path: "shop", component: ShopList, meta: { breadcrumb: "Shop" }, },
      // { name: "DashboardCard", path: "card", component: DashboardCard, meta: { breadcrumb: "Card" }, },
    ],
  },
];
