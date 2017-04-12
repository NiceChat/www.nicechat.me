<template>
  <div class="page--loginpage">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'

  export default {
    name: 'Login',
    data () {
      return {
      }
    },
    mounted () {
      var WIDTH = window.innerWidth
      var HEIGHT = window.innerHeight
      var POINT = 35

      var canvas = document.getElementById('canvas')
      canvas.width = WIDTH
      canvas.height = HEIGHT

      var context= canvas.getContext('2d')

    },
    methods: {
    },
    components: {
      MenuBar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .page--loginpage {
    position: absolute;
    height: 100%;
    width: 100%;
    background: darkred;
  }
</style>
