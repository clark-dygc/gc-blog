<template>
  <div class="container">
    <h3 class="item item-title">{{item.name}}：</h3>
    <el-link class="item item-github" :href="item.github" target="_blank" type="primary">GitHub地址</el-link>
    <el-tooltip placement="top">
      <div slot="content">
        <div>
          <h3 style="display:inline-block;">{{ item.name }}</h3>
          <span style="padding-left: 30px;color:#efefef;">{{item.desc}}</span>
        </div>
        <img v-if="item.img" :src="item.img" />
      </div>
      <el-link class="item item-demo" :href="item.demo" target="_blank" type="primary">演示地址</el-link>
    </el-tooltip>

    <span class="item item-desc" v-if="item.desc">简介：{{item.desc}}</span>
  </div>
</template>

<script>
export default {
  name: "GitHubItem",
  props: ["item"],
};
</script>

<style scoped>
.container {
  padding: 10px 5px;
  border: 1px solid blue;
  border-radius: 5px;
  margin: 5px;
}
.item {
  font-size: 0.9rem;
  line-height: 30px;
  text-align: right;
  width: 150px;
  max-width: 200px;
}
.item-title {
  display: inline-block;
}
.item-github {
  width: 100px;
}
.item-demo {
  width: 60px;
}
.item-desc {
  padding-left: 15px;
  text-align: left;
}
</style>
