<template>
	<div class="identity-form">
		</dl>
		<dl class="dl-li">
			<dd>
				<p>姓名</p>
				<input type="text" name="name" placeholder="必填项" placeholder-style="color:#888;">
			</dd>
		</dl>
		<dl class="dl-li">
			<dd>
				<p>银行卡账号</p>
				<input type="tel" name="name" placeholder="必填项" placeholder-style="color:#888;">
			</dd>
		</dl>
		<div class="notes">
			该认证将结合你的手机号码实名认证宇与身份证认证，证明你合法持有该银行卡，且该银行卡为你本人使用，防止套用他人银行卡开展洗钱、欺诈等违法犯罪行为。未进行银行卡实名认证的用户，将无法通过平台开展商品销售、收款业务。
		</div>
		<div style="height:90px"></div>
		<div class="footer-nav">
			<button type="primary"  class="stm-main-button stm-m20-rl">提交认证</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'identity-form',
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '实名认证'
		})
	},
}
</script>

<style lang="less" scoped>
@import '../../../../../configs/style.less';
@import '../../../../../configs/main.less';
.identity-form{
	.notes{
		width:95%;margin:0 auto;
		font-size:@fontone;
	}
	.dl-li{
		width:calc(100% - 45px);
		padding:0 15px;
		margin:10px auto;
		background:#fff;
		border-radius:5px;
		box-shadow: 0px 3px 12px 0px rgba(206, 206, 206, 0.5);
		dd{
			padding:15px 0;
			display:flex;
			height:30px;
			line-height:30px;
			p{
				font-size:@fontthree;
			}
			input{
				flex:1;
				font-size:@fonttwo;
				margin-left:20px;
				color:@maincolor;
				line-height:30px;
				height:30px;
			}
		}
	}
}
</style>
