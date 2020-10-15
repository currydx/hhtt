<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <hm-post :list="item" v-for="item in list" :key="item.id"></hm-post>
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
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      } else {
        this.$toast.fail('收藏数据获取失败,请稍后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
