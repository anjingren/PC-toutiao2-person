<template>
  <div class="bread-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
           <slot></slot>
          </el-breadcrumb-item>
        </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'bread-nav'

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
