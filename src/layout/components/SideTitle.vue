<template>
  <div class="side">
    <div class="header">
      <el-col :span="2" :offset="1">
        <el-avatar size="large" shape="circle" fit="fill" :src="require('@/assets/cat.jpg')"></el-avatar>
      </el-col>
      <el-col :span="8" :offset="2">
        <div class="header-title">{{username}}</div>
      </el-col>
      <el-col :span="2" :offset="4">
        <el-button type="text" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-col>
    </div>

    <div style="margin-left:5px;">
      <i class="el-icon-suitcase-1"></i>
      <span style="font-size:15px;padding-left:5px;">{{userInfo.email}}</span>
    </div>

    <p class="introduce">{{userInfo.introduce || introduce}}</p>
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
      <app-link v-for="menu in menus" :key="menu.path" :to="menu.path">
        <el-menu-item>
          <item :icon="menu.meta.icon" :title="menu.meta.name"></item>
        </el-menu-item>
      </app-link>
    </el-menu>
  </div>
</template>

<script>
import AppLink from "./Link";
import Item from "./Item";
import router from "@/router";
import { mainRoutes } from "@/router";

import { Message } from "element-ui";

export default {
  name: "SideTitle",
  components: {
    AppLink,
    Item,
  },
  data() {
    const routes = mainRoutes.filter((r) => !r.hidden);
    return {
      activeMenu: "1",
      isCollapse: false,
      introduce: "with great power comes great responsibility.",
      menus: routes,
    };
  },
  computed: {
    username() {
      return this.$store.getters.userInfo.username || "地狱鬼才";
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  methods: {
    handleSearch() {
      Message.info("功能尚未实现，敬请期待");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
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
  padding-top: 15px;
}
.introduce {
  padding-left: 5px;
  font-size: 14px;
}
</style>
