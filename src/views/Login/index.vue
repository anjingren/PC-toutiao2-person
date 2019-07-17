<template>
  <div class="login-container">
    <el-card class="box-card">
        <div class="logo">
             <img src="../../assets/images/logo_index.png" alt class="logoimg" />
        </div>

      <el-form width="400" height="300">
          <el-form-item>
            <el-input v-model="formData.mobile" placeholder="请输入手机号码"></el-input>
         </el-form-item>
         <el-form-item>
            <el-input v-model="formData.code" placeholder="请输入验证码" class="leftinput"></el-input>
            <el-button style="float:right">获取验证码</el-button>
         </el-form-item>
         <el-form-item>
             <el-checkbox v-model="checked"></el-checkbox><span>我已阅读并同意
                 <el-link type="primary" :underline="false">用户协议</el-link>和
                 <el-link type="primary" :underline="false">隐私条款</el-link>
             </span>
         </el-form-item>
        <el-form-item>
            <el-button type="primary" class="loginbtn" @click="Login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: true
    }
  },
  methods: {
    Login () {

    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center;
  .el-card {
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .logo {
        width:400px;
        height: 50px;
        text-align: center;
        margin-bottom: 10px;
    }
    .logoimg {
      position: absolute;
      left:50%;
      transform: translate(-50%);

      width: 140px;
      height: 45px;
    }
        .el-form-item{
            margin-bottom: 15px;
        }
    .leftinput{
        width: 60%;
    }
    .loginbtn{
        width:100%;
    }
  }
}
</style>
