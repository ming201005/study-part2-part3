<template>
  <div id="app">
    <do-option-more/>
    <Options/>
    <div class="right">
      <HelloWorld />
      <hr>
      <h2>{{this.$store.state.count}}</h2>
      <h3><div>{{this.$store.state.msg}}</div></h3>
      <hr>
      <div>{{this.$store.state.users.msg}}</div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Options from './components/Options'
import DoOptionMore from "./components/do-optionMore";

export default {
  name: 'app',
  components: {
    DoOptionMore,
    HelloWorld,
    Options
  },
  created(){
    
  }
}
</script>
<style>
  #app{
    display: flex;
  }
  .right{
    margin-left: 20px;
    padding: 5px;
    width: 60%;
    box-shadow: 2px 2px 2px 2px #BABABA;
  }
</style>
