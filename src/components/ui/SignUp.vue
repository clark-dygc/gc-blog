<template>
  <div class="signup-form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :hide-required-asterisk="true"
      label-width="80px"
      label-position="top"
    >
      <h2>Sign Up</h2>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="yourname@email.com"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password" placeholder="..."></el-input>
      </el-form-item>
      <el-form-item>
        <p class="service-term">
          By clicking any of the Sign Up buttons
          <br />I agree to the
          <a target="_blank" href>terms of serivce</a>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;height:50px;" type="danger" @click="onSubmit">SIGN UP</el-button>
      </el-form-item>
      <el-form-item>
        <el-divider style="margin:10px;">or</el-divider>
      </el-form-item>

      <el-form-item>
        <el-button style="width:100%;" @click="signup('microsoft')">
          <!-- <i class="el-icon-menu third-signup-icon" size="large"></i> -->
          <span style="margin-left:30px;" class="third-signup-span">SIGN UP WITH MICROSOFT</span>
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%;" @click="signup('github')">
          <!-- <i class="el-icon-menu el-icon--left third-signup-icon" size="large"></i> -->
          <span style="margin-left:30px;" class="third-signup-span">SIGN UP WITH GITHUB</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "required",
            trigger: "blur",
          },
          {
            type: "email",
            message: "邮件格式错误",
            trigger: "blur",
          },
        ],
        password: [
          { required: "true", message: "required", trigger: "blur" },
          { min: 8, max: 20, message: "长度在8到20个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          this.$message.warning("输入内容有误");
          this.$refs["form"].resetFields();
        } else {
          this.$emit("signup");
          this.$message("功能未实现，敬请期待");
        }
      });
    },
    signup(type) {
      this.$message(`第三方${type}登录功能未实现，敬请期待`);
    },
  },
};
</script>

<style scoped>
.signup-form {
  width: 476px;
  height: auto;
  border: 1px solid #efefef;
  padding: 0 30px 20px;
  line-height: 2;
  background-color: white;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-rendering: geometricPrecision;
  font-family: fakt-web, Helvetica Neue, Hevetica, sans-serif;
  line-height: 2;
  color: rgba(0, 0, 0, 0.86);
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  box-sizing: border-box;
}
.service-term {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-rendering: geometricPrecision;
  font-family: fakt-web, Helvetica Neue, Hevetica, sans-serif;
  line-height: 2;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #777;
  box-sizing: border-box;
  margin: 0;
  font-size: 16px;
}
.third-signup-span {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  font-family: inherit;
  line-height: 30px;
  text-align: left;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.7px;
  color: #333;
  box-sizing: border-box;
}
.third-signup-icon {
  position: relative;
  left: 0px;
}
</style>
