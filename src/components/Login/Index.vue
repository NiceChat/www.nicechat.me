<template>
  <div class="page--loginpage">
    <Particle></Particle>
    <div class="form">
      <h2>登&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
      <div class="input">
        <input class="input--field" type="text" name="username" placeholder="用户名" v-model="username">
        <div class="input--label" for="username"></div>
      </div>

      <div class="input" style="margin-top: 40px;">
        <input class="input--field" type="password" name="password" placeholder="密码" v-model="password" @keyup.enter="login">
        <div class="input--label" for="username"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'
  import Particle from 'components/Common/Particle'

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    mounted () {
    },
    methods: {
      // 暂时前端写死登录
      login () {
        const canLogin = (this.username === 'admin') && (this.password === 'admin')
        if (canLogin) {
          this.$swal({
            title: '',
            text: '登录成功！',
            type: 'success'
          })
          setTimeout( () => {
            this.$swal.closeModal()
            localStorage.setItem('TOKEN', 'SUCCESS')
            this.$router.push({path: '/home'})
          }, 1200)
        } else {
          this.$swal({
            title: '错误',
            text: '请填写正确的用户名和密码。',
            type: 'error'
          })
        }
      }
    },
    components: {
      MenuBar,
      Particle
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  ::-webkit-input-placeholder {
    color: rgba(255,255,255,.8);
    font-weight:normal;
  }

  input:-webkit-autofill {
    background: rgba(255,255,255,1);
  }

  @keyframes animate-shadow {
    to {
      box-shadow: 0px 0px 100px 50px rgba(199,152,157, 0.6);
      opacity: 0;
    }
  }
  .page--loginpage {
    position: absolute;
    height: 100%;
    width: 100%;

    .form {
      width: 400px;
      height: 400px;
      margin: 200px auto 0 auto;
      position: relative;
      padding: 50px;
      z-index: 2;

      h2 {
        text-align: center;
        font-size: 28px;
        color: #666;
        margin-bottom: 30px;
      }

      .input {
        position: relative;
        width: 300px;

        &--label {
          content: ' ';
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 3;
          background: transparent;
          box-shadow: 0px 0px 0px 0px rgba(199,152,157, 0.6);
          z-index: 1;
        }

        &--field {
          width: 300px;
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          border: none;
          position: relative;
          z-index: 2;
          padding: 0.8em;
          border-radius: none;
          background: rgba(0,0,0,.2);
          position: relative;
          display: block;
          font-size: 18px;
          color: rgb(255, 255, 255);

          &:focus {
            box-shadow: 0px 0px 0px 2px #eca29b;
            background: rgba(0,0,0,.4);
            transition: all 0.3s;

            & + .input--label {
              animation: animate-shadow 0.3s forwards;
            }
          }
        }
      }
    }
  }
</style>
