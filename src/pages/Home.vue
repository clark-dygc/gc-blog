<template>
  <div class="container">
    <div class="bg-img" :style="{'background-image': 'url(' + bgImgUrl + ')'}"></div>
    <div class="main">
      <div class="main-header">
        <img :src="headImgUrl" style="width:100px;height:100px;border-radius:50px;" />
        <div class="main-info">
          <span class="main-info-name">地狱鬼才</span>
          <i class="el-icon-help" />
          <span class="main-info-mail">1210037252@qq.com</span>
        </div>
      </div>
      <div class="item-container">
        <div class="item-info">
          <span>GitHub：</span>
          <el-link
            style="margin-bottom:4px;"
            href="https://github.com/clark-dygc/gc-blog"
            target="_blank"
            type="primary"
          >本项目地址</el-link>
        </div>
        <div class="item-info">
          <span>Demo：</span>
          <el-link
            style="margin-bottom:4px;"
            href="https://gc.dygc.site"
            target="_blank"
            type="primary"
          >演示地址</el-link>
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
    // Sticky,
  },
  data() {
    return {
      activeIndex: "2",
      bgImgUrl: require("@/assets/bg/book.jpg"),
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
.bg-img {
  width: 100%;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
}
.item-container {
  width: 90%;
  margin: 30px 5%;
  display: flex;
  flex-direction: column;
}
.item-info {
  height: auto;
  padding: 30px 50px;
  margin: 10px 0px;
  border-radius: 15px;
  background-color: #efefef;
}
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
  margin: 10px auto 0px;
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
