<template>
  <div class="original-info">

    <div class="commonContainer">
      <div class="commonTitle">原车主信息</div>
      <my-tip></my-tip>

      <van-form
        ref="originalInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'原车主信息'" @originalOcr="originalOcr" :card_type="zj_type1" :picture="zj_photo1"></my-ocr>

        <my-label label="证件类型" :is_require="false"></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="card"
          :border="false"
          name="card"
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

        <div v-if="zj_type1 === 2">
          <my-label label="信用代码" :is_require="false"></my-label>
          <van-field
                  class="input"
                  v-model="zj_number1"
                  name="zj_number1"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
          ></van-field>

          <my-label label="公司名称" :is_require="false"></my-label>
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
                  type="textarea"
                  v-model="zj_address1"
                  name="zj_address1"
                  :autosize="true"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
          ></van-field>

          <my-label label="公司电话" :is_require="false">
            <span v-if="this.owner_mobile1.length" class="str-length">{{this.owner_mobile1.length}}</span>
          </my-label>
          <van-field
                  class="input"
                  type="tel"
                  v-model="owner_mobile1"
                  name="owner_mobile1"
                  placeholder="联系电话"
                  size="large"
                  maxlength="11"
                  clearable
                  :border="false"
          >
          </van-field>

        </div>

        <div v-else>
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
                  type="textarea"
                  v-model="zj_address1"
                  name="zj_address1"
                  size="large"
                  clearable
                  :border="false"
                  :autosize="true"
                  placeholder="请输入"
          ></van-field>

          <my-label label="联系电话" :is_require="false">
            <span v-if="this.owner_mobile1.length" class="str-length">{{this.owner_mobile1.length}}</span>
          </my-label>
          <van-field
                  class="input"
                  type="tel"
                  v-model="owner_mobile1"
                  name="owner_mobile1"
                  placeholder="联系电话"
                  size="large"
                  clearable
                  maxlength="11"
                  :border="false"
          >
          </van-field>
        </div>

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
        card: '身份证',
        zj_number1: '',
        owner_name1: '',
        owner_mobile1: '',
        zj_address1: '',
        showPicker: false,
        loading: false,
        uploadImg,
        cardType: [ '身份证', '居住证', '营业执照', '护照', '港澳通行证', '港澳居住证', '其它证件'], //证件类型d
        next_disabled: false,
        pre_disabled: false,
        zj_type1: 0,
        zj_photo1: null,
      }
    },
    methods:{
      fromEdit (detailInfo) {
        this.zj_number1 = detailInfo.zj_number1
        this.owner_name1 = detailInfo.owner_name1
        this.owner_mobile1 = detailInfo.owner_mobile1
        this.zj_address1 = detailInfo.zj_address1
        this.zj_type1 = detailInfo.zj_type1
        this.card = this.cardType[detailInfo.zj_type1]
        this.zj_photo1 = detailInfo.zj_photo1
      },
      handlePicker (value, index) { //点击证件类型完成按钮时触发
          console.log(value)
        this.card = value
        this.zj_type1 = index
        this.showPicker = false
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      originalOcr (data) {
        this.zj_photo1 = data.url
        switch (this.zj_type1) {
          case 0: //身份证
            this.zj_number1 = data.ocr.num
            this.owner_name1 = data.ocr.name
            this.zj_address1 = data.ocr.address
            break
          case 2: //营业执照
            this.zj_number1 = data.ocr.reg_num == 'FailInRecognition' ? '' : data.ocr.reg_num
            this.owner_name1 = data.ocr.name == 'FailInRecognition' ? '' : data.ocr.name
            this.zj_address1 = data.ocr.address == 'FailInRecognition' ? '' : data.ocr.address

            break
          case 3: //护照
            this.zj_number1 = data.ocr.passport_no
            this.owner_name1 = data.ocr.name_cn
            this.zj_address1 = data.ocr.birth_place
            break
          case 4: //港澳通行证
            this.zj_number1 = data.ocr['中国港澳居民往来内地通行证实体信息']['正面实体信息']['证件号码']
            this.owner_name1 = data.ocr['中国港澳居民往来内地通行证实体信息']['正面实体信息']['姓名_中文']
            break
          case 5: //港澳居住证
            this.zj_number1 = data.ocr.data.ret[4].word
            this.owner_name1 = data.ocr.data.ret[0].word
            this.zj_address1= data.ocr.data.ret[3].word
            break
        }

      },
       nextStep () {
        try {
          let value = this.$refs.originalInfo.getValues()
          if (value.owner_mobile1.length > 0 && value.owner_mobile1.length < 11) {
            return this.$toast.fail('请输入正确的手机号')
          }
          this.$_store.original_form = {...value, zj_type1: this.zj_type1, zj_photo1: this.zj_photo1}
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
