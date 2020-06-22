<template>
  <div id="app" :style="{height:setheight + 'px'}">
    <div v-wechat-title="$route.meta.title"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name: "App",
  components: {},
  data() {
    return {
      setheight: 0
    };
  },
  created() {
  },
  methods: {
  },
  mounted() {
    this.setheight = window.innerHeight;
  },
};
</script>

<style lang="less">
#app {
  height: 100%;
}

</style>


