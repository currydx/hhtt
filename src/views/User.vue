<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <i v-if="info.id === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | time }}</div>
      </div>
      <div class="right"></div>
    </div>
    <van-cell-group>
      <van-cell
        title="我的关注"
        is-link
        value="关注的用户"
        @click="gomyfollow"
      />
      <van-cell
        title="我的跟贴"
        is-link
        value="跟帖/回复"
        @click="gomycomment"
      />
      <van-cell
        title="我的收藏"
        is-link
        value="文档/视频"
        @click="$router.push('/my-star')"
      />
      <van-cell title="设置" is-link @click="goedit" />
      <van-cell title="退出" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: '',
    }
  },
  created() {
    let token = localStorage.getItem('token')
    let user_id = localStorage.getItem('user_id')
    this.$axios.get(`/user/${user_id}`).then(res => {
      console.log(res.data)
      const { message, statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      } else {
        this.$toast.fail(message)
      }
    })
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '你确认要退出当前账号吗',
        })
        .then(() => {
          // on confirm
          //删除token和id
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          //提示退出
          this.$toast.success('退出成功')
          //返回登录页
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    goedit() {
      this.$router.push('/edit')
    },
    gomyfollow() {
      this.$router.push('/my-follow')
    },
    gomycomment() {
      this.$router.push('/my-comment')
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  .info {
    height: 100px;
    border-bottom: 3px solid #ccc;
    align-items: center;
    display: flex;
    padding: 0 20px;
    .left {
      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 50%;
        display: block;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      line-height: 30px;
    }
  }
}
</style>
