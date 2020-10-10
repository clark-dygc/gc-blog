<template>
  <div class="container">
    <div class="bg-img" :style="{'background-image': 'url(' + bgImgUrl + ')'}">
      <div class="bg-title-container">
        <h1 class="bg-title">个人博客</h1>
      </div>
    </div>
    <div class="main">
      <div class="main-header">
        <img :src="headImgUrl" style="width:100px;height:100px;border-radius:50px;" />
        <div class="main-info">
          <span class="main-info-name">魑魅魍魉</span>
          <i class="el-icon-help" />
          <span class="main-info-mail">1210037252@qq.com</span>
        </div>
      </div>
      <div class="item-container">
        <div class="item-info">
          <GitHubItem v-for="item in projects" :key="item.github" :item="item"></GitHubItem>
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
import GitHubItem from "@/components/GitHubItem";
import gc from "@/utils/log";
import { mapState } from "vuex";
import gc_icons from "../assets/gc.icons.json";

export default {
  name: "Home",
  components: {
    // Sticky,
    GitHubItem,
  },
  data() {
    return {
      show3: true,
      testForm: {
        username: "",
      },
      toggle: "yes",
      activeIndex: "2",
      bgImgUrl: require("@/assets/bg/book.jpg"),
      headImgUrl: require("@/assets/cat.jpg"),
      test_content: "",
      gc_icons: gc_icons,
      projects: [
        {
          name: "个人博客",
          github: "https://github.com/clark-dygc/gc-blog",
          demo: "https://gc.dygc.site/",
          desc: "这是一个简单的个人博客，目前还在完善中...",
          img: require("@/assets/gc-blog.png"),
        },
        {
          name: "Events-App",
          github: "https://github.com/clark-dygc/events-app",
          demo: "https://gc.dygc.site:8081/",
          desc: "这是一个供学习scss而clone的项目",
          img: require("@/assets/events-app.png"),
        },
      ],
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
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.bg-title-container {
  text-align: left;
  padding: 20px 50px;
}
.bg-title {
  font-size: 3em;
  color: #efefef;
  text-shadow: 1px 1px 3px blue;
}
</style>
