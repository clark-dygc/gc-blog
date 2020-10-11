<template>
  <div class="container" :style="{width: width , height: height }">
    <div class="video-container">
      <video :poster="poster" ref="videoPlayer" class="video-js"></video>
    </div>
    <div v-if="info && info.desc" class="info-container">
      <p class="info-desc">{{ info.desc }}</p>
      <span class="info-time">{{ info.time }}</span>
      <span class="info-views">{{ info.meta.views || 0 }}次播放</span>
    </div>
    <el-divider />
    <div class="user-info">
      <div class="user-icon">
        <img class="user-img" src="@/assets/cat.jpg" alt="user-icon" />
      </div>
      <div class="user-name">
        <h3>{{info.user.name}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "Video",
  props: {
    info: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    poster: {
      type: String,
      default: "https://placekitten.com/400/400",
    },
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
    console.log(this.width);
    console.log(this.height);
    this.$nextTick(() => {
      const el = this.$el;
      console.log(this.$refs["videoPlayer"]);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  },
};
</script>

<style scoped>
.container {
  background-color: #efefef;
  margin: 10px 10px 0 10px;
}
.video-container {
}
.info-container {
  padding: 5px 5px 0;
  border-bottom: 1px solid #efefef;
}
.info-desc {
  font-size: 20px;
  padding: 3px;
  margin: 0px;
  text-align: left;
}
.info-time {
  padding: 3px;
  margin-right: 10px;
  color: #333333;
  font-weight: 400;
  font-size: 14px;
}
.info-views {
  color: #333333;
  font-weight: 400;
  font-size: 14px;
}
.user-info {
  padding: 1px;
  display: flex;
  align-items: center;
  margin: 0;
}
.user-icon {
  margin: 5px 10px 0;
}
.user-img {
  border-radius: 20px;
  width: 40px;
  height: auto;
  display: block;
}
.user-name {
  margin-left: 2px;
}
.user-name > h3 {
  margin: 0;
}
</style>
