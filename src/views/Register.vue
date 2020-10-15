<template>
  <div class="Register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="nickname"
      required
      label="昵称"
      placeholder="请输入昵称"
      :error-message="nicknameErrMsg"
      clearable
      @input="checknickname"
      @clear="clearnickname"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPassword"
    />
    <hm-button @click.native="startRegister">点击注册</hm-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
      usernameErrMsg: '',
      passwordErrMsg: '',
      nicknameErrMsg: '',
    }
  },
  methods: {
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    checknickname() {
      const reg = /^[\u4e00-\u9fa5]{3,7}$/
      if (reg.test(this.nickname)) {
        this.nicknameErrMsg = ''
      } else {
        this.nicknameErrMsg = '昵称格式错误'
      }
    },
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式错误'
      }
    },
    clearnickname() {
      this.nicknameErrMsg = ''
    },
    clearUsername() {
      this.usernameErrMsg = ''
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
    startRegister() {
      if (
        this.username !== '' &&
        this.nickname !== '' &&
        this.password !== '' &&
        this.passwordErrMsg == '' &&
        this.usernameErrMsg == '' &&
        this.nicknameErrMsg == ''
      ) {
        this.$axios
          .post('/register', {
            username: this.username,
            password: this.password,
            nickname: this.nickname,
          })
          .then(res => {
            const { statusCode, message } = res.data
            if (statusCode === 200) {
              //提示
              this.$toast.success(message)
              //跳转
              this.$router.push({
                name: 'login',
                params: {
                  username: this.username,
                  password: this.password,
                },
              })
            } else {
              this.$toast.fail(message)
            }
          })
      } else {
        this.$toast.fail('校验失败')
      }
    },
  },
}
</script>

<style scoped></style>
