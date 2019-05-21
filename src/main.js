import 'lib-flexible/flexible.js'

import axios from 'axios'

import 'jquery'
import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import filters from './until/filter'
import { Row, Col, Switch, Tab, Tabs, Swipe, SwipeItem, Search } from 'vant'
Vue.use(Row).use(Col).use(Switch).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Search)
import router from './router/index.js'
Vue.config.productionTip = false
import { NavBar, Dialog, CellGroup, Field } from 'vant';
import qs from 'qs'
Vue.use(NavBar).use(Dialog);
import { Button,Toast } from 'vant';
Vue.use(Button).use(Toast);
import { Collapse, CollapseItem } from 'vant';
import { Loading } from 'vant';

Vue.use(Loading);
Vue.use(Collapse).use(CollapseItem);
new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})