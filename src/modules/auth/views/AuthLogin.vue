<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">
          Đăng nhập
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Đăng nhập để truy cập tài khoản của bạn
        </p>
      </div>

      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="large"
        @submit.prevent="login"
      >
        <n-form-item
          label="Email"
          path="email"
        >
          <n-input
            v-model:value="form.email"
            placeholder="Nhập email"
            clearable
          >
            <template #prefix>
              <n-icon><i class="i-carbon-email text-gray-400" /></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item
          label="Mật khẩu"
          path="password"
        >
          <n-input
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            placeholder="Nhập mật khẩu"
          >
            <template #prefix>
              <n-icon><i class="i-carbon-password text-gray-400" /></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <div class="flex items-center justify-between">
          <n-checkbox v-model:checked="form.remember">
            Ghi nhớ đăng nhập
          </n-checkbox>
          <n-button
            text
            type="primary"
          >
            Quên mật khẩu?
          </n-button>
        </div>

        <n-button
          type="primary"
          block
          size="large"
          :loading="loading"
          @click="login"
        >
          Đăng nhập
        </n-button>
      </n-form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Chưa có tài khoản?
          <n-button
            text
            type="primary"
            @click="$router.push('/auth/register')"
          >
            Đăng ký ngay
          </n-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";
import { useMessage } from "naive-ui";
import type { FormInst } from "naive-ui";

const router = useRouter();
const authStore = useAuthStore();
const notify = useMessage();
const formRef = ref<FormInst | null>(null);
const loading = ref(false);

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const rules = {
  email: [
    { required: true, message: "Vui lòng nhập email" },
    { type: "email", message: "Email không hợp lệ" },
  ],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu" },
    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
  ],
};

const login = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;

    const { message, success } = await authStore.login(form.value);

    if (success) {
      notify.success(message);
      await router.push("/dashboard/home");
    } else {
      notify.error(message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.m-login {
  width: 400px;
}
</style>
