<template>
  <div class="comment-list">
    <div class="top-title">
      <span>{{ numbers }}条评论</span>
    </div>

    <div v-for="(item, i) in list" :key="i" class="item">
      <div class="item-header">
        <div class="author">
          <div class="avatar">
            <img
              src="@/assets/cat.jpg"
              alt="默认图片"
              style="width:60px;height:auto;border-radius:30px;"
            />
          </div>
        </div>
        <div class="info">
          <div class="name">{{item.user.name}}</div>
          <div class="time">{{ formatTime(item.create_time) }}</div>
        </div>
      </div>
      <div class="comment-main">
        <div class="comment-detail">{{ item.content}}</div>
        <!-- <div class="comment-footer">
          <i class="el-icon-thumb footer-item" />
          <span class="likes footer-item">{{item.likes || 88}}</span>
          <i class="el-icon-heavy-rain footer-item" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList",
  props: {
    list: {
      default: [],
    },
    numbers: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.comment-list {
  text-align: left;
  position: relative;
  padding-top: 30px;
  margin-top: 30px;
}
.avatar {
  position: absolute;
  left: 0px;
}
.top-title {
  padding-bottom: 30px;
  font-size: 17px;
  font-weight: 700;
  border-bottom: 1px solid #f0f0f0;
}
.info {
  margin-top: 10px;
  margin-left: 80px;
}
.item {
  position: relative;
  padding: 20px 0 30;
}
.comment-main {
  margin-left: 80px;
}
.comment-detail {
  margin: 10px 0 20px 0px;
}
.footer-item {
  margin: 0 5px;
}
</style>
