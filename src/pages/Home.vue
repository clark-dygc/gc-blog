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
        <div class="item-info">
          <h3>阿里图标</h3>
          <div class="icon-list">
            <i
              v-for="icon in gc_icons"
              :key="icon.icon"
              :class="icon.icon"
              class="icon-list-item-i"
              size="large"
            ></i>
          </div>
          <div class="icon-list">
            <el-button
              v-for="icon in gc_icons"
              :key="icon.icon"
              :icon="icon.icon"
              size="large"
              circle
              class="icon-list-item-btn"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky";
import gc from "@/utils/log";
import { mapState } from "vuex";
import gc_icons from "../assets/gc.icons.json";
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
      test_content: "",
      gc_icons: gc_icons,
    };
  },
  computed: {
    ...mapState(["arr", "obj"]),
  },
  created() {
    console.log(gc_icons);
  },
  methods: {
    goHome() {},
    goGithub() {},
    goGitCode() {},
    handleSelect() {},
    handlePush() {
      const now = Date.now();
      this.$store.dispatch("push", now.toString());
    },
    handleReset() {
      this.$store.dispatch("reset", ["FFF", "GGGG"]);
    },
    handleAdd() {
      const now = Date.now();
      this.obj[now] = "DDDDD";
      // this.$store.dispatch('addEle', [now.toString(), 'This is a value'])
    },
    handleDel() {
      console.log(this.obj);
      // this.$store.dispatch('delEle', now.toString())
    },
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
  background-attachment: scroll;
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
  /* background-color: rgba(255, 0, 0, 0.5) */
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
.icon-list {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.icon-list-item-i {
  margin: 10px;
}
.icon-list-item-btn {
  margin: 5px 10px;
}
</style>
