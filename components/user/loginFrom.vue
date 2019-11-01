<template>
  <div class="registerFrom">
    <el-form ref="form" 
    :model="formdata" 
    label-width="80px" 
    label-position="top" 
    style="padding:20px"
    :rules="rules"
    >
      <el-form-item prop="username">
        <el-input v-model="formdata.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formdata.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;" @click="loginbtn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "13790951925",
        password: "8888"
      },
      // 登录之前的验证规则
      rules: {
          username: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
        
      }
    }
    
  },
  methods: {
    // 登录提交
    loginbtn() {
      console.log(888)
      this.$store.dispatch('user/setUser',this.formdata)
      .then(res=>{
        console.log(this.$store.state.user.userinfo)
        this.$message.success("登录成功");
          this.$router.go(-1);
      })
      .catch(res=>{
        this.$message.warning("登录失败");
      })
    }
  }
}
</script>

<style>
</style>