<template>
  <div class="login">
    <van-button type="primary" @click="onLogin">登录</van-button>
    <p @click="showToast">跳转</p>
  </div>
</template>

<script>
import { loginUser, getUserInfo } from '@/api/login.js'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'setUserName',
      'setToken'
    ]),
    showToast () {
      this.$router.push({ name: 'register' })
      this.$toast('test')
    },
    // 登录
    async onLogin () {
      const query = {
        username: 17612158083,
        password: 12345678
      }
      const res = await loginUser(query)
      this.setToken(res.data.token)
      this.$toast.success('登录成功')

      // 获取用户信息
      const resp = await getUserInfo()
      this.setUserName(resp.data.userDo)
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100%;
    background-color: #eee;
  }
</style>
