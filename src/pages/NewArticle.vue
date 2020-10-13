<template>
  <div>
    <sticky :z-index="10" :class-name="'sub-navbar'" :sticky-top="0">
      <div class="header">
        <div class="header-menu">
          <comment-dropdown style="margin-right:10px;" v-model="article.comment_disabled" />
          <el-button :loading="loading" type="danger" @click="handlePublish">发布</el-button>
          <el-button type="success" @click="handleDraft">草稿</el-button>
          <el-button type="danger" @click="handleClear">重置</el-button>
        </div>
      </div>
    </sticky>
    <el-divider style="background-color:black;height:4px;" />
    <div class="main">
      <div class="main-title">
        <el-row>
          <el-col :span="19">
            <el-input
              tabindex="1"
              v-model="article.title"
              placeholder="输入标题"
              type="text"
              clearable
            />
          </el-col>
          <el-col :span="5">
            <div class="main-rate">
              <span>重要性:</span>
              <el-rate
                v-model="article.importance"
                :max="5"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                :low-threshold="1"
                :high-threshold="3"
                style="display:inline-block"
              />
            </div>
          </el-col>
        </el-row>
        <el-row style="margin:5px 0px;">
          <el-col :span="19">
            <el-input
              v-model="article.desc"
              placeholder="输入博文摘要"
              type="textarea"
              maxlength="100"
              show-word-limit
              clearable
              :rows="1"
              tabindex="2"
            />
          </el-col>
        </el-row>
        <div class="main-editor">
          <mavon-editor
            ref="editor"
            class="md"
            v-model="article.content"
            :defaultOpen="'preview'"
            :toolbarsFlag="true"
            :scrollStyle="true"
            :ishljs="true"
            tabindex="3"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from "@/components/Sticky.vue";
import CommentDropdown from "@/components/CommentDropdown.vue";
import { getObject, setObject } from "@/utils/dom";
import { uploadImage } from "@/api/file";

const db_article = "db_key__new_article";

export default {
  name: "NewArticle",
  components: {
    Sticky,
    CommentDropdown,
  },
  data() {
    return {
      loading: false,
      article: {
        comment_disabled: false,
        title: "如何使用vue实现一个简单的blog",
        content:
          "<p>本文简单的介绍如何使用新建一个vue项目</p><h4>第一步：新建项目</h4>",
        importance: 3,
        author: "",
        desc: "",
      },
      published: false,
    };
  },
  created() {
    this.article = getObject(db_article, {
      comment_disabled: false,
      title: "",
      content: "",
      importance: 3,
      author: "",
      desc: "",
    });
  },
  deactivated() {
    if (this.published) {
      this.reset();
    }
  },
  methods: {
    handlePublish() {
      if (!this.checkArticle()) {
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("article/addArticle", {
          title: this.article.title,
          desc: this.article.desc,
          content: this.article.content,
          author: this.$store.getters.userInfo.name || "UNKNOWN",
          state: 1, // 0->draft, 1->publish
        })
        .then((article) => {
          this.loading = false;
          this.$message.success("发布成功");
          this.published = true;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.warning("发布失败: " + err.message);
        });
    },
    handleDraft() {
      this.$message.info("该功能尚未实现，敬请期待");
    },
    handleClear() {
      this.$confirm("此操作将永久删除该文章，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((_) => {
          this.reset();
        })
        .catch((err) => {
          // do nothing
        });
    },
    reset() {
      this.article = {
        title: "",
        content_disabled: false,
        importance: 3,
        author: "",
        content: "",
      };
    },
    autoSave() {
      this.article = this.article || {};
      setObject(db_article, this.article);
    },
    checkArticle() {
      const article = this.article;
      if (!article) {
        return false;
      }
      if (!article.title) {
        this.$message.info("标题不能为空");
        return false;
      }
      if (!article.desc) {
        this.$message.info("摘要不能为空");
        return false;
      }
      if (!article.content) {
        this.$message.info("正文不能为空");
        return false;
      }
      return true;
    },
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
    article: {
      handler(curVal, oldVal) {
        this.autoSave();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.header {
  background-color: lightgray;
  width: 100%;
  height: 60px;
}
.header-menu {
  float: right;
  padding: 10px 25px;
}
.main {
  margin: 20px;
}
.main-title {
  margin: 30px 0px;
}
.main-rate {
  margin: 5px 15px 5px;
}
.main-editor {
  margin-top: 15px;
}
.md {
  height: 500px;
}
</style>
