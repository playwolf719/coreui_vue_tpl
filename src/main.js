// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable */
// element-ui
// import { Container,Row,Col,Header,Aside,Main,RadioGroup,RadioButton,Menu,Submenu,MenuItem,MenuItemGroup,Form,FormItem,Input,Button ,Alert,Tag,Checkbox} from 'element-ui';
// Vue.use(Row);Vue.use(Col);
// Vue.use(Container);Vue.use(Header);Vue.use(Aside);Vue.use(Main);
// Vue.use(RadioGroup);Vue.use(RadioButton);
// Vue.use(Menu);Vue.use(Submenu);Vue.use(MenuItem);Vue.use(MenuItemGroup);
// Vue.use(Form);Vue.use(FormItem);Vue.use(Input);Vue.use(Button);
// Vue.use(Alert);
// Vue.use(Tag);
// Vue.use(Checkbox);

// bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)


import axios from 'axios';
Object.defineProperty(Vue.prototype, '$axios', { value: axios });

// var VueCookie = require('vue-cookie');
// Vue.use(VueCookie);
// other js
import jQuery from 'jquery'
Object.defineProperty(Vue.prototype, '$jQuery', { value: jQuery });
import mycommon from '@/lib/mycommon.js'
Object.defineProperty(Vue.prototype, '$mycommon', { value: mycommon });

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
