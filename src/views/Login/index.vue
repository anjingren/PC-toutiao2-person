<template>
  <div class="login-container">
    <el-card class="box-card">
        <div class="logo">
             <img src="../../assets/images/logo_index.png" alt class="logoimg" />
        </div>

      <el-form width="400" height="300" :rules="rules" ref="loginForm" v-model="formData" :model="formData">
          <el-form-item prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号码"></el-input>
         </el-form-item>
         <el-form-item prop="code">
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
            <el-button type="primary" class="loginbtn" @click="Login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      // rule 是
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(Error('手机号码格式不正确'))
      }
    }

    return {
      formData: {
        mobile: '13911111111',
        code: '246810'
      },
      // loginForm: null,
      checked: true,
      rules: {
        mobile: [{ validator: checkMobile, trigger: 'blur' }

        ],
        code: [{ required: true, message: '验证码必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    Login () {
      // 点击登录按钮的时候，同时也要进行验证
      this.$refs.loginForm.validate(async (valid) => {
        //
        if (valid) {
          // 如果验证通过，那么，我们就登录进入首页
          // 发送请求，进入首页
          const { data: { data } } = await this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.formData)
          // console.log(data)
          // 这个时候通过返回时获取token。token是一个字符串，但是我们要获取设置session，设置发送请求是需要的对象格式
          // 设置session，前面是名字，后面是获取的内容,我们将其转变为一个字符串格式
          // 现在是在返回的数据中有token，我们需要的是在登录后去设置这个token，而不是getItem，因为现在还没有，所以获取的回事null
          // 所以，我们现在要进行setItem,本地存储token
          // console.log(data.data.data)
          window.sessionStorage.setItem('toutiao2', JSON.stringify(data))
          // 设置token的时候，setItem没有返回值，所以，在打印user的时候，会是undefined
          this.$router.push('/')
        }
      })
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
