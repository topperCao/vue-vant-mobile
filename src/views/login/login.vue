<template>
  <div class="login">
    <van-button type="primary" @click="showToast">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast () {
      this.$toast('test')
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100%;
    background-color: #eee;
    width: 275px;
  }
</style>
