import { createApp } from 'vue'
import './assets/styles/styles.scss'
import App from './App.vue'
import router from './router/routes'
import naive from 'naive-ui'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia)
app.use(naive);


app.mount('#app');
