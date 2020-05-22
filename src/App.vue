<template>
  <div id="app" :style="{height:setheight + 'px'}">
    <!-- <MobileCharts /> -->
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
  mounted() {
    this.setheight = window.innerHeight;
  },
};
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>


