<template>
	<div class="enterprise-index stm-warp">
		<dl class="dl-li">
			<dd class="btn">
				<p>上海猫口袋信息科技有限公司</p>
				<p>叶志勇<span>已认证</span></p>
			</dd>
		</dl>
		<div style="height:90px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="add">添加企业</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'enterprise-index',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '企业法人、股东认证'
		})
		wx.setNavigationBarColor({
			frontColor:'#ffffff',
			backgroundColor:'#6699ff',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})
	},
	methods:{
		add() {
			wx.navigateTo({
				url: '/pages/Home/authentication/enterprise/form/main',
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/main.less';
@import '../../../../configs/style.less';
.enterprise-index{
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
				margin-bottom:5px;
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
