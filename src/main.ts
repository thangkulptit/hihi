import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/styles.scss";
import App from "./App.vue";
import router from "./router/routes";
import naive from "naive-ui";
import i18n from '../i18n.config.js'
import MIcon from "./cores/components/MIcon.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(naive);
app.use(i18n);

// Đăng ký global component
app.component("MIcon", MIcon);

app.mount("#app");
