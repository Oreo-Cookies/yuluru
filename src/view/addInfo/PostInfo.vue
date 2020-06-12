<template>
  <div class="post-info">

    <div class="commonContainer">
      <div class="commonTitle">邮寄地址</div>
      <div class="tip">
        <van-icon name="info-o" />
        <span class="text">无需邮寄服务则此处不需要填写</span>
      </div>
      <van-form
        ref="postInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-label label="收件人" :is_require="false"></my-label>
        <van-field
          class="input"
          v-model="qz_name"
          name="qz_name"
          placeholder="请输入"
          size="large"
          clearable
          :border="false"
        >
        </van-field>

        <my-label label="联系方式" :is_require="false">
          <span v-if="this.qz_mobile.length" class="str-length">{{this.qz_mobile.length}}</span>
        </my-label>
        <van-field
          class="input"
          type="tel"
          v-model="qz_mobile"
          name="qz_mobile"
          size="large"
          clearable
          :border="false"
          maxlength="11"
          placeholder="请输入"
          :rules="[{ pattern, message: '请填写正确的手机号' }]"
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
            :value="selectArea"
            @confirm="handleArea"
            @cancel="showArea = false"
          />
        </van-popup>

        <van-field
          class="input detail"
          type="textarea"
          v-model="qz_address"
          name="qz_address"
          size="large"
          clearable
          :border="false"
          :autosize="true"
          placeholder="请输入详细地址"
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
  import areaList from '../../untils/Area.js'
  import {Toast} from "vant";
  export default {
    props: {
      is_edit: {
        type: Boolean,
      }
    },
    data () {
      return {
        qz_name: '',
        area_value: '',
        qz_address: '',
        qz_mobile: '',
        loading: false,
        showArea: false,
        areaList,
        pre_disabled: false,
        next_disabled: false,
        province_code: '',
        province_name: '',
        city_code: '',
        city_name: '',
        county_code: '',
        county_name: '',
        selectArea: '440000',
        pattern: /\d{11}/,
      }
    },
    methods:{
      fromEdit (detailInfo) {
        this.qz_name = detailInfo.qz_name
        this.qz_mobile = detailInfo.qz_mobile
        this.province_code = detailInfo.province_code
        this.province_name = detailInfo.province_name
        this.city_code =detailInfo.city_code
        this.city_name = detailInfo.city_name
        this.county_code = detailInfo.county_code
        this.county_name = detailInfo.county_name
        this.qz_address = detailInfo.qz_address
        this.selectArea = detailInfo.province_code
        this.area_value = `${detailInfo.province_name}-${detailInfo.county_name}-${detailInfo.city_name}`
      },
      handleArea (values) {
          console.log(values)
          this.area_value = values.map((item) => item.name).join('-');
          this.province_code = values[0].code
          this.province_name = values[0].name
          this.city_code = values[1].code
          this.city_name = values[1].name
          this.county_code = values[2].code
          this.county_name = values[2].name
          this.showArea = false;
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      safe () {
          let value = this.$refs.postInfo.getValues()
        if (value.qz_mobile.length > 0 && value.qz_mobile.length < 11) {
          return this.$toast.fail('请输入正确的手机号')
        }
          this.$_store.post_form = {
            ...value,
            province_code: this.province_code,
            province_name: this.province_name,
            city_code: this.city_code,
            city_name: this.city_name,
            county_code: this.city_code,
            county_name: this.county_name
          }
        this.$emit('safe')
        this.next_disabled = true
        setTimeout(() => this.next_disabled = false, 100)
      },
    },
    computed: {
      getInfo: {
        get () {
          return this.$_store.current_form
        },
        set (val) {
        }

      }
    },
    watch: {
      getInfo: {
        handler: function (val) {
          if (this.is_edit) return
          this.qz_name = val.owner_name2
          this.qz_mobile = val.owner_mobile2
        },
        deep: true
     }
    }

  }
</script>

<style scoped>
  .detail {
    margin-top: 35px;
  }
</style>
