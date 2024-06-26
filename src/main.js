import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/iconfont/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/base.css'
import store from './store'
import MyHeader from './components/MyHeader.vue'


const app = createApp(App)
app.config.globalProperties.$URL = 'http://localhost:8080'

app.use(router).use(ElementPlus).use(store).component('MyHeader', MyHeader).mount("#app");
