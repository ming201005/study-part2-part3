<template>
  <div id="app">
    <div class="nav">
      <router-link to="/hello">hello组件</router-link>
      <router-link to="/mycpn">MyCpn组件</router-link>
      <router-link :to="{path: '/param108', query: { id: 123}}">参数1</router-link>
      <router-link to="/param109/8888">参数2</router-link>
      <router-link :to="{ name: 'param1010', params: { id: 123,msg:'你好，hello！'}}">参数3</router-link>

      <!--多参数-->
      <router-link  :to="{path: '/param1012', query: { id: 123, msg: '张三->多参数1'}}">多参数1</router-link>
      <router-link  :to="{ name: 'param1013', params: { id: 123,msg:'你好->多参数2'}}">多参数2</router-link>

    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>
<style scoped>
  .nav a{
    margin: 2px 5px;
  }
  .content{

  }
</style>