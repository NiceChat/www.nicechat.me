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
            <VueMarkdown :source="item.content"></VueMarkdown>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getBlogsList()
    },
    methods: {
      getBlogsList () {
        this.$http.post('/api/getBlogList', {offset: 10, page: 1}).then(response => {
          let res = response.body
          this.list = res.list
        }, response => {
          // error callback
        })
      }
    },
    components: {
      VueMarkdown
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../style/var';
  .list {
    width: $listWidth;
    min-height: 800px;
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
       height: 6px;
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
       height: 60px;
       pointer-events: none;
       background-image:linear-gradient(180deg,rgba(255,255,255,0),rgba(23, 85, 142, 0.1));
     }

     &:hover {
        background: rgba(255,255,255,1);
        transition: all .4s ease-in;

        &:after {
          background: $color;
        }

        &:before {
          background-image:linear-gradient(180deg,rgba(255,0,0,0),rgba(23, 85, 142, 0.15));
        }
     }

     &--right {
       width: 100%;
       display: inline-block;
       position: relative;

       .title {
         font-size: 28px;
         color: #555;
         line-height: 25px;
         letter-spacing: 1px;
       }

       .description {
         margin-top: 10px;
         font-size: 14px;
         color: #666666;
         max-height: 220px;
         line-height: 25px;
         overflow: hidden;
         text-align: justify;
         letter-spacing: 1px;
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
