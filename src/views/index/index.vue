<template>
  <div class="index">
    <TopHeader title="首页"></TopHeader>

    <van-button @click="goPage('login')">to</van-button>

    <div class="test">
      字体大小
    </div>
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader/index.vue'

export default {
  components: { TopHeader },

  methods: {
    goPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  width: 180px;
  height: 180px;
  background-color: skyblue;
  font-size: 14px;
  // border-radius: 9px;
  border-bottom: 1px solid #000;
}
</style>
