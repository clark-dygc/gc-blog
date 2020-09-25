<template>
  <el-container>
    <el-aside width="250px" style="background-color:#f0f2f5">
      <SideTitle />
    </el-aside>
    <el-main class="el-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <el-backtop target=".el-main"></el-backtop>
    </el-main>
  </el-container>
</template>

<script>
import SideTitle from "./components/SideTitle";
export default {
  name: "Layout",
  components: {
    SideTitle,
  },
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.getters.userInfo.username || "地狱鬼才";
    },
  },
};
</script>
<style>
.el-main {
  background-color: #ffffff;
  width: 100%;
  margin: 0px;
  padding: 0px;
  position: absoulte;
  top: 0;
}
</style>

<style scoped>
.el-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
