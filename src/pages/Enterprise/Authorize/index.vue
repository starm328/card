<template>
  <div class="staff-warp">
    <div class="yd-preview" @click="authorize">
      <div class="yd-preview-header">
        <div>姓名</div>
        <div>某某人</div>
      </div>
      <div class="yd-preview-item">
        <div>申请时间</div>
        <div class="text-over">2018-05-21</div>
      </div>
      <div class="yd-preview-footer"><a>授权</a></div>
    </div><div class="yd-preview" @click="authorize">
      <div class="yd-preview-header">
        <div>姓名</div>
        <div>某某人</div>
      </div>
      <div class="yd-preview-item">
        <div>申请时间</div>
        <div class="text-over">2018-05-21</div>
      </div>
      <div class="yd-preview-footer"><a>授权</a></div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'staff-warp',
  onLoad() {
    wx.hideShareMenu();
    wx.setNavigationBarTitle({
      title: '待授权员工'
    })
  },
  data () {
    return {

    }
  },
  methods: {
    authorize() {
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../configs/yd-preview.less';
</style>
