<template>
  <div class="basic-info">

    <div class="commonContainer">
      <div class="commonTitle">基本信息</div>
      <van-form
        ref="basicInfo"
        validate-trigger="onChange"
        :show-error-message="false"
      >

        <my-label label="姓名" ></my-label>
        <van-field
          class="input"
          v-model="name"
          name="name"
          placeholder="请输入"
          size="large"
          clearable
          :border="false"
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
        </van-field>

        <my-label label="联系方式" >
          <span v-if="this.mobile.length" class="str-length">{{this.mobile.length}}</span>
        </my-label>
        <van-field
          class="input"
          type="tel"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          maxlength="11"
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入联系方式'}]"
        >
        </van-field>

        <my-label label="选择市场" ></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="market_name"
          :border="false"
          name="market_name"
          placeholder="请选择办理业务的市场"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择办理业务的市场' }]"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            ref="markit"
            show-toolbar
            title="选择市场"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="handlePicker"
            :loading="loading"
          />
        </van-popup>

        <my-label label="预约时间" ></my-label>
        <van-field
          class="input"
          readonly
          placeholder="请选择预约日期"
          :value="appoint_date"
          name="appoint_date"
          @click="showCalendar = true"
          :rules="[{ required: true, message: '请选择办理业务的市场' }]"
        />
        <van-calendar
          v-model="showCalendar"
          row-height="50"
          :style="{ height: '390px' }"
          :show-confirm="false"
          @confirm="handleCalendar" />

        <van-checkbox class="checkbox" icon-size="20px" name="status" v-model="checked">设为默认信息</van-checkbox>

        <button class="button"  :disabled="next_disabled" @click="nextStep">
          下一步
        </button>
      </van-form>

    </div>
  </div>

</template>

<script>
  export default {
    name: "BasicINfo",
    props: {
      is_edit: {
        type: Boolean,
      }
    },
    data () {
      return {
        mobile: '',
        name: '',
        showPicker: false,
        columns: [],
        market_name: '',
        loading: false,
        showCalendar: false,
        appoint_date: '',
        checked: true,
        markitList: [],
        next_disabled: false,
        company_id: '',
        market_id: '',
      }
    },
    async created() {
      if (!this.is_edit) {
        await this.getMarkit()
        this.getUserInfo()
      }
    },
    methods:{
      async fromEdit (detailInfo) {
        await this.getMarkit()
        this.name = detailInfo.name
        this.mobile = detailInfo.mobile
        this.appoint_date = detailInfo.appoint_date
        let index = this.markitList.findIndex(item => item.id === detailInfo.market_id && item.company_id === detailInfo.company_id)
        if (index === -1) return
        console.log(this.markitList, index)
        this.market_name = this.markitList[index].market_name
        this.market_id = this.markitList[index].id
        this.company_id = this.markitList[index].company_id
      },
      async getMarkit () { // 获取市场
        const { data: _data } = await this.axios.post('/wechat/market/getLists')
          // console.log(_data)
        this.markitList = _data
        let columns = []
        _data.forEach(item => columns.push(item.market_name))
        this.columns =columns
      },
      async getUserInfo () {
        const { code, data, msg } =await this.axios.post('/wechat/wechat_user/info')
        if (code != 200) return this.$toast.fail(msg)
        localStorage.setItem('user_info',JSON.stringify(data))
        if (!data) return;
        this.name = data.name
        this.mobile = data.mobile
        let index = this.markitList.findIndex(item => item.id === data.market_id && item.company_id === data.company_id)
        if (index === -1) return
        this.market_name = this.markitList[index].market_name
        this.market_id = this.markitList[index].id
        this.company_id = this.markitList[index].company_id
      },
      handlePicker (value, index) { //点击选择市场完成按钮时触发
        this.market_name = value
        console.log(value, index)
        this.showPicker = false
        this.market_id = this.markitList[index].id
        this.company_id = this.markitList[index].company_id
          console.log(this.market_id, this.company_id)
      },
      handleCalendar (date) { //点击选择日期完成按钮时触发
        this.appoint_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.showCalendar = false;
      },
      async nextStep () {
        try {
          await this.$refs.basicInfo.validate()
          let value = this.$refs.basicInfo.getValues()
          if (value.mobile.length > 0 && value.mobile.length < 11) {
            return this.$toast.fail('请输入正确的手机号')
          }
          this.$_store.basic_form = {...value, market_id: this.market_id, company_id: this.company_id }
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          this.$toast.fail('请填写完整信息')
        }
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
