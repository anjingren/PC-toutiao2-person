<template>
  <div class="home-container">
    <el-container>
      <el-aside  :class="{close2:collapse}" class="homeaside" style="width:200px">
        <div class="asidlogo" :class="{close:collapse}" ></div>
        <!-- default-active 默认的路径，这个时候就不能再写index的值了，我们用$route.path 同时就要是绑定这个属性了，前加上冒号-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border:0"
          :collapse="collapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/content">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/images">
            <i class="el-icon-document"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-position"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comments">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold hedericon" @click="toogleIcon"></span>
          <span class="gs">江苏传智播客教育有限公司</span>
          <div class="header-right">
            <img src="../../assets/images/avatar.jpg" alt />
            <el-dropdown>
              <span class="el-dropdown-link">
                黑马小哥
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    toogleIcon () {
      // 点击的时候，加上collapse的值要进行切换，再次点击，去掉class
      this.collapse = !this.collapse
    },
    logout () {
      // 退出登录要把session清除  setItem  getItem  removeItem
      window.sessionStorage.removeItem('toutiao2')
      // 然回到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
body {
  padding: 0;
  margin: 0;
  position: relative;
}
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .homeaside {
    width:200px !important;
    background-color: #002033;
    height: 600px;
  }
//   .element.style{
//        width:200px;
//   }
  .asidlogo {
    height: 60px;
    vertical-align: middle;
    box-sizing: border-box;
    background: #002840 url(../../assets/images/logo_admin.png) no-repeat center;
    background-size: 140px;
    // line-height: 60px;
    // padding:10px 0 0 10px;
  }
  .close {
    width: 50px;
    background:#002840 url(../../assets/images/logo_admin_01.png) no-repeat center;
    background-size: 36px auto;
  }
  .close2{
      background:#002840;
      width:60px ! important;
  }
  .el-header {
    height: 50px;
    border-bottom: 1px solid #ccc;
    vertical-align: middle;
    line-height: 50px;
    .hedericon {
      font-size: 26px;
      vertical-align: middle;
    }
    .gs {
      vertical-align: middle;
    }
    .header-right {
      float: right;
      img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }

}
</style>
