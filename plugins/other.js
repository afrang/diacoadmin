import Vue from 'vue'
Vue.prototype.$url = 'http://api.diaco-sanat.com/api/';
Vue.prototype.$storage ='http://api.diaco-sanat.com/';
export default ({app}) => {
  app.$url = 'http://api.diaco-sanat.com/'
}
Vue.prototype.$domain =process.env.WBSITENAME;
import Swal from 'sweetalert2';
Vue.prototype.$swal =Swal;
Vue.use(require('vue-jalali-moment'));

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);


