import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import mixin from './mixin'
import './assets/gc-icons/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import './permission'

import {
  Button, Input, Table, Form, FormItem, Menu, Submenu, MenuItem, Icon,
  Aside, Main, Container, Link, Tooltip, Backtop, Divider, Card, Dialog,
  TableColumn, Dropdown, DropdownItem, DropdownMenu, PageHeader, Loading,
  Avatar, Col, Rate, Row, Radio, RadioGroup
} from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Link)
Vue.use(Tooltip)
Vue.use(Backtop)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(PageHeader)
Vue.use(Loading)
Vue.use(Avatar)
Vue.use(Col)
Vue.use(Row)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Rate)
Vue.component(CollapseTransition.name, CollapseTransition)

// Vue.use(ElementUI)
Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
