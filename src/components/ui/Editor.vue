<template>
  <mavon-editor
    ref="editor"
    class="md"
    v-model="value"
    :defaultOpen="'preview'"
    :toolbarsFlag="true"
    :scrollStyle="true"
    :ishljs="true"
    tabindex="3"
    @imgAdd="$imgAdd"
    @imgDel="$imgDel"
  />
</template>

<script>
/**
 * todo-list
 * 1. 未来将更多的功能封装到这个组件中来
 */
import { uploadImage } from "@/api/file";
export default {
  name: "Editor",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      uploadImage(formdata)
        .then((resp) => {
          const { code, message, data } = resp.data;
          if (code !== 0) {
            console.error(`code: ${code}, message: ${message}`);
            return;
          }
          this.$refs["editor"].$img2Url(pos, data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    $imgDel(pos, $file) {
      console.log("do nothing...");
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.$emit("input", this.value);
    },
  },
};
</script>
