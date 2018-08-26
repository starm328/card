<template>
	<div class="name-login-warp">
		<div class="from">
			<div class="stm-cell name-login-from-list">
				<div class="cell-warp">
					<div class="cell-left name-login-from-tit">用户名：</div>
					<div class="cell-main name-login-from-main">
						<input type="number" name="" placeholder="请输入手机号码">
					</div>
				</div>
			</div>
			<div class="stm-cell name-login-from-list">
				<div class="cell-warp">
					<div class="cell-left name-login-from-tit">密码：</div>
					<div class="cell-main name-login-from-main">
						<input type="number" name="" placeholder="请输入验证码">
					</div>
				</div>
			</div>
		</div>
		<button type="primary"  bindtap="primary" class="stm-main-button stm-m20-rl stm-m10-t">提交</button>
		<p class="login-other" @click="other">验证码快速登录</p>
	</div>
</template>

<script>
export default {
	name: 'name-login',
	data () {
		return {
			value:''
		}
	},
	onLoad() {
		wx.hideShareMenu();
		wx.setNavigationBarTitle({
		  title: '账户登录'
		})
	},
	methods: {
		other() {
			wx.navigateTo({
			  url: '/pages/Login/Code/main'
			})
		},

	}
}
</script>

<style lang="less" scoped>
@import '../../../configs/style.less';
@import '../../../configs/cell.less';
@import '../../../configs/main.less';
.name-login-warp{
	.login-other{
		line-height:55px;
		font-size:@fonttwo;
		color:@maincolor;
		padding:0 20px;

	}
	.from{
		background:#fff;
		padding:0 20px;
		font-size:@fonttwo;
		.name-login-from-list{
			.name-login-from-main{
				position:relative;
			}
		}

	}
}
</style>
