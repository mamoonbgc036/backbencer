import { createApp } from 'vue'

import router from './router/index.js';
import './assets/vendors/core/core.css'
import './assets/vendors/flatpickr/flatpickr.min.css'
import './assets/fonts/feather-font/css/iconfont.css'
import './assets/vendors/flag-icon-css/css/flag-icon.min.css'
import './assets/css/demo2/style.css'
// import './assets/vendors/core/core.js'
// import './assets/vendors/feather-icons/feather.min.js'
// import './assets/js/template.js'

import App from './App.vue'


const app = createApp(App)

app.config.globalProperties.$getUser = () => {
  const token = localStorage.getItem('authToken');
  const user = JSON.parse(localStorage.getItem('user'));
  return [token, user];
};

app.use(router)

app.mount('#app')




