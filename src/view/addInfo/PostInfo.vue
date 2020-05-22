<template>
  <div class="post-info">
    <van-progress color="#0AC261" percentage="100" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">邮寄地址</div>
      <div class="tip">
        <van-icon name="info-o" />
        <span class="text">无需邮寄服务则此处不需要填写</span>
      </div>
      <van-form
        ref="basicInfo"
        validate-trigger="onChange"
        :show-error-message="false"
        @submit="onsubmit"
      >

        <my-label label="收件人" :is_require="false"></my-label>
        <van-field
          class="input"
          v-model="name"
          name="name"
          placeholder="请输入"
          size="large"
          clearable
          :border="false"
          :rules="[{ required: true, message: '请输入收件人' }]"
        >
        </van-field>

        <my-label label="联系方式" :is_require="false"></my-label>
        <van-field
          class="input"
          type="tel"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入联系方式'}]"
        ></van-field>

        <my-label label="收件地址" :is_require="false"></my-label>
        <van-field
          class="input"
          readonly
          clickable
          name="area"
          :value="area_value"
          placeholder="点击选择省-市-区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="handleArea"
            @cancel="showArea = false"
          />
        </van-popup>

        <van-field
          class="input detail"
          type="tel"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入详细地址"
          :rules="[{ required: true, message: '请输入联系方式'}]"
        ></van-field>



        <div class="button-box">
          <button class="pre-button" :disabled="pre_disabled"  @click="preStep">
            上一步
          </button>

          <button class="next-button" :disabled="next_disabled"  @click="safe">
            保存
          </button>
        </div>
      </van-form>

    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        mobile: '',
        name: '',
        area_value: '',
        loading: false,
        showArea: false,
        areaList: {},
        pre_disabled: false,
        next_disabled: false
      }
    },
    created() {
    },
    methods:{
      handleArea () {

      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      safe () {
        this.$emit('safe')
        this.next_disabled = true
        setTimeout(() => this.next_disabled = false, 100)
      },
      async onsubmit (value) {
        // try {
        //   console.log(value)
        //   return value
        // } catch (e) {
        //   console.log(e)
        // }

      }
    },

  }
</script>

<style scoped>
  .detail {
    margin-top: 35px;
  }
</style>
