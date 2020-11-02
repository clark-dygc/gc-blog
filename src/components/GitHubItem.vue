<template>
  <div class="container">
    <img class="title-icon" src="https://placekitten.com/100/100" alt="title-icon" />
    <div class="title-info">
      <h3 class="item item-title">{{item.name}}：</h3>
      <el-link class="item item-github" :href="item.github" target="_blank" type="primary">GitHub地址</el-link>
      <!-- <el-tooltip placement="top">
        <div slot="content">
          <div>
            <h3 style="display:inline-block;">{{ item.name }}</h3>
            <span style="padding-left: 30px;color:#efefef;">{{item.desc}}</span>
          </div>
          <img v-if="item.img" :src="item.img" />
        </div>
        <el-link class="item item-demo" :href="item.demo" target="_blank" type="primary">演示地址</el-link>
      </el-tooltip> -->

      <span class="item item-desc" v-if="item.desc">简介：{{item.desc}}</span>
    </div>
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
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
}
.title-icon {
  display: inline-block;
  border-radius: 40px;
  height: 80px;
}
.title-info {
}
.item {
  font-size: 0.9rem;
  line-height: 30px;
  text-align: right;
  width: 120px;
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
