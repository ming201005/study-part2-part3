<template>
  <div>
    <span>hello。。。。。</span>
    <h1> {{this.$route.params.id}}</h1>
    <div> {{this.$route.params.msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    id :Number
  },
  created() {
    this.log("props==>",this.msg,this.id);
  },
  methods:{

  }
}
</script>

