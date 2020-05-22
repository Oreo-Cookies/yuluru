<template>
  <div class="current-info">
    <van-progress color="#0AC261" percentage="80" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">现车主信息</div>
      <my-tip></my-tip>

      <van-form
        ref="basicInfo"
        validate-trigger="onChange"
        :show-error-message="false"
        @submit="onsubmit"
      >

        <div class="uploadImg">
          <img :src="uploadImg" alt="">
        </div>


        <my-label label="证件类型" ></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="picker_value"
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
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入证件号码'}]"
        ></van-field>

        <my-label label="姓名/名称" ></my-label>
        <van-field
          class="input"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入姓名/名称'}]"
        ></van-field>

        <my-label label="证件地址" ></my-label>
        <van-field
          class="input"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入证件地址'}]"
        ></van-field>

        <my-label label="联系电话" ></my-label>
        <van-field
          class="input"
          v-model="car_number"
          name="name"
          placeholder="联系电话"
          size="large"
          clearable
          :border="false"
          :rules="[{ required: true, message: '请输入联系电话' }]"
        >
        </van-field>

        <my-buttons></my-buttons>
      </van-form>

    </div>
  </div>

</template>

<script>
  import uploadImg from '../../assets/images/upload@2x.png'
  export default {
    data () {
      return {
        mobile: '',
        car_number: '',
        showPicker: false,
        cardType: [ '身份证', '营业执照', '护照', '港澳通行证', '港澳居住证', '其它证件'], //证件类型d
        picker_value: '',
        loading: false,
        uploadImg,
      }
    },
    created() {
    },
    methods:{
      handlePicker (value) { //点击选择市场完成按钮时触发
        this.picker_value = value
        this.showPicker = false
      },
      async onsubmit (value) {
        // try {
        //   // await this.$refs.basicInfo.validate()
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
  .checkbox {
    height: 60px;
    margin-top: 20px;
    font-size: 24px;
  }
</style>
