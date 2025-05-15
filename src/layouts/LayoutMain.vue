<template>
  <div class="m-mh-100vh">
    <n-config-provider :theme="isDark ? darkTheme : null">
      <n-layout class="m-mh-100vh">
        <!-- HEADER -->
        <n-layout-header
          class="m-layout-header m-layout m-flex m-flex-items-center m-flex-justify-between m-p-md"
        >
          <span class="m-text-large">
            <n-icon size="24">
              <ManageAccountsOutlined />
            </n-icon>
            Management
          </span>
          <div class="m-flex m-flex-align-center">
            <div
              v-if="!authStore.isAuthenticated"
              class="m-flex"
            >
              <RouterLink to="/auth/login">
                <n-button circle>
                  <template #icon>
                    <n-icon size="24">
                      <LogInOutlined />
                    </n-icon>
                  </template>
                </n-button>
              </RouterLink>

              <RouterLink to="/auth/register">
                <n-button
                  class="m-ml-xs"
                  circle
                >
                  <template #icon>
                    <n-icon size="24">
                      <PersonAddAlt1Outlined />
                    </n-icon>
                  </template>
                </n-button>
              </RouterLink>
            </div>
            <div v-else>
              <n-button @click="logout">
                {{ authStore.user.email }}
              </n-button>
            </div>

            <n-switch
              v-model:value="isDark"
              class="m-ml-xs"
              @update:value="toggleTheme"
            >
              <template #checked>
                🌙
              </template>
              <template #unchecked>
                ☀️
              </template>
            </n-switch>
          </div>
        </n-layout-header>

        <n-layout
          class="m-flex m-flex-items-center m-flex-justify-center"
          :has-sider="isDashboardRouter"
        >
          <n-layout-sider
            v-if="isDashboardRouter"
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            style="max-height: 320px"
          >
            <n-menu
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
              :value="activeMenu"
              @update:value="handleMenuClick"
            />
          </n-layout-sider>
          <n-layout-content class="content">
            <!-- Breadcrumb -->
            <n-breadcrumb v-if="isDashboardRouter">
              <n-breadcrumb-item
                v-for="(item, index) in breadcrumbItems"
                :key="index"
              >
                <RouterLink
                  v-if="item.path"
                  :to="item.path"
                >
                  {{ item.label }}
                </RouterLink>
                <span v-else>{{ item.label }}</span>
              </n-breadcrumb-item>
            </n-breadcrumb>
            <div class="m-px-md m-py-md">
              <router-view />
            </div>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  darkTheme,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSwitch,
} from "naive-ui";
import {
  LogInOutlined,
  PersonAddAlt1Outlined,
  ManageAccountsOutlined,
} from "@vicons/material";
import { useAuthStore } from "@/modules/auth/store";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const logout = () => {
  authStore.logout();

  router.push("/auth/login");
};

const isDark = ref(false);
const activeMenu = ref("home");

const menuOptions = [
  {
    label: 'Home',
    key: '/dashboard/home',
  },
  {
    label: 'Shop',
    key: '/dashboard/shop',
  },
  {
    label: 'Card',
    key: '/dashboard/card',
  },
  {
    label: 'Statistic',
    key: '/dashboard/statistic',
  },
  {
    label: 'Logs',
    key: '/dashboard/logs',
  },
  {
    label: 'Vpn Server',
    key: '/dashboard/vpn-server',
  },
]

const breadcrumbItems = computed(() => {
  const matched = route.matched;
  const items = matched.map((r) => ({
    label: r.meta?.breadcrumb || r.name || r.path.split("/").pop(),
    path: r.path !== "" ? r.path : undefined,
  }));
  return items;
});

const isDashboardRouter = computed(() => route.path.startsWith('/dashboard'))

onMounted(() => {
  // console.log(route.path);
})

// Xử lý khi click menu
const handleMenuClick = (key: string) => {
  activeMenu.value = key;
  router.push(`${key}`);
};

const toggleTheme = () => {
  document.body.classList.toggle("dark", isDark.value);
};
</script>

<style lang="scss">
@use "@/assets/styles/abstracts/_variables.scss";

.m-layout-header {
  border-bottom: 1px solid #e3e7e8;
}

.m-layout-sider {
  border-right: 1px solid #e3e7e8;
}

.content {
  min-height: 80vh;
  width: 400px;
}
</style>
