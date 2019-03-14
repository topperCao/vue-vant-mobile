<template>
  <div class="login">
    <van-button type="primary" @click="showToast">主要按钮</van-button>
    <p>test</p>
  </div>
</template>

<script>
export default {
  methods: {
    showToast () {
      this.$router.push({ name: 'register' })
      this.$toast('test')
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
