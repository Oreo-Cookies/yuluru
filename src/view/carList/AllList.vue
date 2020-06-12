<template>
  <div class="not-accept">
    <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
    >
        <van-panel v-for="item in list" :key="item.id" class="panel">
          <template #header>
            <div class="panel-header">
              <span class="car-number">{{item.car_number}}</span>
            </div>
          </template>
          <div class="panel-info">
            <div class="title">现车主姓名</div>
            <div class="text van-ellipsis">{{item.owner_name2}}</div>
          </div>
          <div class="panel-info">
            <div class="title">预约日期</div>
            <div class="text">{{item.appoint_date}}</div>
          </div>
        </van-panel>
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    name: "NotAccepted",
    data() {
      return {
        isLoading: false,
        loading: false,
        finished: false,
        error: false,
        list: []
      }
    },
    created() {
      this.onLoad()
    },
    methods: {
      async onLoad() {
        const { code, data, count, msg } = await this.axios.post('/wechat/appoint/lists', { status: 3 })
        if (code != 200) return this.$toast.fail(msg)
        this.list = data.lists
        this.count = count
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.isLoading = false
        this.loading = true;
        // this.onLoad();
      },
    }
  }
</script>

<style scoped>
  .not-accept {
    padding: 0 16px;
  }
</style>
