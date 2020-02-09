<template>
  <div>
    <H3>hello组件。。。。。</H3>

    <div> 组件的内容部分。</div>
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

