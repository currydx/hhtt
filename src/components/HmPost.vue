<template>
  <div class="hm-post">
    <div class="video" v-if="list.type === 2">
      <div class="top">
        <div class="title line2">
          {{ list.title }}
        </div>
      </div>
      <div class="center">
        <img :src="getimg(list.cover[0].url)" alt="" />
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span> {{ list.user.nickname }}</span>
        <span>{{ list.comments.length }}跟帖</span>
      </div>
    </div>

    <div class="one" v-else-if="list.cover.length < 3">
      <div class="left">
        <div class="title line2">
          {{ list.title }}
        </div>
        <div class="bottom">
          <span> {{ list.user.nickname }}</span>
          <span>{{ list.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="getimg(list.cover[0].url)" alt="" />
      </div>
    </div>

    <div class="three" v-else>
      <div class="top">
        <div class="title">
          {{ list.title }}
        </div>
      </div>
      <div class="center">
        <img :src="getimg(list.cover[0].url)" alt="" />
        <img :src="getimg(list.cover[1].url)" alt="" />
        <img :src="getimg(list.cover[2].url)" alt="" />
      </div>
      <div class="bottom">
        <span> {{ list.user.nickname }}</span>
        <span>{{ list.comments.length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    getimg(data) {
      if (data.startsWith('http')) {
        return data
      } else {
        return this.$axios.defaults.baseURL + data
      }
    },
  },
}
</script>

<style lang="less" scoped>
.hm-post {
  .one {
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding-right: 10px;
      .title {
        font-size: 14px;
        line-height: 20px;
      }
      .bottom {
        color: #999;
        span {
          margin-right: 10px;
        }
      }
    }
    .right {
      img {
        width: 115px;
        height: 80px;
        object-fit: cover;
      }
    }
  }
  .three {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    .top {
      .title {
        font-size: 14px;
      }
    }
    .center {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      img {
        width: 115px;
        height: 75px;
        object-fit: cover;
      }
    }
    .bottom {
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .video {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    .top {
      .title {
        font-size: 14px;
      }
    }
    .center {
      padding: 10px 0;
      text-align: center;
      position: relative;
      img {
        width: 95%;
        height: 180px;
        object-fit: cover;
      }
      i {
        font-size: 30px;
        color: #fff;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .bottom {
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
