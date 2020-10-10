<template>
  <div class="container">
    <div class="bg-wrapper">
      <div class="bg-container">
        <div class="blur-bg" :style="{'background-image': 'url(' + bgImgUrl + ')'}"></div>
      </div>
      <div class="title-container">
        <img :src="bgImgUrl" alt="abcdefg" class="title-img" />
      </div>LoginBox
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginBox",
  data() {
    return {
      bgImgUrl: require("@/assets/ui/badge.png"),
    };
  },
};
</script>
<style scoped>
.container {
  width: 300px;
  height: 600px;
  background-color: white;
  margin: 10px 10px 10px 50px;
  box-shadow: 0 2px 12px 0 rgba(200, 0, 100, 0.5);
}
.bg-wrapper {
  width: 100%;
  border-radius: 5px;
  height: 100px;
}
.bg-container {
  --vh: 7.54px;
  font-family: "Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  text-align: center;
  color: #333;
  box-sizing: initial;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
  background: rgba(241, 241, 241, 0.8);
}
.blur-bg {
  --vh: 7.06px;
  font-family: "Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  text-align: center;
  color: #333;
  pointer-events: none;
  box-sizing: initial;
  height: 100%;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  filter: blur(40px) grayscale(1);
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300px;
  display: block;
  opacity: 0.4;
  transition: 1s ease 1s;
}
.title-container {
  --vh: 7.54px;
  font-family: "Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  pointer-events: auto;
  text-align: center;
  color: #333;
  box-sizing: initial;
  font-size: 18px;
  position: relative;
}
.title-img {
  --vh: 7.54px;
  font-family: "Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  pointer-events: auto;
  text-align: center;
  color: #333;
  font-size: 18px;
  border: 0;
  box-sizing: initial;
  width: auto;
  height: 58px;
  display: inline-block;
  margin: 0 0 11px;
  vertical-align: middle;
}
</style>
