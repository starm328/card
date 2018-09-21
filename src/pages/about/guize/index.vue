<template>
	<div class="about"  :style="'padding-top:'+navgationHeight+'px;min-height:100vh;'">
		<stm-nav></stm-nav>
		<div class="main">
			<div class="guize">
				<h5>一生名片活动奖励规则</h5>
				<p>1、会员：扫码注册，终身免费使用，每人可免费制作2张不同身份的个人AI智能名片，并有自己的个人名片二维码，名片可展示到人脉圈，所有人都可以看到你，并共享千万人脉圈，会员邀请VIP会员和联盟大使均没有奖励！</p>

				<p>2、VIP会员：享会员所有权益，可以制作5张不同身份的个人名片，成功邀请1个VIP会员奖励140元/个！成功邀请1个联盟大使奖励140元/个!</p>

				<p>3、联盟大使：直接成功邀请1个联盟大使奖劢300元/个，直接成功邀请1个VIP会员奖励160元/个，享伞下所有VIP会员成功邀请VIP会员的红包奖励20元/个!</p>
				<span>特別提示：<br/>如有其他疑问，请联系官方客服，奖励提现请关注官方公众号查询和提现</span>
			</div>

		</div>
	</div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
	name: 'about',
	components: {
		'stm-nav':Nav
	},
	data () {
		return {
			navgationHeight:''
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'升级规则'
		})
		let startBarHeight = 20
		let navgationHeight = 44
		let that = this
		wx.getSystemInfo({
		  success: function (res) {
			if (res.model == 'iPhone X'){
			  startBarHeight = 44
			}
			that.navgationHeight= navgationHeight+startBarHeight
		  }
		})
	}
}
</script>

<style lang="less" scoped>
.about{
	img{
		width:100px;
		display:block;
		margin:0 auto;
	}
	h6{
		text-align:center;
		line-height:35px;
		font-size:18px;
		margin-top:10px;
	}
	.main{
		padding:20px;
		line-height:30px;
		font-size:15px;
		color:#999;
		.guize{
			background:#fff;
			margin-top:10px;
			padding:20px;
			h5{
				text-align:center;
				height:35px;
				line-height:35px;
				margin-bottom:20px;
				font-size:20px;
			}
			p{
				font-size:15px;
				margin-bottom:20px;
				line-height:20px;
				color:rgba(000,000,000,0.6)
			}
			span{
				font-size:15px;
				color:red;
			}
		}
	}
}
</style>
