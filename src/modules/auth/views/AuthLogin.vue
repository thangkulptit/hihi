<template>
  <div class="m-login">
    <h2>Đăng nhập</h2>
    <n-form
      :model="form"
      :rules="rules"
      @submit.prevent="login()"
    >
      <n-form-item
        label="Email"
        path="email"
      >
        <n-input
          v-model:value="form.email"
          placeholder="Nhập email"
        />
      </n-form-item>
      <n-form-item
        label="Mật khẩu"
        path="password"
      >
        <n-input
          v-model:value="form.password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </n-form-item>
      <n-button
        type="primary"
        block
        @click="login()"
      >
        Đăng nhập
      </n-button>
    </n-form>
    <p>
      Chưa có tài khoản?
      <n-button
        text
        @click="$router.push('/auth/register')"
      >
        Đăng ký
      </n-button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store";
import { useMessage } from "naive-ui";

const router = useRouter();
const authStore = useAuthStore();
const notify = useMessage();
const form = ref({ email: "", password: "" });

const rules = {
  email: [{ required: true, message: "Vui lòng nhập email" }],
  password: [{ required: true, message: "Vui lòng nhập mật khẩu" }],
};

const login = async () => {
  const { message, success } = await authStore.login(form.value);
  if (success) {
    console.log("111");
    router.push("/dashboard/home");
    router.push("/dashboard/home").catch((err) => console.error(err));
    console.log("2222");
    notify.success(message);
  } else {
    notify.error(message);
  }
};
</script>

<style lang="scss">
.m-login {
  width: 400px;
}
</style>
