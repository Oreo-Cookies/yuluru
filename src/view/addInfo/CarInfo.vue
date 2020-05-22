<template>
  <div class="car-info">
    <van-progress color="#0AC261" percentage="40" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">车辆信息</div>
      <my-tip></my-tip>

      <van-form
        ref="basicInfo"
        validate-trigger="onChange"
        :show-error-message="false"
        @submit="onsubmit"
      >

        <my-ocr></my-ocr>

        <my-label label="车牌号码" ></my-label>
        <van-field
          class="input"
          v-model="car_number"
          name="name"
          placeholder="粤s"
          size="large"
          clearable
          :border="false"
          :rules="[{ required: true, message: '请输入车牌号码' }]"
        >
        </van-field>

        <my-label label="号牌种类" ></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="picker_value"
          :border="false"
          name="markit"
          placeholder="02小型汽车"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择号牌种类' }]"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="号牌种类"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="handlePicker"
            :loading="loading"
            :default-index="1"
          />
        </van-popup>

        <my-label label="车架号" ></my-label>
        <van-field
          class="input"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          maxlength="12"
          :show-word-limit="true"
          :rules="[{ required: true, message: '请输入车架号'}]"
        ></van-field>

        <my-label label="品牌型号" ></my-label>
        <van-field
          class="input"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入品牌型号'}]"
        ></van-field>

        <my-label label="登记证号" ></my-label>
        <van-field
          class="input"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入登记证号'}]"
        ></van-field>


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
        columns: [],
        picker_value: '02小型汽车', // 号牌种类
        loading: false,
        uploadImg,
        cate_type_list: []
      }
    },
    created() {
      this.getCateType()
    },
    methods:{
      async getCateType () {
        const res = await this.axios.post('api/wechat/sort/index')
        console.log(res)
        this.cate_type_list = res.data
        let columns = []
        res.data.forEach(item => {
          columns.push(item.cate_v)
        })
        this.columns = columns
      },
      handlePicker (value) { //点击号牌种类完成按钮时触发
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
