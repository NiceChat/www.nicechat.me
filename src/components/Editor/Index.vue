<template>
  <div class="page--editor">
    <MenuBar @save="saveBlog"></MenuBar>
    <div class="content">
      <div class="profile">
        <input type="text" placeholder="输入标题" v-model="title">
      </div>
      <div class="edit">
        <textarea v-model="source"></textarea>
      </div>
      <div class="preview">
        <div class="preview--content">
          <VueMarkdown
          :watches="['show','html','breaks','linkify','emoji','typographer','toc']"
          :show="show" :html="html" :breaks="breaks" :linkify="linkify"
          :emoji="emoji" :typographer="typographer" :toc="toc"
          :source="source"></VueMarkdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'
  import VueMarkdown from 'vue-markdown'

  export default {
    data () {
      return {
        source: '',
        title: '',
        show: true,
        html: true,
        breaks: true,
        linkify: false,
        emoji: true,
        typographer: true,
        toc: false
      }
    },
    created () {
      let id = this.$route.query.id
      id && (this.getSingleBlog(id))
    },
    methods: {
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
        // console.log('保存操作')
        let id = this.$route.query.id
        if( this.source == '' || this.title == '' ){
          this.$swal({
            title: '字段为空！',
            text: '有字段未填写，填写完整后在提交保存。',
            type: 'error'
          })
          return
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
      // 清空数据
      clearBlog () {
        this.source = ''
        this.title = ''
      },
      // 新增一条博客
      insertBlog () {
        let data = {}
        data.author = 'YangLeiLei'
        data.title = this.title
        data.content = this.source
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
    watch: {
      '$route' () {
        let id = this.$route.query.id
        if (id) {
          this.getSingleBlog(id)
        } else {
          this.clearBlog()
        }
      }
    },
    components: {
      MenuBar,
      VueMarkdown
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .page--editor {
    .profile {
      margin: 30px 0px;
      padding-left: 15px;
      input {
        height: 42px;
        line-height: 42px;
        color: #333;
        width: 610px;
        padding: 0px 12px;
        border-radius: 4px;
        border: 1px #ccc solid;
      }
    }
    .content {
      width: 1280px;
      margin: 0 auto;

      %common {
        float: left;
        padding: 15px;
        box-sizing: border-box;

        &::after {
          clear: both;
        }
      }
      .edit {
        @extend %common;
        width: 50%;
        height: 800px;

        textarea {
          width: 100%;
          height: 100%;
          display: block;
          box-sizing: border-box;
          padding: 10px;
          border-radius: 4px;
          border: 1px #ccc solid;
        }
      }

      .preview {
        @extend %common;
        width: 50%;
        height: 800px;

        &--content {
          width: 100%;
          height: 100%;
          display: block;
          box-sizing: border-box;
          padding: 20px;
          border: 1px #f5f2f0 solid;
          border-radius: 4px;
          background: #fff;
          overflow: auto;
        }
      }
    }
  }
</style>
