import "./assets/css/base.css";
import "./assets/css/iconfont.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 清除样式 pnpm i normalize.css -S
import "normalize.css/normalize.css";
import App from "./App.vue";
import router from "./router";
import locale from "element-plus/es/locale/lang/zh-cn";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.vue";

const app = createApp(App);
app.component('Breadcrumb',Breadcrumb)
app.use(createPinia());
app.use(router);
// ElementPlus英文转中文
app.use(ElementPlus, { locale });

app.mount("#app");
