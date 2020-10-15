<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | time }}</div>
        </div>
        <div class="right" @click="deleteattention(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    // this.attention()
    this.getList()
  },
  methods: {
    async attention() {
      const res = await this.$axios.get(`/user_follows/${15}`)
      console.log(res)
    },
    async getList() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      } else {
        this.$toast.fail('关注用户信息获取失败')
      }
    },
    async deleteattention(id) {
      await this.$dialog.confirm({
        title: '温馨提示',
        message: '你确定要取消关注此用户吗',
      })
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getList()
      } else {
        this.$toast.fail(message)
      }
    },
  },
}
</script>

<style scoped lang="less">
.my-follow {
  .list {
    .item {
      padding: 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .left {
        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .center {
        padding-left: 20px;
        height: 50px;
        line-height: 25px;
        flex: 1;
        .nickname {
          font-size: 16px;
        }
        .date {
          color: #999;
        }
      }
      .right {
        background-color: #ddd;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border-radius: 15px;
      }
    }
  }
}
</style>
