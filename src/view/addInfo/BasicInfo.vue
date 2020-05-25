<template>
  <div class="basic-info">
    <van-progress color="#0AC261" percentage="20" stroke-width="4" :show-pivot="false" />

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

        <my-label label="联系方式" ></my-label>
        <van-field
          class="input"
          type="tel"
          v-model="mobile"
          name="mobile"
          size="large"
          clearable
          :border="false"
          placeholder="请输入"
          :rules="[{ required: true, message: '请输入联系方式'}]"
        ></van-field>

        <my-label label="选择市场" ></my-label>
        <van-field
          class="input"
          readonly
          clickable
          :value="markit_name"
          :border="false"
          name="markit_name"
          placeholder="请选择办理业务的市场"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择办理业务的市场' }]"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
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
    data () {
      return {
        mobile: '',
        name: '',
        showPicker: false,
        columns: [],
        markit_name: '',
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
    created() {
      // this.getMarkit()
    },
    mounted() {
      this.getMarkit()
    },
    methods:{
      async getMarkit () { // 获取市场
        const { data: _data } = await this.axios.post('/api/wechat/market/getLists')
          console.log(_data)
        this.markitList = _data
        let columns = []
        _data.forEach(item => columns.push(item.market_name))
        this.columns =columns
      },
      handlePicker (value, index) { //点击选择市场完成按钮时触发
        this.markit_name = value
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
          this.$_store.basic_form = {...value, market_id: this.market_id, company_id: this.company_id }
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          console.error(e)
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
