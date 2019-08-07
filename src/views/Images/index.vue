<template>
    <div class="images-container">
        <el-card>
            <div slot="header">
                <bread-nav>素材管理</bread-nav>
            </div>
            <!-- 在这里定义activeName是默认显示那个tab   给这两个name一样的布尔值就可以实现切换不会同时边色的效果-->
            <el-radio-group v-model="reqparams.collect" @change=changeCollect()>
                <!-- 这里是通过label赋予布尔值来进行默认按钮 -->
      <el-radio-button :label="false">全部
      </el-radio-button>
      <el-radio-button :label="true">收藏
      </el-radio-button>
    </el-radio-group>
    <!-- 素材列表 -->
    <ul class="imageslist" style="overflow:hidden">
        <li v-for="(item,index) in imagesList" :key="index">
            <img :src="item.url">
            <div class="fot" v-if="!reqparams.collect">
                <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                <span class="el-icon-delete" style="margin-left:20px"></span>
            </div>
        </li>
    </ul>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size="reqparams.per_page"
  :current-page="reqparams.page"
  :total="total">
</el-pagination>
<el-button type="success" @click="dialogVisible = true">上传素材</el-button>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="dialog-img images-upload">

 <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :headers=headers
  name="image"
>
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
  </span>
    </div>
</el-dialog>
<!--对话框 -->

        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      reqparams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      imagesList: [],
      dialogVisible: false,
      imageUrl: '',
      total: 0,
      headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao2')).token }
    }
  },
  created () {
    this.getAllImages()
  },
  methods: {
    async getAllImages () {
      const { data: { data } } = await this.axios.get('user/images', { params: this.reqparams })
      // console.log(data)
      this.imagesList = data.results
      this.total = data.total_count
    },
    changeCollect () {
      // 切换的时候，就
      // 收藏页面也是在第一页开始的
      this.reqparams.page = 1
      // 再去重新调用获取图片列表
      // 同时把
      this.getAllImages()
    },
    handleAvatarSuccess (res) {
      // 上传成功，让imgurl等于上传的url
      // 成功发送请求
      // 发送请求的参数名称是 image 所以给upload加上name =image
      // 预览功能
      this.imageUrl = res.data.url
      // 提交 自动提交
      console.log(this.imagesList)
      this.imagesList.push(res)
      // 重新调用图片
      this.getAllImages()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    position: relative;
}
    .imageslist{
        li{width: 200px;
           height: 200px;
           float: left;
           list-style: none;
           position: relative;
           margin-right: 10px;
           border: 1px dashed #ccc;
           text-align: center;
           img{
               width: 180px;
               height: 160px;

           }
           .fot{
               width: 200px;
               height: 30px;
               position: absolute;
                bottom: 0;
                text-align: center;
                line-height: 30px;
                background-color: rgba(0,0,0,0.3);
                span{margin: 0 20px;
                    & .red{
                        color:redSs
                    }
                }
           }
           }
    }
    .el-button{
        position: absolute;
        right:50px;
        top:100px;
    }
    // .images-dialog{
    //     // width: 600px;
    //     height: 800px;
    // }
    .el-pagination{
        margin-top: 20px;
        position: absolute;
        bottom:0;
        left:200px;
    }
    .dialog-img{
      height: 400px;
      text-align: center;
    }
    .avatar-uploader img {
      width:100%;
      height: 200px;
    }

</style>
