<template>
  <div>
    <sticky :sticky-top="0" :z-index="100">
      <div class="header">
        <el-page-header style="margin-top:25px;margin-left:25px;" @back="goBack" content="详情页面" />
      </div>
    </sticky>

    <div class="post-main">
      <h1 align="start" class="post-title">{{article.title}}</h1>
      <div class="author-info">
        <div class="author-avatar">
          <el-avatar size="medium" style="width:50px;height:50px;" :src="avatarSrc"></el-avatar>
        </div>
        <div style="margin: 20px 10px;height:60px;">
          <h3 style="padding:5px 0;margin:0">{{article.author}}</h3>
          <p style="padding:0;margin:0">{{ formatTime(article.create_time)}}</p>
        </div>
      </div>
      <el-divider />
      <div class="markdown-body content" v-html="article.content"></div>
      <el-divider />
      <div style="margin-top:50px;">
        <Comment :articleId="articleId" />

        <comment-list :list="comments" :numbers="commentCount"></comment-list>
      </div>

      <div class="footer">
        <el-button
          style="float:left;"
          icon="el-icon-d-arrow-left"
          circle
          type="danger"
          @click="handlePre"
        ></el-button>
        <el-button
          style="float:right;"
          icon="el-icon-d-arrow-right"
          circle
          type="danger"
          @click="handleNext"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api/article";
import MarkdownIt from "markdown-it";
const hljs = require("highlight.js");
import Sticky from "@/components/Sticky";
import gc from "@/utils/log";
import CommentList from "@/components/CommentList";
import Comment from "@/components/Comment";
import { mapGetters } from "vuex";

export default {
  name: "ArticleDetail",
  components: {
    Sticky,
    CommentList,
    Comment,
  },
  data() {
    return {
      article: {
        author: "gc",
        title: "这是一个测试的博客标题",
        desc: "这是一个测试的博客摘要",
        content: "这是一个测试的博客正文",
        create_time: "2020-09-23T09:22:13.679Z",
      },
      avatarSrc: require("@/assets/cat.jpg"),
      loading: false,
      numbers: 88,
      articleId: "",
    };
  },
  computed: {
    comments() {
      if (!this.articleId) {
        return [];
      }
      // 这里只作简单的排序
      const comments = this.$store.getters.getComments(this.articleId);
      return comments.sort((a, b) => {
        const at = new Date(a.create_time);
        const bt = new Date(b.create_time);
        return bt - at;
      });
    },
    commentCount() {
      return this.comments.length;
    },
  },
  created() {},
  activated() {
    if (!this.articleLoaded) {
      this.fetchArticle();
    }
  },
  methods: {
    handlePre() {
      this.$message.warning("功能尚实现，敬请期待");
    },
    handleNext() {
      this.$message.warning("功能尚实现，敬请期待");
    },
    goBack() {
      this.$router.push("/articles");
    },
    async fetchArticle() {
      const row = this.$route.query.row;
      if (!row) {
        return;
      }
      getArticleDetail({ id: row._id })
        .then((resp) => {
          const { code, message, data } = resp.data;
          if (code !== 0) {
            gc.error(new Error(`code: ${code}, message: ${message}`));
          } else {
            this.articleId = data._id;
            const md = new MarkdownIt({
              highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return (
                      '<pre class="hljs"><code>' +
                      hljs.highlight(lang, str, true).value +
                      "</code></pre>"
                    );
                  } catch (__) {}
                }

                return (
                  '<pre class="hljs"><code>' +
                  md.utils.escapeHtml(str) +
                  "</code></pre>"
                );
              },
            });
            data.content = md.render(data.content);
            this.article = data;

            this.$store.dispatch("comment/setComments", data.comments);
          }
        })
        .catch((err) => {
          gc.error(err);
        });
    },
  },
};
</script>


<style scoped>
.header {
  height: 80px;
  background-color: #f0f2f5;
  border: 2px solid #fff;
}
.post-main {
  width: 80%;
  margin-left: 10%;
  margin-top: 100px;
  height: 100%;
}
.post-title {
  --color-primary: #d95736;
  --color-primary-active: #bf4526;
  --font-primary: "Fira Sans", sans-serif;
  --font-secondary: "Libre Baskerville", serif;
  font-family: var(--font-primary);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
  z-index: 10;
  font-weight: 700;
  text-indent: -1px;
  color: #000;
  margin: 0 0 2rem;
  font-size: 3em;
  line-height: 1.25em;
}
.author-avatar {
  margin-top: 25px;
}
.author-info {
  display: flex;
  height: 100px;
}
.content {
  margin-bottom: 20px;
}
.footer {
  margin: 30px 20px 100px;
}
</style>
