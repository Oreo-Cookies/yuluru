<template>
  <div>
    <basic-info ref="basic" v-show="active === 1"></basic-info>
    <car-info ref="car" v-show="active === 2"></car-info>
    <original-owner ref="original" v-show="active === 3"></original-owner>
    <current-owner ref="current" v-show="active === 4"></current-owner>
    <post-info ref="post" v-show="active === 5" @safe="submit"></post-info>
  </div>
</template>

<script>
  import BasicInfo from "./addInfo/BasicInfo";
  import CarInfo from "./addInfo/CarInfo";
  import OriginalOwner from "./addInfo/OriginalOwner";
  import CurrentOwner from "./addInfo/CurrentOwner";
  import PostInfo from "./addInfo/PostInfo";
  export default {
    name: "AddInfo",
    components: {
      BasicInfo,
      CarInfo,
      OriginalOwner,
      CurrentOwner,
      PostInfo
    },
    data () {
      return {
        form: {},
      }
    },
    created() {
    },
    methods: {
      async submit () {
          console.log(this.$_store.basic_form, this.$_store.car_form, this.$_store.original_form, this.$_store.current_form, this.$_store.post_form)
          try {
              const res = await this.axios.post('api/wechat/appoint/add', {...this.$_store.basic_form, ...this.$_store.car_form, ...this.$_store.original_form, ...this.$_store.current_form, ...this.$_store.post_form})
              console.log(res)
          } catch (e) {
              console.error(e)
          }
      }
    },
    computed: {
      active () {
        return this.$_store.active
      },
    }

  }
</script>

<style scoped>

</style>
