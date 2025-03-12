<template>
  <div class="m-register">
    <h2>Đăng ký</h2>
    <n-form :model="form" :rules="rules">
      <n-form-item label="Email" path="email">
        <n-input v-model:value="form.email" placeholder="Nhập email" />
      </n-form-item>
      <n-form-item label="Mật khẩu" path="password">
        <n-input v-model:value="form.password" type="password" placeholder="Nhập mật khẩu" />
      </n-form-item>
      <n-form-item label="Xác nhận mật khẩu" path="confirmPassword">
        <n-input v-model:value="form.confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
      </n-form-item>
      <n-button type="primary" block @click="register">Đăng ký</n-button>
    </n-form>
    <p>
      Đã có tài khoản?
      <n-button text @click="$router.push('/auth/login')">Đăng nhập</n-button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";
import { RegisterUserPayload } from "../store";

const router = useRouter();
const authStore = useAuthStore();
const form = ref({ email: "", password: "", confirmPassword: "" });

const rules = {
  email: [{ required: true, message: "Vui lòng nhập email" }],
  password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
  confirmPassword: [{ required: true, message: "Vui lòng nhập lại mật khẩu" }],
};

const register = () => {
  const payload: RegisterUserPayload = {
    email: form.value.email,
    password: form.value.password
  }
  authStore.createUser(payload);
  router.push('/dashboard/home')
}

</script>

<style lang="scss">
.m-register {
  width: 400px;
}
</style>