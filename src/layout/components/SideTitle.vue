<template>
  <div class="side">
    <div v-if="userInfo">
      <div class="header">
        <el-col :span="2" :offset="1">
          <el-avatar size="large" shape="circle" fit="fill" :src="require('@/assets/cat.jpg')"></el-avatar>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="header-title">{{userInfo.username || '魑魅魍魉'}}</div>
        </el-col>
        <el-col :span="2" :offset="4">
          <el-button type="text" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-col>
      </div>

      <div style="margin-left:5px;">
        <i class="el-icon-suitcase-1"></i>
        <span style="font-size:15px;padding-left:5px;">{{userInfo.email}}</span>
      </div>

      <small class="introduce">如果今天还不开始，明天还是如此</small>
    </div>
    <div v-else style="max-height: 100px;padding:25px 60px;">
      <el-button type="primary" @click="gotoLogin">登录/注册</el-button>
    </div>

    <el-divider />

    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      mode="vertical"
      background-color="#f0f2f5"
      text-color="#000"
      active-text-color="#409EFF"
    >
      <template v-for="menu in routes">
        <app-link v-if="menu.path !== '/components'" :to="menu.path" :key="menu.path">
          <el-menu-item>
            <item :icon="menu.meta.icon" :title="menu.meta.name"></item>
          </el-menu-item>
        </app-link>
        <el-submenu v-else :index="menu.path" :key="menu.path" popper-append-to-body>
          <template slot="title">
            <i :class="menu.meta.icon"></i>
            <span style="padding-left:10px;">{{ menu.meta.name}}</span>
          </template>

          <app-link v-for="child in menu.children" :key="child.path" :to="child.path">
            <el-menu-item>
              <item :icon="child.meta.icon" :title="child.meta.name"></item>
            </el-menu-item>
          </app-link>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import AppLink from "./Link";
import Item from "./Item";
import router from "@/router";

import { Message } from "element-ui";
import { mapState, mapGetters } from "vuex";
import { setStr, getStr } from "../../utils/dom";

const SIDEBAR_ROUTE_KEY = "DYGC.BLOG.SIDEBAR_ROUTE_KEY";

export default {
  name: "SideTitle",
  components: {
    AppLink,
    Item,
  },
  data() {
    return {
      activeMenu: "/",
      isCollapse: false,
      introduce: "with great power comes great responsibility.",
    };
  },
  created() {
    // 这里临时保存在localstorge里面，理论上应该保存在store里面，再由store读写localstorage
    this.activeMenu = getStr(SIDEBAR_ROUTE_KEY, "/");
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      routes: (state) => {
        const router = state.permission.routes.find((r) => r.path === "/");
        const routes = router ? router.children : [];
        return routes
          .filter((r) => !r.hidden)
          .sort((a, b) => {
            return (b.priority || 0) - (a.priority || 0);
          });
      },
    }),
  },
  watch: {
    $route(to, from) {
      console.log("fjkdajfkd;lajfd;ajf;" + to.path);
      setStr(SIDEBAR_ROUTE_KEY, to.path);
    },
  },
  methods: {
    handleSearch() {
      Message.info("功能尚未实现，敬请期待");
    },
    gotoLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 15px;
  line-height: 50px;
  height: 60px;
}
.header-title {
  text-align: center;
  letter-spacing: 0.2px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  color: #343f44;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.3em;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 10px;
}
.introduce {
  padding-left: 5px;
}
</style>
