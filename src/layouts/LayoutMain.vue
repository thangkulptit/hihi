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

        <n-layout class="m-flex m-flex-items-center m-flex-justify-center">
          <n-layout-content class="content">
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();

  router.push("/auth/login");
};

const isDark = ref(false);

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
