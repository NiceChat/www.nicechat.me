<template>
  <div class="page--index">
    <menu-bar></menu-bar>
    <List></List>
  </div>
</template>

<script>
  import MenuBar from 'components/Common/Menu'
  import List from './List'

  export default{
    name: 'Home',
    data () {
      return {
      }
    },
    components: {
      List,
      MenuBar
    }
  }
</script>
