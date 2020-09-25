<template>
  <div>
    <div class="header">
      <div class="header-title">Posts</div>
      <div class="header-new-post">
        <el-button type="primary" @click="handleNewPost">New Post</el-button>
      </div>
      <div class="header-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          @select="handleSelect"
          style="max-height:38px;"
        >
          <el-submenu index="1" popper-class="el-submenu-custom">
            <template slot="title">
              <span>{{selectedStatus}}</span>
            </template>
            <el-menu-item index="1-1">所有文章</el-menu-item>
            <el-menu-item index="1-2">草稿</el-menu-item>
            <el-menu-item index="1-3">已布</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>Sort by: {{selectedOrder}}</span>
            </template>
            <el-menu-item index="2-1">Newest</el-menu-item>
            <el-menu-item index="2-2">Oldest</el-menu-item>
            <el-menu-item index="2-3">Recently updated</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>

    <div class="table-container">
      <el-table
        :data="posts"
        border
        style="width:100%"
        stripe
        :cell-style="cellStyle"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @cell-click="handleCellClick"
      >
        <el-table-column key="title" label="TITLE">
          <template slot-scope="scope">
            <div style="line-height:10px;margin:0;padding:0">
              <h3 class="title">{{ scope.row.title}}</h3>
              <p class="desc">{{ scope.row.desc }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="重要性" width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.importance" disabled></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template slot-scope="scope">
            <span>{{formatTime(scope.row.create_time, true)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="100">
          <template slot-scope="scope">{{scope.row.author || '地狱鬼才'}}</template>
        </el-table-column>
        <el-table-column fixed="right" width="80" label="操作" class="operation">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleComand">
              <span class="el-dropdown-link">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{article:scope.row, type: 1}" icon="el-icon-star-on">置顶</el-dropdown-item>
                <el-dropdown-item :command="{article:scope.row, type: 2}" icon="el-icon-edit">编辑</el-dropdown-item>
                <el-dropdown-item
                  :command="{article:scope.row, type: 3}"
                  icon="el-icon-delete-solid"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import gc from "@/utils/log";
import { mapState } from "vuex";
export default {
  name: "Articles",
  components: {},
  data() {
    return {
      activeIndex: "1",
      selectedStatus: "所有文章",
      selectedOrder: "Newest",
      loading: false,
    };
  },
  computed: {
    ...mapState({
      posts: (state) => {
        return state.article.posts;
      },
    }),
  },
  mounted() {
    this.loading = true;
    const query = {};
    this.$store
      .dispatch("article/getArticleList", query)
      .then((resp) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.posts = [];
      });
  },
  methods: {
    cellStyle() {
      return "padding:3px;";
    },
    handleNewPost() {
      this.$router.push("/new_article");
    },
    handleCellClick(row, column, cell, event) {
      if (column.label === "操作") {
        return;
      }
      this.$router.push({
        path: "/article_detail",
        query: {
          row: row,
        },
      });
    },
    handleComand({ article, type }) {
      if (type === 3) {
        this.handleDelete(article);
      } else if (type === 1) {
        this.handleTop(article);
      } else if (type === 2) {
        this.handleEdit(article);
      }
    },
    handleSelect(key, path) {
      if (key === "1-1") {
        this.selectedStatus = "所有文章";
      } else if (key === "1-2") {
        this.selectedStatus = "草稿";
      } else if (key === "1-3") {
        this.selectedStatus = "发布";
      } else if (key === "2-1") {
        this.selectedOrder = "Newest";
      } else if (key === "2-2") {
        this.selectedOrder = "Oldest";
      } else if (key === "2-3") {
        this.selectedOrder = "Recently updated";
      }
      console.log(`key: ${key}, path: ${path}`);
    },
    handleTop(article) {
      this.$message.info("功能未实现");
      gc.info("handleTop: " + article.title);
    },
    handleEdit(article) {
      gc.info("handleEdit: " + article.title);

      this.$router.push({
        path: "/edit_article",
        query: {
          article: article,
        },
      });
    },
    handleDelete(article) {
      this.$confirm("此操作将永久删除该文章，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((_) => {
          this.$store
            .dispatch("article/delArticle", { id: article._id })
            .then((resp) => {
              console.log(resp);
              this.$message({
                type: "info",
                message: "删除成功",
              });
            })
            .catch((err) => {
              gc.error(err.message);
              this.$message({
                type: "info",
                message: "删除出错",
              });
            });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.header-menu .el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 35px;
  line-height: 35px;
  color: black;
  margin: 0px;
  font-size: 13px;
  width: auto;
  border-right: 2px solid rgba(100, 100, 10, 0.1);
}
</style>

<style scoped>

.header {
  height: 60px;
  background-color: #f0f2f5;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 25px 20px 3px;
  border: 2px solid #fff;
}
.table-container {
  margin: 2px 40px;
}
.header-menu {
  float: right;
  margin-right: 15px;
}
.el-menu-demo {
  height: 50px;
}
.header-title {
  float: left;
  height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  padding-left: 20px;
}
.header-new-post {
  float: right;
  margin-bottom: 20px;
  height: 50px;
}
.title {
  padding-left: 5px;
}
.desc {
  font-size: 12px;
  padding-left: 5px;
  line-height: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
