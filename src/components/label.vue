<template>
  <div class="commonLable">
    <span class="require" v-if="is_require">*</span>
    <span>{{label}}</span>
  </div>
</template>

<script>
  export default {
    name: "lable",
    props: {
      label: {
        type: String,
        required: true,
        default: '',
      },
      is_require: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>

</style>
