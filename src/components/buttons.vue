<template>
  <div class="button-box">
    <button class="pre-button" :disabled="pre_disabled"  @click="preStep">
      上一步
    </button>

    <button class="next-button" :disabled="next_disabled"  @click="nextStep">
      下一步
    </button>
  </div>
</template>

<script>

  export default {
    name: "buttons",
    data () {
      return {
        next_disabled: false,
        pre_disabled: false
      }
    },
    methods: {
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep (value) {
        try {
          await this.$refs.basicInfo.validate()
          this.$_store.basic_form = value
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          console.error(e)
        }
      }
    }

  }
</script>

<style scoped>

</style>
