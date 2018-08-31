<template>
	<div class="identity-index stm-warp">
		<dl class="dl-li">
			<dd class="btn">
				<p>叶志勇<span>已认证</span></p>
			</dd>
			<dt>管理</dt>
		</dl>
		<div style="height:90px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="add">添加手机号</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'identity-index',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '身份认证'
		})
	},
	methods:{
		add() {
			wx.navigateTo({
				url: '/pages/Home/authentication/identity/form/main',
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/main.less';
@import '../../../../configs/style.less';
.identity-index{
	.dl-li{
		width:calc(100% - 45px);
		padding:0 15px;
		margin:10px auto;
		background:#fff;
		border-radius:5px;
		box-shadow: 0px 3px 12px 0px rgba(206, 206, 206, 0.5);
		display:flex;
		padding:15px;
		dd{
			flex:1;
			font-size:@fontone;
			p{

			}
			span{
				border-radius:5px;
				padding:0 5px;
				color:@maincolor;
				border:1px solid @maincolor
			}
		}
		dt{
			font-color:@fontcolor;
			font-size:@fontone;
		}
	}
}
</style>
