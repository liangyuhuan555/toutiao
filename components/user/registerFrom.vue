<template>
  <div class="login_box">
    <div class="loginfrom">
      <el-form
        label-position="top"
        :model="formdata"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        ref="form"
      >
        <el-form-item prop="username">
          <el-input placeholder="用户名/手机号" v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input placeholder="验证码" v-model="formdata.captcha" style="cursor:pointer;">
            <template slot="append">
              <div @click="registercode">获取验证码</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="你的名字" v-model="formdata.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="formdata.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            placeholder="请确认密码"
            type="password"
            v-model="formdata.password2"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="registsubmitted">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formdata.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formdata: {
        username: "",
        nickname: "8888",
        captcha: "8888",
        password: "8888",
        password2: "8888"
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    }
  },
  methods: {
    // 点击获取验证码
    registercode() {
      // 发送请求之前需要验证手机号码的合法性
      
      let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
      if (reg.test(this.formdata.username)) {
        // 然后post请求把参数带过去 tel是文档规定的字段
        this.$axios
          .post("/captchas", {tel: this.formdata.username })
          .then(res => {
            console.log("发送请求成功");
            console.log(res);
            
          });
      } else {
        // 否则就提示手机号不合法
        this.$message.warning("手机号不合法");
      }
    },
    // 点击注册
  registsubmitted() {
    // 提交之前需要再次验证信息的合法性
    this.$refs.form.validate(valid => {
      if (valid) {
        // 把from这个dom下面所有表单信息进行验证,但是需要把确认密码这个不需要验证的对象删除
        // delete this.formdata('password2');
        // 还有一种方式删除
        let { password2, ...resform } = this.formdata;
        console.log(resform)
        // 发送请求提交注册
        this.$axios.post("/accounts/register", resform)

        .then(res => {
          console.log(res)
        })
      }
    })
  }
  }
  
}
</script>

<style lang='less' scoped>
.loginfrom {
  padding: 20px;
}
</style>