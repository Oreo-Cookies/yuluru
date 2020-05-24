<template>
  <div class="current-info">
    <van-progress color="#0AC261" percentage="80" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">现车主信息</div>
      <my-tip></my-tip>

      <van-form
        ref="currentInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'现车主信息'" @currentOcr="currentOcr"></my-ocr>


        <my-label label="证件类型" ></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="tj_type2"
          :border="false"
          name="markit"
          placeholder="证件类型"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择证件类型' }]"
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

        <my-label label="证件号码" ></my-label>
        <van-field
          class="input"
          v-model="zj_number2"
          name="zj_number2"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入证件号码'}]"
        ></van-field>

        <my-label label="姓名/名称" ></my-label>
        <van-field
          class="input"
          v-model="owner_name2"
          name="owner_name2"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入姓名/名称'}]"
        ></van-field>

        <my-label label="证件地址" ></my-label>
        <van-field
          class="input"
          v-model="zj_address2"
          name="zj_address2"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入证件地址'}]"
        ></van-field>

        <my-label label="联系电话" ></my-label>
        <van-field
          class="input"
          type="del"
          v-model="owner_mobile2"
          name="owner_mobile2"
          placeholder="联系电话"
          size="large"
          clearable
          :border="false"
          :rules="[{ required: true, message: '请输入联系电话' }]"
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
          tj_type2: '',
          zj_number2: '',
          owner_name2: '',
          owner_mobile2: '',
          zj_address2: '',
        showPicker: false,
        cardType: [ '身份证', '营业执照', '护照', '港澳通行证', '港澳居住证', '其它证件'], //证件类型d
        picker_value: '',
        loading: false,
        uploadImg,
        next_disabled: false,
        pre_disabled: false
      }
    },
    created() {
    },
    methods:{
      handlePicker (value) { //点击选择市场完成按钮时触发
        this.picker_value = value
        this.showPicker = false
      },
      currentOcr (info) {
        this.zj_number2 = info.name
        this.owner_name2 = info.num
        this.zj_address2 = info.address
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep () {
        try {
          // await this.$refs.basicInfo.validate()
          let value = this.$refs.currentInfo.getValues()
          this.$_store.current_form = value
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
