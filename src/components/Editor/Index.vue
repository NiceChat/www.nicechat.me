<template>
  <div class="page--editor">
    <MenuBar @save="saveBlog"></MenuBar>
    <div class="content">
      <div class="profile">
        <input type="text" placeholder="文章标题" v-model="title">
      </div>
      <div class="edit" id="edit">
        <mavon-editor
          style="min-height: 700px;"
          v-model="source"
          @change="change"
          ref="editor"
          :ishljs = "true"
          @imgAdd='imgAddSuccess'></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'
  import { mavonEditor } from 'mavon-editor'
  import qiniu from 'qiniu.js'
  import config from '../../helper/config'
  qiniu.config(config.qiniu)
  var imagesBucket = null

  export default {
    data () {
      return {
        source: '',
        html: '',
        title: '',
        isUpLoadingImg: false
      }
    },
    mounted () {
      let {id} = this.$route.query
      id && (this.getSingleBlog(id))
      this.getUpToken((upToken) => {
        imagesBucket = new qiniu.Bucket('images', {
          putToken: upToken
        })
      })
      document.getElementById('edit').onkeydown = function(e){
        if (e.keyCode == 9) {
          return false
        }
      }
    },
    methods: {
      change (source, html) {
        this.html = html
      },
      // 添加图片
      imgAddSuccess (filename, file) {
        const timestamp = Date.parse(new Date())
        if (this.isUpLoadingImg) {
          this.$swal({
            title: '错误信息',
            text: '刚添加的图片正在上传到七牛后台，不要连续上传。',
            type: 'error'
          })
          return false
        }
        this.isUpLoadingImg = true
        imagesBucket.putFile(timestamp, file).then(
          (reply) => {
            // 上传成功
            const {hash, key} = reply
            let imageURl = `${config.qiniu.url}/${key}-${config.qiniu.style}`
            let img = document.createElement("img")
            img.src = imageURl
            img.onload = () => {
              this.isUpLoadingImg = false
              this.$refs.editor.$img2Url(filename, imageURl)
            }
          },
          (err) => {
            // 上传失败
            this.isUpLoadingImg = false
            console.error(err);
          }
        )
      },
      // 出事化获取upToken
      getUpToken(cb) {
        this.$http.post('/api/sendUpToken', {}).then((response) => {
          let res = response.body
          if (res.code === 0) {
            const {upToken} = res
            cb && cb(upToken)
          }
        })
      },
      // 获取单挑博客信息
      getSingleBlog (id) {
        this.$http.post('/api/getSingleBlog', {id: id}).then((response) => {
            let res = response.body
            if (res.code === 0) {
            this.source = res.data.content
            this.title = res.data.title
          }
        })
      },
      // 保存操作
      saveBlog () {
        let id = this.$route.query.id
        if( this.source == '' || this.title == ''){
          this.$swal({
            title: '字段为空！',
            text: '有字段未填写，填写完整后在提交保存。',
            type: 'error'
          })
          return false
        }
        if (this.isUpLoadingImg) {
          this.$swal({
            title: '错误提示',
            text: '正在上传将刚添加的图片上传到七牛服务器，上传成功后在保存。',
            type: 'error'
          })
          return false
        }
        if( id ){
          this.updateBlog()
        } else {
          this.insertBlog()
        }
      },
      // 更新一条信息
      updateBlog () {
        let data = {}
        data.id = this.$route.query.id
        data.content = this.source
        data.title = this.title
        data.html = this.html
        let _this = this
        this.$http.post('/api/updateSingleBlog', data).then((response) => {
          let res = response.body
          if (res.code === 0) {
            this.$swal({
              title: '更新成功！',
              text: '如果是直接从页面改的话，找个时间也把Mweb里面也同步更新下。',
              type: 'success'
            }).then(function() {
              _this.$router.push({path: '/info', query: {id: data.id}})
            })
          }
        })
      },
      // 新增一条博客
      insertBlog () {
        let data = {}
        data.author = 'YangLeiLei'
        data.title = this.title
        data.content = this.source
        data.html = this.html
        let _this = this
        this.$http.post('/api/insertSingleBlog', data).then((response) => {
          let res = response.body
          if( res.code === 0 ) {
            this.$swal({
              title: '新增成功！',
              text: '如果是直接从页面新增话，找个时间也把Mweb里面也同步新增下。',
              type: 'success'
            }).then(function() {
              _this.$router.push({'path': '/'})
            })
          }
        })
      }
    },
    components: {
      MenuBar,
      mavonEditor
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .page--editor {
    .profile {
      margin: 30px 0px;
      input {
        height: 42px;
        line-height: 42px;
        color: #333;
        width: 610px;
        padding: 0px 12px;
        border-radius: 4px;
        font-size: 14px;
        border: 1px #ccc solid;
      }
    }
    .content {
      width: 1280px;
      margin: 20px auto 0px auto;

      .edit {
        position: relative;
        z-index: 1;
        min-height: 700px;
      }
    }
  }
</style>
