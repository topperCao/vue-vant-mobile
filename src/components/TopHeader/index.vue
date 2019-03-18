<template>
  <div class="topHeader">
    <i class="backIcon" @click="onBack"></i>
    <h4 class="title">{{title}}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '爱上街'
    },
    goBack: {
      type: Function
    }
  },
  methods: {
    onBack () {
      if (this.goBack) {
        this.goBack()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .topHeader {
    position: sticky;
    top: 0;
    z-index: 9999;

    .title {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      background-color: #fff;
    }
    .backIcon {
      width: 27px;
      height: 27px;
      background: url('https://img.51fanbei.com/h5/common/icon/ala_back_f_black_icon@1.5x.png') center no-repeat;
      background-size: contain;
      position: absolute;
      left: 10px;
      top: 7px;
    }
  }
</style>
