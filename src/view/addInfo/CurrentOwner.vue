<template>
  <div class="current-info">

    <div class="commonContainer">
      <div class="commonTitle">现车主信息</div>
      <my-tip></my-tip>

      <van-form
        ref="currentInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-ocr :parentName="'现车主信息'" @currentOcr="currentOcr" :card_type="zj_type2" :picture="zj_photo2"></my-ocr>

        <my-label label="证件类型" ></my-label>
        <van-field
                class="input"
                readonly
                clickable
                :value="card1"
                :border="false"
                name="card2"
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

        <div v-if="zj_type2 === 2">
          <my-label label="信用代码" ></my-label>
          <van-field
                  class="input"
                  v-model="zj_number2"
                  name="zj_number2"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
                  :rules="[{ required: true, message: '请输入信用代码'}]"
          ></van-field>

          <my-label label="公司名称" ></my-label>
          <van-field
                  class="input"
                  v-model="owner_name2"
                  name="owner_name2"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
                  :rules="[{ required: true, message: '请输入公司名称'}]"
          ></van-field>

          <my-label label="证件地址" ></my-label>
          <van-field
                  class="input"
                  type="textarea"
                  v-model="zj_address2"
                  name="zj_address2"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
                  :autosize="true"
                  :rules="[{ required: true, message: '请输入证件地址'}]"
          ></van-field>

          <my-label label="公司电话" >
            <span v-if="this.owner_mobile2.length" class="str-length">{{this.owner_mobile2.length}}</span>
          </my-label>
          <van-field
                  class="input"
                  type="tel"
                  v-model="owner_mobile2"
                  name="owner_mobile2"
                  placeholder="公司电话"
                  size="large"
                  maxlength="11"
                  clearable
                  :border="false"
                  :rules="[{ required: true, message: '请输入公司电话' }]"
          >
          </van-field>

          <my-label label="个体经营者" :is_require="false">
          </my-label>
          <van-field
                  class="input"
                  v-model="zj_person2"
                  name="zj_person2"
                  placeholder="请输入"
                  size="large"
                  clearable
                  :border="false"
          >
          </van-field>
        </div>
        <div v-else>
          <my-label label="证件号码" >

          </my-label>
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
                  type="textarea"
                  v-model="zj_address2"
                  name="zj_address2"
                  size="large"
                  clearable
                  :border="false"
                  placeholder="请输入"
                  :autosize="true"
                  :rules="[{ required: true, message: '请输入证件地址'}]"
          ></van-field>

          <my-label label="联系电话" >
            <span v-if="this.owner_mobile2.length" class="str-length">{{this.owner_mobile2.length}}</span>
          </my-label>
          <van-field
                  class="input"
                  type="tel"
                  v-model="owner_mobile2"
                  name="owner_mobile2"
                  placeholder="联系电话"
                  size="large"
                  clearable
                  maxlength="11"
                  :border="false"
                  :rules="[{ required: true, message: '请输入联系电话' }]"
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
        card1: '身份证',
        zj_number2: '',
        owner_name2: '',
        owner_mobile2: '',
        zj_address2: '',
        showPicker: false,
        cardType: [ '身份证', '居住证', '营业执照', '护照', '港澳通行证', '港澳居住证', '其它证件'], //证件类型d
        picker_value: '',
        loading: false,
        uploadImg,
        next_disabled: false,
        pre_disabled: false,
        zj_type2: 0,
        zj_photo2: null,
        zj_person2: '',
      }
    },
    methods:{
      fromEdit (detailInfo) {
        this.zj_number2 = detailInfo.zj_number2
        this.owner_name2 = detailInfo.owner_name2
        this.owner_mobile2 = detailInfo.owner_mobile2
        this.zj_address2 = detailInfo.zj_address2
        this.zj_type2 = detailInfo.zj_type2
        this.card1 = this.cardType[detailInfo.zj_type2]
        this.zj_photo2 = detailInfo.zj_photo2
        this.zj_person2 = detailInfo.zj_person2
      },
      handlePicker (value, index) { //点击选择市场完成按钮时触发
        console.log(value)
        this.card1 = value
        this.zj_type2 = index
        this.showPicker = false
      },
      currentOcr (data) {
        this.zj_photo2 = data.url
        switch (this.zj_type2) {
          case 0: //身份证
            this.zj_number2 = data.ocr.num
            this.owner_name2 = data.ocr.name
            this.zj_address2 = data.ocr.address
            break
          case 2: //营业执照
            this.zj_number2 = data.ocr.reg_num == 'FailInRecognition' ? '' : data.ocr.reg_num
            this.owner_name2 = data.ocr.name == 'FailInRecognition' ? '' : data.ocr.name
            this.zj_address2 = data.ocr.address == 'FailInRecognition' ? '' : data.ocr.address

            this.zj_person2 =
              data.ocr.type == 'FailInRecognition'
                ? ''
                : data.ocr.type == '个体工商户'
                ? data.ocr.person == 'FailInRecognition'
                  ? ''
                  : data.ocr.person
                : ''
            break
          case 3: //护照
            this.zj_number2 = data.ocr.passport_no
            this.owner_name2 = data.ocr.name_cn
            this.zj_address2 = data.ocr.birth_place
            break
          case 4: //港澳通行证
            this.zj_number2 = data.ocr['中国港澳居民往来内地通行证实体信息']['正面实体信息']['证件号码']
            this.owner_name2 = data.ocr['中国港澳居民往来内地通行证实体信息']['正面实体信息']['姓名_中文']
          // this.zj_address2 = data.ocr.words_result.Address.words
            break
          case 5: //港澳居住证
            this.zj_number2 = data.ocr.data.ret[4].word
            this.owner_name2 = data.ocr.data.ret[0].word
            this.zj_address2 = data.ocr.data.ret[3].word
            break
        }
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep () {
        try {
          await this.$refs.currentInfo.validate()
          let value = this.$refs.currentInfo.getValues()
          if (value.owner_mobile2.length > 0 && value.owner_mobile2.length < 11) {
            return this.$toast.fail('请输入正确的手机号')
          }
          this.$_store.current_form = {...value, zj_type2: this.zj_type2, zj_photo2: this.zj_photo2}
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          this.$toast.fail('请填写完整信息')
        }
      },
    },

  }
</script>

<style scoped>
</style>
