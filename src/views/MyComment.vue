<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="onLoad"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">
          {{ item.create_date | time('YYYY-MM-DD HH:mm') }}
        </div>
        <div class="parent" v-if="item.parent">
          <div class="parent-nickname">
            回复:{{ item.parent.user.nickname }}
          </div>
          <div class="parent-content">{{ item.parent.content }}</div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="post">
          <div class="title line1">
            {{ item.post.title }}
          </div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: 5,
        },
      })
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        console.log(this.list)
        this.list = [...this.list, ...res.data.data]
        this.loading = false
        if (res.data.data.length < 5) {
          this.finished = true
        }
      } else {
        this.$toast.fail('跟帖信息获取失败,请稍后重试')
      }
    },
    onLoad() {
      this.pageIndex++
      this.getList()
    },
  },
}
</script>

<style scoped lang="less">
.my-comment {
  .item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .date {
      color: #999;
      height: 20px;
      line-height: 20px;
    }
    .parent {
      background: #ddd;
      padding: 10px;
      color: #999;
      &-nickname {
        height: 20px;
        line-height: 20px;
      }
      &-content {
        font-size: 14px;
        line-height: 25px;
      }
    }
    .content {
      font-size: 14px;
      padding: 10px 0;
    }
    .post {
      display: flex;
      color: #999;
      .title {
        flex: 1;
      }
      .iconfont {
        width: 15px;
        text-align: center;
      }
    }
  }
}
</style>
