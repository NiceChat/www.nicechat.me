<template>
  <div class="list">
    <div class="item" v-for="item in list">
      <template>
        <router-link class='item--right' tag='div' :to='{ path: "/info", query:{"id": item.id} }'>
          <h1 class="title">{{ item.title }}</h1>
          <p class="base">
            <span>更新时间：{{ item.ctime | format }}</span>
            <span>作者：{{ item.author }}</span>
          </p>
          <div class="description">
            <div v-html="item.html" class="markdown-body code-github"></div>
          </div>
        </router-link>
      </template>
    </div>
    <infinite-loading :on-infinite="getBlogsList" ref="infiniteLoading">
       <span slot="no-more">
         LeiLei, Havas finis ŝarĝo :(
       </span>
    </infinite-loading>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data () {
      return {
        list: [],
        loading: false,
        isLast: false,
        pager: {
          page: 1,
          offset: 5
        }
      }
    },
    created () {
      this.getBlogsList()
    },
    methods: {
      getBlogsList () {
        this.loading = true
        const {offset, page} = this.pager
        this.$http.post('/api/getBlogList', {offset, page}).then(response => {
          this.pager.page++
          this.loading = false
          let {list, code} = response.body
          if (Number(code) === 0) {
            this.list = this.list.concat(list)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            if (list.length < this.pager.offset) {
              this.isLast = true
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            }
          }

        }, response => {
          // error callback
        })
      }
    },
    components: {
      VueMarkdown,
      InfiniteLoading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../style/var';
  .list {
    width: $listWidth;
    height: auto;
    padding-top: 10px;
    margin: 0 auto;

   .item {
     cursor: pointer;
     padding: 30px;
     margin-top: 50px;
     padding-bottom: 20px;
     background: rgba(255,255,255,.6);
     position: relative;
     border-radius: 6px;
     box-shadow: 0px 4px 8px rgba(0,0,0,.2);

     &:after {
       content: ' ';
       position: absolute;
       top: 0px;
       width: 100%;
       height: 3px;
       left: 0px;
       background: $color_opacity;
     }

     &:before {
       content: ' ';
       width: 100%;
       position: absolute;
       z-index: 99;
       bottom: 0;
       left: 0;
       height: 100%;
       pointer-events: none;
       background-image:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0) 60%,rgba(255,255,255,1));
     }

     &:hover {
        background: rgba(255,255,255,1);
        transition: all .4s ease-in;

        &:after {
          background: $color;
        }
     }

     &--right {
       width: 100%;
       display: inline-block;
       position: relative;

       .title {
         font-size: 24px;
         color: #555;
         line-height: 25px;
         letter-spacing: 1px;
       }

       .description {
         margin-top: 10px;
         font-size: 14px !important;
         color: #666666;
         max-height: 220px;
         line-height: 25px;
         overflow: hidden;
         text-align: justify;
         letter-spacing: 1px;

         .markdown-body {
           p {
             font-size: 14px;
           }
         }
       }

       .base {
         font-size: 14px;
         line-height: 2;
         color: #999;
         letter-spacing: 1px;

         span,a {
            margin-right: 25px;
            &.read {
              color: red;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            }
         }
       }
     }
   }
  }
</style>
