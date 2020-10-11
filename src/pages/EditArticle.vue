<template>
  <div>
    <sticky :z-index="10" :class-name="'sub-navbar'" :sticky-top="0">
      <div class="header">
        <div class="header-menu">
          <comment-dropdown style="margin-right:10px;" v-model="article.comment_disabled" />
          <el-button :loading="loading" type="danger" @click="handleUpdate">更新</el-button>
        </div>
      </div>
    </sticky>
    <el-divider style="background-color:black;height:4px;" />
    <div class="main">
      <div class="main-title">
        <el-row>
          <el-col :span="19">
            <el-input v-model="article.title" placeholder="输入标题" type="text" clearable />
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
            />
          </el-col>
        </el-row>
        <div class="main-editor">
          <!-- <Tinymce ref="editor" v-model="article.content" :height="400" /> -->
          <editor v-model="article.content" tabindex="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, updateArticle } from "@/api/article";
import Sticky from "@/components/Sticky.vue";
import CommentDropdown from "@/components/CommentDropdown.vue";
import { getObject, setObject } from "@/utils/dom";
import gc from "@/utils/log";
import Editor from "@/components/ui/Editor";

const db_article = "db_key__edit_article";

export default {
  name: "EditArticle",
  components: {
    Sticky,
    CommentDropdown,
    Editor,
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
      id: "",
    };
  },
  created() {
    this.fetchArticle();
  },
  activated() {
    if (this.loading) {
      return;
    }
    this.fetchArticle();
  },
  methods: {
    handleUpdate() {
      if (!this.checkArticle()) {
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("article/updateArticle", {
          id: this.id,
          title: this.article.title,
          desc: this.article.desc,
          content: this.article.content,
          author: this.$store.getters.userInfo.name || "UNKNOWN",
          state: 1, // 0->draft, 1->publish
        })
        .then((article) => {
          this.loading = false;
          this.$message.success("更新成功");
        })
        .catch((err) => {
          this.loading = false;
          this.$message.warning("更新失败: " + err.message);
        });
    },
    autoSave() {
      this.article = this.article || {};
      setObject(db_article, this.article);
    },
    fetchArticle() {
      const article = this.$route.query.article;
      if (!article) {
        return;
      }
      this.id = article._id;
      this.loading = true;
      getArticleDetail({ id: article._id })
        .then((resp) => {
          const { code, message, data } = resp.data;
          this.loading = false;
          if (code !== 0) {
            gc.error(new Error(`code: ${code}, message: ${message}`));
          } else {
            console.log(data);
            this.article = data;
          }
        })
        .catch((err) => {
          this.loading = false;
          gc.error(err);
        });
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
