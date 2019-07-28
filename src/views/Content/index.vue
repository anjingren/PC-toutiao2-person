<template>
  <div class="content-container">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">内容管理</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="reqparams">
        <el-form-item label="状态">
          <el-radio-group v-model="reqparams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="reqparams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="time"
            value-format="yyyy-MM-dd"
            @change="changeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchArticle">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card2">
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]"></el-image>
            <!-- <div slot="error" class="image-slot">
              <img src="../../assets/images/error.gif" alt />
            </div> -->
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">草稿</el-tag>
            <el-tag type="success" v-if="scope.row.status==1">待审核</el-tag>
            <el-tag type="info" v-if="scope.row.status==2">审核成功</el-tag>
            <el-tag type="warning" v-if="scope.row.status==3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status==null">标签五</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column label="操作">
         <template slot-scope="scope">
            <el-row>
            <el-button type="primary" icon="el-icon-edit" circle @click=editArticle(scope.row.id)></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click=deleteArticle(scope.row.id)></el-button>
          </el-row>
         </template>
        </el-table-column >
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total"
       :page-size="reqparams.per_page"
       :current-page="reqparams.page"
       @current-change="changePage"
       ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      channelOptions: [],
      total: null,
      time: [],
      reqparams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      articles: []
    }
  },
  created () {
    this.getArticleData()
    this.getChannel()
  },
  methods: {
    // 获取文章列表
    async getArticleData () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqparams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    },
    // 获取频道数据
    async getChannel () {
      const {
        data: { data }
      } = await this.axios.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    },
    searchArticle () {
      // 获取搜索列表
      // const data = await this.axios.get('search', this.reqparams)
      // console.log(data)
      this.getArticleData()
    },
    // 获取日期变化数据
    changeDate () {
      this.reqparams.begin_pubdate = this.time[0]
      this.reqparams.end_pubdate = this.time[1]
    },
    // 修改文章
    editArticle (id) {
      // 把id传递过去
      // 两个组件之间的传值
      this.$router.push('/publish')
    },
    // 删除文章：
    deleteArticle (id) {
      console.log(id)
      // 删除当前id的行
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确定删除
        await this.axios.delete(`articles/` + id)
        alert(8)
        this.getArticleData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 翻页
    changePage (newpage) {
      // 这个参数是默认传入的  把当前获取的页码赋值给page
      this.reqparams.page = newpage
      // 调用文章列表函数
      this.getArticleData()
    }

  }
}
</script>

<style lang='less' scopeds>
.card2 {
  margin-top: 20px;
}
</style>
