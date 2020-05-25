<template>
  <div class="original-info">
    <van-progress color="#0AC261" percentage="60" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">原车主信息</div>
      <my-tip></my-tip>

      <van-form
        ref="originalInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'原车主信息'" @originalOcr="originalOcr"></my-ocr>

        <my-label label="证件类型" :is_require="false"></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="tj_type1"
          :border="false"
          name="tj_type1"
          placeholder="证件类型"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="证件类型"
            :columns="cardType"
            @cancel="showPicker = false"
            @confirm="handlePicker"
            :loading="loading"
          />
        </van-popup>

        <my-label label="证件号码" :is_require="false"></my-label>
        <van-field
          class="input"
          v-model="zj_number1"
          name="zj_number1"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
        ></van-field>

        <my-label label="姓名/名称" :is_require="false"></my-label>
        <van-field
          class="input"
          v-model="owner_name1"
          name="owner_name1"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
        ></van-field>

        <my-label label="证件地址" :is_require="false"></my-label>
        <van-field
          class="input"
          v-model="zj_address1"
          name="zj_address1"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
        ></van-field>

        <my-label label="联系电话" :is_require="false"></my-label>
        <van-field
          class="input"
          type="del"
          v-model="owner_mobile1"
          name="owner_mobile1"
          placeholder="联系电话"
          size="large"
          clearable
          :border="false"
        >
        </van-field>

        <div class="button-box">
          <button class="pre-button" :disabled="pre_disabled"  @click="preStep">
            上一步
          </button>

          <button class="next-button" :disabled="next_disabled"  @click="nextStep">
            下一步
          </button>
        </div>
      </van-form>

    </div>
  </div>

</template>

<script>
  import uploadImg from '../../assets/images/upload@2x.png'
  export default {
    data () {
      return {
        tj_type1: '身份证',
        zj_number1: '',
        owner_name1: '',
        owner_mobile1: '',
        zj_address1: '',
        showPicker: false,
        loading: false,
        uploadImg,
        cardType: [ '身份证', '营业执照', '护照', '港澳通行证', '港澳居住证', '其它证件'], //证件类型d
        next_disabled: false,
        pre_disabled: false
      }
    },
    created() {
    },
    methods:{
      handlePicker (value) { //点击证件类型完成按钮时触发
          console.log(value)
        this.tj_type1 = value
        this.showPicker = false
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      originalOcr (info) {
        console.log(info)
          this.zj_number1 = info.name
          this.owner_name1 = info.num
          this.zj_address1 = info.address
      },
      async nextStep () {
        try {
            let value = this.$refs.originalInfo.getValues()
          this.$_store.original_form = value
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          console.error(e)
        }
      },

    },

  }
</script>

<style scoped>
  .checkbox {
    height: 60px;
    margin-top: 20px;
    font-size: 24px;
  }
</style>
