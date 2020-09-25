<template>
  <div>
    <sticky :z-index="100" :sticky-top="0">
      <div class="sticky-title">点击卡片显示英文介绍</div>
    </sticky>
    <div style="margin-top:30px;">
      <div class="home">
        <el-card
          class="el-card"
          shadow="hover"
          style="width:280px;margin:10px;"
          height="600"
          v-for="flower in flowers"
          :key="flower.path"
          @click.native="handleClick(flower)"
        >
          <template slot="header">
            <h3 class="flower-title">{{flower.name}}</h3>
            <span class="flower-title-en">{{flowername(flower.path)}}</span>
          </template>
          <div class="img-container">
            <img class="img-flower" :src="srcUrl(flower.path)" />
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog :title="dialogTitle" width="30%" :visible.sync="dialogVisible">
      <p>{{dialogContent}}</p>
    </el-dialog>
  </div>
</template>
<script>
import Sticky from "@/components/Sticky.vue";
import flowers from "@/config/flowers.json";
import path from "path";

export default {
  name: "Flowers",
  components: {
    Sticky,
  },
  data() {
    return {
      flowers: flowers,
      dialogTitle: "",
      dialogContent: "",
      dialogVisible: false,
    };
  },
  methods: {
    srcUrl(p) {
      return require("@/assets/flowers/" + p);
    },
    flowername(_path) {
      if (/.png/.test(_path)) {
        return path.basename(_path, ".png");
      } else if (/.jpg/.test(_path)) {
        return path.basename(_path, ".jpg");
      } else if (/.gif/.test(_path)) {
        return path.basename(_path, ".gif");
      } else if (/.jpeg/.test(_path)) {
        return path.basename(_path, ".jpeg");
      } else {
        return path.basename(_path);
      }
    },
    handleClick(flower) {
      if (!flower) {
        return;
      }
      this.dialogVisible = true;
      this.dialogTitle = flower.name;
      this.dialogContent = flower.desc;
    },
  },
};
</script>

<style>
/**这里必须是全局的css */
.sub-navbar {
  background-color: red;
}
</style>
<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.img-flower {
  font-family: "Crimson Text", serif;
  color: #333;
  font-size: 16px;
  line-height: 26px;
  width: 260px;
  height: auto;
  padding: 0;
  border: 0;
  display: block;
  margin: 5px auto 5px auto;
  max-width: 100%;
}
.el-card:hover {
  border: 2px solid red;
}
.img-container {
  width: 100%;
}
.flower-title {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  width: auto;
  float: left;
}
.flower-title-en {
  font-size: 12px;
  font-weight: 500;
  margin: 15px 5px;
  padding: 15px 5px;
}
.sticky-title {
  width: 100%;
  height: 20px;
  background-color: #f0f2f5;
  text-align: center;
  padding: 5px;
}
</style>
