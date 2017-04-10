<template>
  <div class="page--info">
    <MenuBar @edit="hrefEdit" @delete="deleteBolg"></MenuBar>
    <div class="info">
      <h1 class="title">{{ info.title }}</h1>
      <p class="base">
        <span>创建: <b>{{ info.ctime | calendar }}</b></span><span v-if="info.mtime">更新:<b>{{ info.mtime | calendar}}</b></span>By:{{ info.author }}
      </p>
      <div class="description">
        <VueMarkdown :source="info.content" :show="show" :html="html" :breaks="breaks" :linkify="linkify"
                     :emoji="emoji" :typographer="typographer" :toc="toc"></VueMarkdown>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'
  import VueMarkdown from 'vue-markdown'
  import swal from 'sweetalert2'

  export default {
    name: 'Info',
    data () {
      return {
        info: {},
        source: '',
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
      this.getSingleBlog()
    },
    methods: {
      getSingleBlog () {
        let id = this.$route.query.id
        this.$http.post('/api/getSingleBlog', {id: id}).then((response) => {
          let res = response.body
          if (res.code === 0) {
            this.info = res.data
          }
        })
      },
      // 调转到编辑页面
      hrefEdit () {
        let id = this.$route.query.id
        this.$router.push({path: 'editor', query:{ 'id': id}})
      },
      // 删除博客
      deleteBolg () {
        let _this = this
        let id = this.$route.query.id
        swal({
          title: '确认删除吗?',
          text: '保证自己mac上Mweb里面最好有备份，不然就不要删了!',
          type: 'warning',
          allowEscapeKey: true,
          allowEnterKey: true,
          showCancelButton: true,
          confirmButtonText: '哎, 删了吧!',
          cancelButtonText: '艹, 点错了'
        }).then(function() {
          _this.$http.post('/api/delsingleBlog', {id: id}).then((response) => {
            let res = response.body
            if (res.code === 0) {
              swal({
                title: '删除成功！',
                text: '已经成功删除了，后悔了看下Mweb里面是否有备份。',
                type: 'success'
              }).then(function() {
                _this.$router.push({path: '/'})
              })
            }
          })
        })
      }
    },
    components: {
      MenuBar,
      VueMarkdown
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../style/var';
  .info {
    width: $width;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
    margin-top: 30px;
    padding: 1px 30px 30px;

    .title {
       font-size: 38px;
       color: #666;
       line-height: 2;
       text-align: center;
       letter-spacing: 1px;
     }

    .description {
       margin-top: 10px;
       font-size: 14px;
       color: #666666;
       min-height: 120px;
       line-height: 25px;
       overflow: hidden;
       text-align: justify;
       letter-spacing: 1px;
    }

    .base {
      font-size: 14px;
      color: #999;
      margin-top: -20px;
      text-align: center;
      span {
        margin-right:10px;
      }

      b {
        font-weight:normal;
        text-decoration: underline;
      }
    }
  }
   
</style>
