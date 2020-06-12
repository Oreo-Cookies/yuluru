<template>
  <div class="tip">
    <img :src="src" alt="">
    <span class="text">根据监管要求照片仅用于业务办理</span>
  </div>
</template>

<script>
  import src from '../assets/images/safe@2x.png'
  export default {
    name: "tip",
    data () {
      return {
        src
      }
    }
  }
</script>

<style scoped lang="less">
.tip {
  width: 100%;
  height: 40px;
  line-height: 40px;
  img {
    width: 27px;
    vertical-align: middle;
  }
  .text {
    font-size:26px;
    font-weight:400;
    color: #7f828b;
    margin-left: 10px;
  }
}


</style>
