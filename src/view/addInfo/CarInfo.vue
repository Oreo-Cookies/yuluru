<template>
  <div class="car-info">
    <van-progress color="#0AC261" percentage="40" stroke-width="4" :show-pivot="false" />

    <div class="commonContainer">
      <div class="commonTitle">车辆信息</div>
      <my-tip></my-tip>

      <van-form
        ref="carInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'车辆信息'" @carOcr="carOcr"></my-ocr>

        <my-label label="车牌号码" ></my-label>
        <van-field
          class="input"
          v-model="car_number"
          name="car_number"
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
          :value="car_number_name"
          :border="false"
          name="car_number_name"
          placeholder="02小型汽车"
          @click="selectCarType"
          :rules="[{ required: true, message: '请选择号牌种类' }]"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
              ref="car_type"
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
          v-model="vin"
          name="vin"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          maxlength="17"
          :show-word-limit="true"
          :rules="[{ required: true, message: '请输入车架号'}]"
        ></van-field>

        <my-label label="品牌型号" ></my-label>
        <van-field
          class="input"
          v-model="ppxh"
          name="ppxh"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入品牌型号'}]"
        ></van-field>

        <my-label label="登记证号" ></my-label>
        <van-field
          class="input"
          v-model="dj_number"
          name="dj_number"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入登记证号'}]"
        ></van-field>


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
        vin: '',
        car_number: '',
        showPicker: false,
        columns: [],
        car_number_name: '02小型汽车', // 号牌种类
        car_number_type: 11,
        loading: false,
        uploadImg,
        cate_type_list: [],
        next_disabled: false,
        pre_disabled: false,
        dj_number: '',
        ppxh: '',


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
      handlePicker (value, index) { //点击号牌种类完成按钮时触发
        console.log(value, index)
        this.car_number_name = value
        this.car_number_type = this.cate_type_list[index].id
          console.log(this.car_number_type)
        this.showPicker = false
      },
        selectCarType () {
          this.showPicker = true
            // this.$nextTick(() => {
            //     this.$refs.car_type.setValues(this.car_number_name)
            // })
        },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep () {
        try {
          // await this.$refs.basicInfo.validate()
          let value = this.$refs.carInfo.getValues()
            console.log(value)
          this.$_store.car_form = {...value, car_number_type: this.car_number_type}
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          console.error(e)
        }
      },
      carOcr (info) {
        console.log(info)
          this.dj_number = info.engine_num
          this.ppxh = info.model
          this.vin = info.vin
          this.car_number = info.plate_num
          this.car_number_name = info.vehicle_type

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
