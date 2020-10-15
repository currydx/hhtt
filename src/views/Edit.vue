<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="editimg" :after-read="afterRead" />
    </div>
    <van-cell-group>
      <van-cell
        title="昵称"
        is-link
        :value="info.nickname"
        @click="editNickname"
      />
      <van-cell title="密码" is-link :value="info.password" />
      <van-cell
        title="性别"
        is-link
        :value="info.gender === 1 ? '男' : '女'"
        @click="editGender"
      />
    </van-cell-group>
    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="confimNickname"
    >
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog
      v-model="showgender"
      title="修改性别"
      show-cancel-button
      @confirm="confimGender"
    >
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      showNickname: false,
      showgender: false,
      nickname: '',
      radio: '',
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      let user_id = localStorage.getItem('user_id')
      this.$axios.get(`/user/${user_id}`).then(res => {
        console.log(res.data)
        const { statusCode, data, message } = res.data
        if (statusCode === 200) {
          this.info = data
        } else {
          this.$toast.fail(message)
        }
      })
    },
    editNickname() {
      this.showNickname = true
      this.nickname = this.info.nickname
    },
    confimNickname() {
      if (this.nickname === this.info.nickname) {
        this.$toast.fail('请勿重复输入昵称')
        return
      } else if (this.nickname === '') {
        this.$toast.fail('昵称不能为空')
      }
      this.confim({ nickname: nickname })
    },
    confimGender() {
      if (this.radio === this.info.gender) {
        this.$toast.fail('请勿重复勾选性别')
        return
      }
      this.confim({ gender: radio })
    },
    confim(data) {
      let user_id = localStorage.getItem('user_id')
      this.$axios.post(`/user_update/${user_id}`, data).then(res => {
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.getInfo()
        } else {
          this.$toast.fail(message)
        }
      })
    },
    editGender() {
      this.showgender = true
      this.radio = this.info.gender
    },
    afterRead(file) {
      console.log(file)
      const formdata = new FormData()
      formdata.append('file', file.file)
      this.$axios.post('/upload', formdata).then(res => {
        this.confim({ head_img: res.data.data.url })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.edit {
  .avatar {
    text-align: center;
    margin: 20px 0;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 50%;
    }
    .editimg {
      width: 70px;
      height: 70px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
}
</style>
