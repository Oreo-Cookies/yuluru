<template>
  <div class="car-list">
    <van-tabs
            v-model="active"
            :sticky="true"
            :swipeable="true"
            :lazy-render="true"
            title-active-color="#4190F7"
            color="#4190F7"
            line-height="3px"
            line-width="33.33%"
    >
      <van-tab title="待受理">
        <NotAccepted></NotAccepted>
      </van-tab>
      <van-tab title="受理中">
        <Accepted></Accepted>
      </van-tab>
      <van-tab title="全部">
        <AllList></AllList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import NotAccepted from "./carList/NotAccepted";
  import Accepted from "./carList/Accepted";
  import AllList from "./carList/AllList";
  export default {
    name: "CarList",
    components: {
      NotAccepted,
      Accepted,
      AllList
    },
    data() {
      return {
        active: 0
      }
    }
  }
</script>

<style scoped>
.car-list{
  min-height: 100%;
  background-color: #F1F2F3;
}
</style>
