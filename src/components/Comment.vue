<template>
  <el-form :model="commentForm" ref="commentForm" class="comment-form" :rules="rules">
    <el-form-item prop="content">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="写下你的评论..."
        v-model="commentForm.content"
        class="el-input"
        @focus="inputFocus"
      ></el-input>
    </el-form-item>
    <el-form-item ref="movein" id="movein" v-show="showOpBtns" style="float:right;height:30px;">
      <el-button type="primary" size="small" round @click="publish">发布</el-button>
      <el-button plain size="small" round @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addComment } from "@/api/article";
export default {
  name: "Comment",
  props: {
    articleId: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      showOpBtns: false,
      commentForm: {
        content: "",
      },
      rules: {
        content: [
          { min: 5, max: 200, message: "长度在5到200个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    publish() {
      const userInfo = this.$store.getters.userInfo;
      if (!userInfo || !userInfo.email) {
        this.$message.warning("请在登录后再操作");
        return;
      }

      // _id 是mongodb的自动生成的键值
      const user_id = userInfo._id;

      if (this.articleId !== "") {
        this.$store
          .dispatch("comment/addComment", {
            article_id: this.articleId,
            user_id,
            content: this.commentForm.content,
          })
          .then((resp) => {
            this.$refs.commentForm.resetFields()
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    cancel() {
      this.showOpBtns = false;
      this.$refs["movein"].$el.style.height = "0px";
    },
    inputFocus(event) {
      this.showOpBtns = true;
      this.$refs["movein"].$el.style.height = "30px";
    },
  },
};
</script>
<style>
.comment-form > .el-form-item {
  margin-bottom: 5px;
}
.comment-form
  > .el-form-item
  > .el-form-item__content
  > .el-input
  > .el-textarea__inner {
  background-color: #efefef;
}
</style>
<style scoped>
.el-input {
  background-color: #efefef;
}
#movein {
  transition: height 0.5s;
}
</style>
