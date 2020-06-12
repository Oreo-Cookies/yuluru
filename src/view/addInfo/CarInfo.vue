<template>
  <div class="car-info">

    <div class="commonContainer">
      <div class="commonTitle">车辆信息</div>
      <my-tip></my-tip>

      <van-form
        ref="carInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'车辆信息'" @carOcr="carOcr" :card_type="card_index" :picture="xsz_photo"></my-ocr>

        <my-label label="车牌号码" ></my-label>
        <van-field
          class="input"
          v-model="car_number"
          name="car_number"
          placeholder="粤S"
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
          @click="showPicker = true"
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

        <my-label label="车架号" >
          <span v-if="this.vin.length" class="str-length">{{this.vin.length}}</span>
        </my-label>
        <van-field
          class="input"
          v-model="vin"
          name="vin"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
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

        <my-label label="登记证号" >
          <span v-if="this.dj_number.length" class="str-length">{{this.dj_number.length}}</span>
        </my-label>
        <van-field
          class="input"
          type="tel"
          v-model="dj_number"
          name="dj_number"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          maxlength="12"
          :rules="[{ required: true, message: '请填写正确的登记证号'},]"
        ></van-field>

        <my-label label="车辆类型" :is_require="false"></my-label>
        <van-field
                class="input"
                v-model="cllx"
                name="cllx"
                size="large"
                clearable
                :border="false"
                placeholder="请输入"
        ></van-field>

        <my-label label="所有人" :is_require="false"></my-label>
        <van-field
                class="input"
                v-model="xsz_syren"
                name="xsz_syren"
                placeholder="请输入"
                size="large"
                clearable
                :border="false"
        >
        </van-field>

        <my-label label="行驶证地址" :is_require="false"></my-label>
        <van-field
                class="input"
                v-model="xsz_address"
                :border="false"
                name="xsz_address"
                clearable
                placeholder="请输入行驶证地址"
        />

        <my-label label="注册日期" :is_require="false"></my-label>
        <van-field
                class="input"
                readonly
                clickable
                :value="zc_date"
                name="zc_date"
                size="large"
                clearable
                :border="false"
                @click="show_zc_data = true"
                placeholder="YYYY-MM-DD"
        ></van-field>
        <van-popup v-model="show_zc_data" round position="bottom">
          <van-datetime-picker
                  v-model="currentDate_zc"
                  type="date"
                  title="选择年月日"
                  @cancel="show_zc_data = false"
                  @confirm="handle_zc_data"
          />
        </van-popup>

        <my-label label="发证日期" :is_require="false"></my-label>
        <van-field
                class="input"
                readonly
                clickable
                :value="fz_date"
                name="fz_date"
                size="large"
                clearable
                :border="false"
                @click="show_fz_data = true"
                placeholder="YYYY-MM-DD"
        ></van-field>
        <van-popup v-model="show_fz_data" round position="bottom">
          <van-datetime-picker
                  v-model="currentDate_fz"
                  type="date"
                  title="选择年月日"
                  @cancel="show_fz_data = false"
                  @confirm="handle_fz_data"
          />
        </van-popup>


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
        car_number: '粤S',
        showPicker: false,
        columns: [],
        car_number_name: '02小型汽车', // 号牌种类
        car_number_type: 12,
        loading: false,
        uploadImg,
        cate_type_list: [],
        next_disabled: false,
        pre_disabled: false,
        dj_number: '',
        ppxh: '',
        fz_date: '',
        zc_date: '',
        xsz_address: '',
        xsz_syren: '',
        cllx: '',
        card_index: 7,
        xsz_photo: null,
        show_zc_data: false,
        show_fz_data: false,
        currentDate_zc: new Date(),
        currentDate_fz: new Date(),
      }
    },
    async created() {
      await this.getCateType()
    },
    methods:{
      fromEdit (detailInfo) {
        this.ppxh = detailInfo.ppxh
        this.vin = detailInfo.vin
        this.car_number = detailInfo.car_number
        this.fz_date = detailInfo.fz_date
        this.zc_date = detailInfo.zc_date
        this.xsz_address = detailInfo.xsz_address
        this.xsz_syren = detailInfo.xsz_syren
        this.cllx = detailInfo.cllx
        this.car_number_type = detailInfo.car_number_type
        this.car_number_name = detailInfo.car_number_name
        this.dj_number = detailInfo.dj_number
        this.xsz_photo = detailInfo.xsz_photo
      },
      async getCateType () {
        const res = await this.axios.post('/wechat/sort/index')
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
        this.showPicker = false
      },
      handle_fz_data (value) {
        this.fz_date = new Date(value).toLocaleDateString().replace(/\//g, '-')
        this.show_fz_data = false
      },
      handle_zc_data (value) {
        this.zc_date = new Date(value).toLocaleDateString().replace(/\//g, '-')
        this.show_zc_data = false
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep () {
        try {
          await this.$refs.carInfo.validate()
          let value = this.$refs.carInfo.getValues()
          if (value.dj_number.length < 12) {
            return this.$toast.fail('请输入正确的登记证号')
          }
          this.$_store.car_form = {...value, car_number_type: this.car_number_type, xsz_photo: this.xsz_photo}
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          this.$toast.fail('请填写完整信息')
        }
      },
      carOcr (info) {
        console.log(info)
        this.ppxh = info.ocr.model
        this.vin = info.ocr.vin
        this.car_number = info.ocr.plate_num
        this.fz_date = info.ocr.issue_date
        this.zc_date = info.ocr.register_date
        this.xsz_address = info.ocr.addr
        this.xsz_syren = info.ocr.owner
        this.cllx = info.ocr.vehicle_type
        this.xsz_photo = info.url
      },
    },

  }
</script>

<style scoped>
</style>
