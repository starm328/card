<template>
	<div class="identity-form">
		<dl class="dl-li">
			<dd>
				<p>姓名</p>
				<input type="text" name="name" placeholder="必填项" placeholder-style="color:#888;">
			</dd>
		</dl>
		<dl class="dl-li">
			<dd>
				<p>企业名称</p>
				<input type="text" name="name" placeholder="必填项" placeholder-style="color:#888;">
			</dd>
		</dl>
		<div class="notes">
			该认证将结合你的身份证认证，证明你拥有该企业或在该企业担任股东，防止假冒他人企业身份开展业务，给生意对象造成损失。
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
