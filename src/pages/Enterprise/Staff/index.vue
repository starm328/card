<template>
	<div class="staff-warp">
		<div class="yd-preview" >
			<div class="yd-preview-header">
				<div>姓名</div>
				<div>某某人</div>
			</div>
			<div class="yd-preview-item">
				<div>状态</div>
				<div>授权/撤销</div>
			</div>
			<div class="yd-preview-item">
				<div>关联时间</div>
				<div class="text-over">2018-05-21</div>
			</div>
			<div class="yd-preview-footer"><a>撤销授权</a></div>
		</div><div class="yd-preview" >
			<div class="yd-preview-header">
				<div>姓名</div>
				<div>某某人</div>
			</div>
			<div class="yd-preview-item">
				<div>状态</div>
				<div>授权/撤销</div>
			</div>
			<div class="yd-preview-item">
				<div>关联时间</div>
				<div class="text-over">2018-05-21</div>
			</div>
			<div class="yd-preview-footer"><a>撤销授权</a></div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'staff-warp',
  onLoad() {
  	wx.hideShareMenu();
  	wx.setNavigationBarTitle({
  	  title: '员工管理'
  	})
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../configs/yd-preview.less';
</style>
