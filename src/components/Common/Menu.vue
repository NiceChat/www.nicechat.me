<template>
  <headroom>
    <div class="menu">
      <div class="menu--content">
        <router-link tag='div' class='logo' :to="{path: 'home'}">YangLeiLei`s Notes</router-link>
        <template v-if="isLogin">
          <router-link tag='div' class='edit' :to="{path: 'editor'}"><button class="btn">新增</button></router-link>
          <div class="edit" v-if="editPage"><button class="btn" @click="saveBlog">保存</button></div>
          <div class="edit" v-if="infoPage"><button class="btn" @click="editBlog">编辑</button></div>
          <div class="edit" v-if="infoPage"><button class="btn" @click="delBlog">删除</button></div>
        </template>
        <template v-else>
          <div class="edit" ><button class="btn" @click="toLogin">登&nbsp;&nbsp;录</button></div>
        </template>
      </div>
    </div>
  </headroom>
</template>

<script>
  import headroom from 'vue-headroom'

  export default{
    name: 'Menu',
    data () {
      let fullpath = this.$route.fullPath
      let isInfoPage = false
      let isEditPage = false
      let isLogin = localStorage.TOKEN == 'SUCCESS' ? true : false
      if (fullpath.indexOf('info') !== -1){
        isInfoPage = true
      } else if (fullpath.indexOf('edit') !== -1) {
        isEditPage = true
      }
      return {
        infoPage: isInfoPage,
        editPage: isEditPage,
        isLogin
      }
    },
    methods: {
      // 编辑操作
      editBlog () {
        this.$emit('edit')
      },
      // 保存操作
      saveBlog () {
        this.$emit('save')
      },
      // 删除操作
      delBlog () {
        this.$emit('delete')
      },
      // 管理员登录
      toLogin () {
        this.$router.push('login')
      }
    },
    components: {
      headroom
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../style/var';
  .menu {
    width: 100%;
    height: 90px;
    background: $color_opacity;

    &--content {
      width: $width;
      height: 90px;
      margin: 0 auto;

      .logo {
        cursor: pointer;
        display: inline-block;
        font-size: 40px;
        line-height: 90px;
        color: #fff;
      }

      .edit {
        float: right;
        margin-left: 15px;

        .btn {
          border: 1px #fff solid;
          color: #fff;
          margin-top: 28px;
          background: transparent;

          &:hover {
            background: #fff;
            color: $color;
            transition: all .4s cubic-bezier(.175,.885,.32,1);
          }
        }
      }
    }
  }
</style>
