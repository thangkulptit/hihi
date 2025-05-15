import DashboardHome from "./views/home/DBHome.vue";
import CardList from "./views/card/CardList.vue";
import ShopList from "./views/shop/ShopList.vue";
import Statistic from "./views/statistic/StatisticView.vue";
import LogsList from "./views/logs/LogList.vue";
import ServerList from "./views/vpn-servers/ServerList.vue";

export default [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () => import("@/layouts/LayoutMain.vue"),
    children: [
      { name: "DashboardHome", path: "home", component: DashboardHome, meta: { breadcrumb: "Trang chủ" } },
      { name: "CardList", path: "card", component: CardList, meta: { breadcrumb: "Thẻ cào" } },
      { name: "ShopList", path: "shop", component: ShopList, meta: { breadcrumb: "Shop" }, },
      { name: "Statistic", path: "statistic", component: Statistic, meta: { breadcrumb: "Statistic" } },
      { name: "Logs", path: "logs", component: LogsList, meta: { breadcrumb: "Logs" }, },
      { name: "VpnServer", path: "vpn-server", component: ServerList, meta: { breadcrumb: "VpnServer" }, },
    ],
  },
];
