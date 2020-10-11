<template>
  <div class="container">
    <video-player :options="videoOptions" :info="info" width="600px" height="auto" />
  </div>
</template>

<script>
import VideoPlayer from "@/components/ui/VideoPlayer";
export default {
  name: "VideoList",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: false,
        controls: true,
        fluid: true,
        sources: [
          {
            src: require("@/../public/video/funny01.mp4"),
            type: "video/mp4",
          },
        ],
      },
      info: {
        desc: "可爱的宝宝们",
        time: "十分钟前",
        user: {
          name: "天下第一",
        },
        meta: {
          likes: 123,
          comments: 10,
          views: 235,
        },
      },
    };
  },
};
</script>

<style scoped>
.container {
  padding: 10px 0;
}
</style>
