<template>
	<div class="counter-warp">
		<div class="yd-preview" @click="goshow">
			<div class="yd-preview-header">
				<div>计数器名称</div>
				<div>某某计数器</div>
			</div>
			<div class="yd-preview-item">
				<div>团队名称</div>
				<div>巴拉巴拉小魔仙</div>
			</div>
			<div class="yd-preview-item">
				<div>创建时间</div>
				<div>1885</div>
			</div>
			<div class="yd-preview-item">
				<div>参与人数</div>
				<div>1885</div>
			</div>
			<div class="yd-preview-footer">
				<div class="active">查看</div>
			</div>
		</div>
		<div class="yd-preview" @click="goshow">
			<div class="yd-preview-header">
				<div>计数器名称</div>
				<div>某某计数器</div>
			</div>
			<div class="yd-preview-item">
				<div>团队名称</div>
				<div>巴拉巴拉小魔仙</div>
			</div>
			<div class="yd-preview-item">
				<div>创建时间</div>
				<div>1885</div>
			</div>
			<div class="yd-preview-item">
				<div>参与人数</div>
				<div>1885</div>
			</div>
			<div class="yd-preview-footer">
				<div class="active">查看</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'counter-warp',
	data () {
		return {

		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '计数器管理 '
		})
	},
	methods: {
		goshow(){
			wx.navigateTo({
			  url: '/pages/Team/Counter/Statistics/main'
			})
		},
	}
}
</script>

<style lang="less" scoped>

@import '../../../configs/yd-preview.less';


</style>
