<template>
  <div>
<!--    <van-progress color="#0AC261" :percentage="percentage" stroke-width="4" :show-pivot="false" />-->
    <basic-info ref="basic" v-show="active === 1" :is_edit="is_edit"></basic-info>
    <car-info ref="car" v-show="active === 2"></car-info>
    <original-owner ref="original" v-show="active === 3"></original-owner>
<!--    <FaceRecognition v-show="active === 4"></FaceRecognition>-->
    <current-owner ref="current" v-show="active === 4"></current-owner>
<!--    <FaceRecognition v-show="active === 6"></FaceRecognition>-->
    <post-info ref="post" v-show="active === 5" :is_edit="is_edit" @safe="submit"></post-info>
  </div>
</template>

<script>
  import BasicInfo from "./addInfo/BasicInfo";
  import CarInfo from "./addInfo/CarInfo";
  import OriginalOwner from "./addInfo/OriginalOwner";
  import CurrentOwner from "./addInfo/CurrentOwner";
  import PostInfo from "./addInfo/PostInfo";
  // import FaceRecognition from "./addInfo/FaceRecognition";

  export default {
    name: "AddInfo",
    components: {
      BasicInfo,
      CarInfo,
      OriginalOwner,
      CurrentOwner,
      PostInfo,
      // FaceRecognition
    },
    data () {
      return {
        form: {},
        detailInfo: null,
        is_edit: false,
      }
    },
    created() {
      console.log(this.$route)
      let id = this.$route.query.id
      if (id) {
        this.$_mutations.toFirst(this.$_store)
        this.is_edit = true
        this.getInfo(id)
      }
      console.log(this.active)
    },
    methods: {
      async getInfo (id) {
        try {
          const res = await this.axios.post('wechat/appoint/info', {id})
          if (res.code != 200) return this.$toast.fail(res.message);
          this.$refs.basic.fromEdit(res.data)
          this.$refs.car.fromEdit(res.data)
          this.$refs.original.fromEdit(res.data)
          this.$refs.current.fromEdit(res.data)
          this.$refs.post.fromEdit(res.data)
        }catch (e) {
          this.$toast.fail(e)
        }
      },
      async submit () {
          console.log(this.$_store.basic_form, this.$_store.car_form, this.$_store.original_form, this.$_store.current_form, this.$_store.post_form)
          try {
            const res = await this.axios.post('wechat/appoint/add', {...this.$_store.basic_form, ...this.$_store.car_form, ...this.$_store.original_form, ...this.$_store.current_form, ...this.$_store.post_form})
            if (res.code != 200) return this.$toast.fail(res.msg);
            this.$toast.success('上传成功')
            this.$router.push('/carList')
          } catch (e) {
              console.error(e)
          }
      }
    },
    computed: {
      active () {
        return this.$_store.active
      },
      percentage () {
        let percentage = 20
        switch (this.active) {
          case 1:
            percentage = 20
            break;
            case 2:
              percentage = 40
            break;
          case 3:
            percentage = 60
            break;
            case 4:
              percentage = 80
            break;
              case 5:
                percentage = 100
            break
        }
        return percentage
      }
    }
  }
</script>

<style scoped>

</style>
