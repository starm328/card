<template>
	<div class="bankcard-index stm-warp">
		<dl class="dl-li">
			<dd class="btn">
				<p>招商银行</p>
				<p>**** *** *** 9718<span>已认证</span></p>
			</dd>
		</dl>
		<div style="height:90px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl" @click="add">添加银行卡</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'bankcard-index',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '银行卡认证'
		})
		wx.setNavigationBarColor({
			frontColor:'#ffffff',
			backgroundColor:'#27d7b1',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			},
		})
	},
	methods:{
		add() {
			wx.navigateTo({
				url: '/pages/Home/authentication/bankcard/form/main',
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../../../configs/main.less';
@import '../../../../configs/style.less';
.bankcard-index{
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
