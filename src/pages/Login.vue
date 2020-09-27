<template>
  <div class="login-container">
    <div class="box">
      <div class="div-left">
        <div class="div-title">
          <h1 class="h1-title">地狱鬼才</h1>
          <h2 class="h2-desc">如果你今天不开始，明天还是如此</h2>
        </div>
      </div>
      <div class="div-right">
        <el-card>
          <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username" placeholder="邮箱或手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loginLoading"
                class="el-button-submit"
                type="primary"
                @click="handleSubmit"
              >
                <span class="submit-btn">登录</span>
              </el-button>
            </el-form-item>
            <a class="forget-pwd" target="_blank" @click="handleForgetPwd">忘记密码？</a>
            <el-divider></el-divider>
            <el-form-item>
              <el-button class="el-button-create" type="primary" @click="handleCreate">新建账户</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- 以下是注册窗口 -->
    <el-dialog :visible.sync="dialogVisible" width="420px">
      <template slot="title">
        <h1 style="margin:0;padding:0">注册</h1>
        <span style="margin:0;padding:0">快速又简单。</span>
      </template>
      <el-divider />
      <el-form
        ref="registerForm"
        :model="registerForm"
        class="register-form"
        :rules="registerRules"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="registerForm.email" placeholder="邮箱或手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" placeholder="创建密码"></el-input>
        </el-form-item>
        <span class="option-tip">出生日期</span>
        <el-form-item>
          <el-col :span="7">
            <el-select v-model="registerForm.year">
              <span>年份</span>
              <el-option
                v-for="option in years"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-select v-model="registerForm.month">
              <el-option
                v-for="option in months"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-select v-model="registerForm.day">
              <el-option
                v-for="option in days"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <span class="option-tip">性别</span>
        <el-form-item>
          <el-col :span="7">
            <el-radio style="width: 100px;" border v-model="registerForm.gender" label="男"></el-radio>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-radio style="width: 100px;" border v-model="registerForm.gender" label="女"></el-radio>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-radio style="width: 100px;" border v-model="registerForm.gender" label="隐藏"></el-radio>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button-register" type="primary" @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
 <script>
import { getDayPerMonth, validateMail, validatePhone } from "../utils/utils";
import { Message } from "element-ui";

import gc from "../utils/log";

export default {
  name: "Login",
  data() {
    const now = Date.now();
    const thisYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 105; i++) {
      years.push({
        value: thisYear - i,
        label: thisYear - i,
      });
    }
    const months = [];
    for (let i = 1; i < 13; i++) {
      months.push({
        value: i,
        label: i,
      });
    }

    const validateUsername = (rule, username, callback) => {
      if (!username) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, password, callback) => {
      if (!password) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };

    const validateMail2 = (rule, mail, callback) => {
      if (!mail) {
        callback(new Error("邮箱或手机号不能为空"));
      } else {
        console.log(mail);
        if (!validateMail(mail) && !validatePhone(mail)) {
          callback(new Error("邮箱或手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        username: "1220037252@qq.com",
        password: "gc910612",
      },
      registerForm: {
        username: "gc",
        password: "gc910612",
        phonenumber: "13916017274",
        email: "1210037253@qq.com",
        year: thisYear,
        month: "1",
        day: "1",
        gender: "男",
      },
      loginRules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        email: [{ required: true, validator: validateMail2, trigger: "blur" }],
      },
      registerRules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        email: [{ required: true, validator: validateMail2, trigger: "blur" }],
      },
      dialogVisible: false,
      years: years,
      months: months,
      loginLoading: false,
    };
  },
  computed: {
    days() {
      const ds = this.getDays();
      const ops = [];
      for (let i = 0; i < ds; i++) {
        ops.push({
          value: i + 1,
          label: i + 1,
        });
      }
      return ops;
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          Message.warning("输入有误");
        } else {
          this.loginLoading = true;
          const { username, password } = this.loginForm;
          gc.info(`username: ${username}, password: ${password}`);
          this.$store
            .dispatch("user/login", {
              email: username,
              password: password,
            })
            .then((resp) => {
              this.loginLoading = false;
              gc.log("------------login succeed------------");
              gc.info(resp);

              this.$router.push({ path: "/" });
              // gc.info(this.$store.getters.userInfo)
            })
            .catch((err) => {
              this.loginLoading = false;
              gc.error("------------login failed------------");
              gc.error(err);
            });
        }
      });
    },
    handleCreate() {
      this.dialogVisible = true;
    },
    handleRegister() {
      gc.log("<<<  开始注册  >>>");
      gc.info(this.registerForm);
      this.$refs.registerForm.validate((valid) => {
        if (!valid) {
          Message.warning("输入不正确，请重新输入");
        } else {
          const frm = this.registerForm;
          const userInfo = {
            name: frm.username,
            password: frm.password,
            email: frm.email,
            introduce: "",
            type: 0,
          };
          this.$store
            .dispatch("user/register", userInfo)
            .then((userInfo) => {
              const msg = "---<<< 注册成功 >>>---";
              gc.info(msg);
              Message.success(msg);
              gc.info(userInfo);

              this.$router.push({ path: "/" });
            })
            .catch((err) => {
              const msg = "---<<< 注册失败 >>>---";
              Message.warning(msg + ":" + err.message);
            });
        }
      });
    },
    handleForgetPwd() {
      Message.warning("功能尚实现，敬请期待");
    },
    getDays() {
      const y = Number(this.registerForm.year);
      const m = Number(this.registerForm.month);
      return getDayPerMonth(y, m);
    },
  },
};
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f0f2f5;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  margin-top: 175px;
}
.div-left {
  width: 50%;
  height: 300px;
  font-weight: normal;
}
.div-right {
  width: 40%;
  height: 300px;
}
.div-title {
  margin-left: 25%;
  margin-top: 8%;
}
.h1-title {
  margin: 0;
  display: inline-block;
  letter-spacing: normal;
  text-rendering: optimizelegibility;
  color: blueviolet;
  padding: 0 0 20px;
  font-family: SFProDisplay-Regular, Helvetica, Arial, sans-serif;
  font-size: 40px;
  font-weight: normal;
  line-height: 50px;
  width: 500px;
}
.h2-desc {
  margin: 0;
  display: inline-block;
  letter-spacing: normal;
  text-rendering: optimizelegibility;
  color: #1c1e21;
  padding: 0 0 20px;
  font-family: SFProDisplay-Regular, Helvetica, Arial, sans-serif;
  font-size: 29px;
  font-weight: normal;
  line-height: 32px;
  width: 500px;
}
.el-card {
  width: 380px;
  height: 350px;
  border-radius: 8px;
}
.el-button-submit {
  width: 100%;
}
.submit-btn {
  font-size: 22px;
  font-weight: bold;
}
.forget-pwd {
  direction: ltr;
  line-height: 1.34;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: #1877f2;
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  margin-left: 40%;
  margin-top: 0px;
}
.el-button-create {
  width: 40%;
  margin-left: 30%;
  font-weight: bold;
  text-align: center;
  text-shadow: none;
  vertical-align: middle;
  color: #fff;
  background-color: #42b72a;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
}
.option-tip {
  text-align: left;
  color: #606770;
  font-family: SFProText-Medium, Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
  margin-bottom: 0;
  margin-top: 2px;
  margin-left: 5px;
}
.el-button-register {
  width: 40%;
  position: absolute;
  margin-left: 30%;
}
.el-divider {
  width: 100%;
}
</style>
<style>
.el-dialog__body {
  padding-top: 0px;
}
.el-dialog__header {
  padding-bottom: 5px;
}
.el-divider--horizontal {
  margin: 10px 0;
}
</style>
