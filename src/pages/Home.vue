<template>
  <div class="container">
    <sticky :sticky-top="0" :z-index="100">
      <div class="header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="#000"
          active-text-color="#000"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
      </div>
    </sticky>
    <div class="main">
      <div class="main-header">
        <img :src="headImgUrl" style="width:100px;height:100px;border-radius:50px;" />
        <div class="main-info">
          <span class="main-info-name">地狱鬼才</span>
          <i class="el-icon-help" />
          <span class="main-info-mail">1210037252@qq.com</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import gc from "@/utils/log";
export default {
  name: "Home",
  components: {
    Sticky,
  },
  data() {
    return {
      activeIndex: "2",
      headImgUrl: require("@/assets/cat.jpg"),
    };
  },
  methods: {
    goHome() {},
    goGithub() {},
    goGitCode() {},
    handleSelect() {},
  },
};
</script>

<style>
</style>
<style scoped>
.header {
  width: 90%;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
}
.main {
  width: 100%;
}
.main-header {
  width: 90%;
  height: 100px;
  padding: 0;
  margin: 100px auto 0px;
  display: flex;
  justify-content: flex-start;
  background-color: #efefef;
}
.main-info {
  margin-left: 20px;
}
.main-info-name {
  line-height: 50px;
  font-size: 30px;
  margin-top: 10px;
  display: block;
}
</style>
