<template>
  <div class="hello">
     <h3>hellWord组件</h3>

     <div>count===>{{this.$store.state.count}}</div>

     <div>fullName===>{{this.$store.getters.fullName}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    console.log('here...')
  }
}
</script>
<style>
    .hello{
        background-color: #D8E1FF;
        padding: 5px;
    }
</style>
